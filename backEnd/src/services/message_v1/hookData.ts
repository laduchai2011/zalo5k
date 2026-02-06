import { consumeHookData } from '@src/messageQueue/Consumer';
import { MessageSchemaType, MessageZodSchema } from '@src/schema/message';
import { getDbMonggo } from '@src/connect/mongo';
import { my_log } from '@src/log';
import { mssql_server } from '@src/connect';
import ServiceRedis from '@src/cache/cacheRedis';
import { ZaloAppField, ZaloOaField } from '@src/dataStruct/zalo';
import { ChatRoomField } from '@src/dataStruct/chatRoom';
import { UserTakeRoomToChatBodyField, ChatRoomBodyField } from '@src/dataStruct/chatRoom/body';
import { CheckZaloAppWithAppIdBodyField, CheckZaloOaListWithZaloAppIdBodyField } from '@src/dataStruct/zalo/body';
import QueryDB_CheckZaloAppWithAppId from './queryDB/CheckZaloAppWithAppId';
import QueryDB_CheckZaloOaListWithZaloAppId from './queryDB/CheckZaloOaListWithZaloAppId';
import QueryDB_UserTakeRoomToChat from './queryDB/UserTakeRoomToChat';
import MutateDB_CreateChatRoom from './mutateDB/CreateChatRoom';
import {
    prefix_cache_zaloApp_with_appId,
    prefix_cache_zaloOa_list_with_zaloAppId,
    prefix_cache_chatRoom_with_zaloOaId_userIdByApp,
} from '@src/const/redisKey';
import { IsPassField, WaitSessionField } from './type';
import { HookDataField, HookDataSchema } from '@src/dataStruct/zalo/hookData';
import { feedbackToTakeChatSession } from './feedbackToTakeChatSession';
import { ChatSessionField } from '@src/dataStruct/chatSession';
import { sendMessageToUser } from './sendMessageToUser';
import { ensureIndexes } from './ensureIndexes';

mssql_server.init();

const serviceRedis = ServiceRedis.getInstance();
serviceRedis.init();

ensureIndexes();

const timeExpireat = 60 * 3; // 5p

export function hookData() {
    consumeHookData('zalo_hook_data_queue_dev', async (data) => {
        // console.log('Hook Data Received:');
        console.dir(data, { depth: null });
        const app_id = data.app_id;
        const oa_id = determineOaId(data);
        const sender_id_of_user = determineSenderIdOfUser(data);
        let chatRoom: ChatRoomField | undefined;

        if (!oa_id) return;

        const { isPass, zaloApp, zaloOa } = await isPass_App_Oa(app_id, oa_id);

        if (!isPass) return;
        if (!zaloApp) return;
        if (!zaloOa) return;

        // const keyRedis = `${prefix_cache_chatRoom_with_zaloOaId_userIdByApp}_${zaloOa.id}_${data.user_id_by_app}`;
        // serviceRedis.deleteData(keyRedis);

        // get chat room
        chatRoom = await getChatRoom(data, zaloOa);
        // console.log(1111, chatRoom);
        let isFeedback: boolean = false;
        let waitSession: WaitSessionField | undefined = undefined;

        if (!chatRoom) {
            // feedback to take session-code
            waitSession = await feedbackToTakeChatSession(zaloApp, zaloOa, data);
            isFeedback = true;

            if (!waitSession) {
                return;
            }
            // console.dir(waitSession, { depth: null });
            const chatSession = waitSession.chatSession;
            if (!chatSession) {
                // get default chat session
                const chatSessionAdmin: ChatSessionField = {
                    id: -1,
                    label: '',
                    code: '',
                    isReady: true,
                    status: '',
                    selectedAccountId: zaloApp.accountId,
                    zaloOaId: -1,
                    accountId: -1,
                    updateTime: '',
                    createTime: '',
                };
                chatRoom = await createChatRoom(zaloOa, data, chatSessionAdmin);
            } else {
                chatRoom = await createChatRoom(zaloOa, data, chatSession);
            }
        }

        // console.log(1111, chatRoom);
        if (!chatRoom) return;

        if (isFeedback && waitSession) {
            // store message then feedback
            const hookDatas = waitSession.hookDatas;
            const hookDataSchemas: HookDataSchema[] = [];
            for (let i: number = 0; i < hookDatas.length; i++) {
                const hookDataSchema: HookDataSchema = {
                    event_name: hookDatas[i].event_name,
                    app_id: hookDatas[i].app_id,
                    oa_id: oa_id,
                    chat_room_id: chatRoom?.id || -1,
                    user_id_by_app: hookDatas[i].user_id_by_app,
                    sender_id: hookDatas[i].sender.id,
                    recipient_id: hookDatas[i].recipient.id,
                    reply_account_id: chatRoom?.accountId || -1,
                    message: hookDatas[i].message,
                    is_seen: false,
                    timestamp: hookDatas[i].timestamp,
                };
                hookDataSchemas.push(hookDataSchema);
            }

            const hookDatasMessage = MessageZodSchema.array().safeParse(hookDataSchemas);

            if (!hookDatasMessage.success) {
                console.error('Invalid message format:', hookDatasMessage.error);
            } else {
                const ops = hookDatasMessage.data.map((doc) => ({
                    insertOne: { document: doc },
                }));
                const dbMonggo = getDbMonggo();
                const kq = await dbMonggo.collection<MessageSchemaType>('messages').bulkWrite(ops, { ordered: false });
                // console.log(33333333, kq);
                if (kq) {
                    if (!sender_id_of_user) return;
                    sendMessageToUser(zaloApp, zaloOa, {
                        recipient: { user_id: sender_id_of_user },
                        message: {
                            text: 'Bây giờ bạn có thể bắt đầu cuộc hội thoại !',
                        },
                    });
                }
            }
        } else {
            const hookDataSchema: HookDataSchema = {
                event_name: data.event_name,
                app_id: data.app_id,
                oa_id: oa_id,
                chat_room_id: chatRoom?.id || -1,
                user_id_by_app: data.user_id_by_app,
                sender_id: data.sender.id,
                recipient_id: data.recipient.id,
                reply_account_id: chatRoom?.accountId || -1,
                message: data.message,
                is_seen: false,
                timestamp: data.timestamp,
            };

            const parsedMessage = MessageZodSchema.safeParse(hookDataSchema);

            if (!parsedMessage.success) {
                console.error('Invalid message format:', parsedMessage.error);
            } else {
                const dbMonggo = getDbMonggo();
                const dataParse = parsedMessage.data;
                const kq = await dbMonggo.collection<MessageSchemaType>('messages').insertOne(dataParse);

                // console.log(33333333, kq);
            }
        }
    });
}

async function isPass_App_Oa(app_id: string, oa_id: string): Promise<IsPassField> {
    const checkZaloAppWithAppIdBody: CheckZaloAppWithAppIdBodyField = {
        appId: app_id,
    };
    const zaloApp = await checkZaloApp(checkZaloAppWithAppIdBody);
    if (!zaloApp) return { isPass: false, zaloApp: null, zaloOa: null };

    const checkZaloOaListWithZaloAppIdBody: CheckZaloOaListWithZaloAppIdBodyField = {
        zaloAppId: zaloApp.id,
    };
    const zaloOaList = await checkZaloOa(checkZaloOaListWithZaloAppIdBody);
    if (!zaloOaList) return { isPass: false, zaloApp: zaloApp, zaloOa: null };
    let existOA: boolean = false;
    let oa_in_index: number = -1;
    for (let i: number = 0; i < zaloOaList.length; i++) {
        if (oa_id === zaloOaList[i].oaId) {
            existOA = true;
            oa_in_index = i;
            break;
        }
    }

    if (existOA) {
        return { isPass: true, zaloApp: zaloApp, zaloOa: zaloOaList[oa_in_index] };
    }
    return { isPass: false, zaloApp: zaloApp, zaloOa: null };
}

async function checkZaloApp(
    checkZaloAppWithAppIdBody: CheckZaloAppWithAppIdBodyField
): Promise<ZaloAppField | undefined> {
    const app_id = checkZaloAppWithAppIdBody.appId;
    const keyRedis = `${prefix_cache_zaloApp_with_appId}_${app_id}`;
    const zaloApp = await serviceRedis.getData<ZaloAppField>(keyRedis);

    if (zaloApp) {
        return zaloApp;
    }

    const queryDB = new QueryDB_CheckZaloAppWithAppId();
    queryDB.setCheckZaloAppWithAppIdBody(checkZaloAppWithAppIdBody);

    const connection_pool = mssql_server.get_connectionPool();
    if (connection_pool) {
        queryDB.set_connection_pool(connection_pool);
    } else {
        my_log.withYellow('Kết nối cơ sở dữ liệu không thành công !');
        return;
    }

    try {
        const result = await queryDB.run();
        if (result?.recordset.length && result?.recordset.length > 0) {
            const zaloApp1: ZaloAppField = { ...result?.recordset[0] };

            const isSet = await serviceRedis.setData<ZaloAppField>(keyRedis, zaloApp1, timeExpireat);
            if (!isSet) {
                console.error('Failed to set zaloApp in cookie in Redis');
                return;
            }

            return zaloApp1;
        } else {
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }
}

async function checkZaloOa(
    checkZaloOaListWithZaloAppIdBody: CheckZaloOaListWithZaloAppIdBodyField
): Promise<ZaloOaField[] | undefined> {
    const zaloAppId = checkZaloOaListWithZaloAppIdBody.zaloAppId;
    const keyRedis = `${prefix_cache_zaloOa_list_with_zaloAppId}_${zaloAppId}`;
    const zaloOaList = await serviceRedis.getData<ZaloOaField[]>(keyRedis);

    if (zaloOaList) {
        return zaloOaList;
    }

    const queryDB = new QueryDB_CheckZaloOaListWithZaloAppId();
    queryDB.setCheckZaloOaListWithZaloAppIdBody(checkZaloOaListWithZaloAppIdBody);

    const connection_pool = mssql_server.get_connectionPool();
    if (connection_pool) {
        queryDB.set_connection_pool(connection_pool);
    } else {
        my_log.withYellow('Kết nối cơ sở dữ liệu không thành công !');
        return;
    }

    try {
        const result = await queryDB.run();
        if (result?.recordset.length && result?.recordset.length > 0) {
            const zaloOaList: ZaloOaField[] = result?.recordset;

            const isSet = await serviceRedis.setData<ZaloOaField[]>(keyRedis, zaloOaList, timeExpireat);
            if (!isSet) {
                console.error('Failed to set zaloApp in cookie in Redis');
                return;
            }

            return zaloOaList;
        } else {
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }
}

function determineOaId(hookData: HookDataField): string | null {
    const eventName = hookData.event_name;
    let oa_id: string | null = null;
    const isUserSend = eventName.startsWith('user_send');
    const isOaSend = eventName.startsWith('oa_send');

    if (isUserSend) {
        oa_id = hookData.recipient.id;
    }

    if (isOaSend) {
        oa_id = hookData.sender.id;
    }

    return oa_id;
}

function determineSenderIdOfUser(hookData: HookDataField): string | null {
    const eventName = hookData.event_name;
    let oa_id: string | null = null;
    const isUserSend = eventName.startsWith('user_send');
    const isOaSend = eventName.startsWith('oa_send');

    if (isUserSend) {
        oa_id = hookData.sender.id;
    }

    if (isOaSend) {
        oa_id = hookData.recipient.id;
    }

    return oa_id;
}

async function getChatRoom(hookData: HookDataField, zaloOa: ZaloOaField): Promise<ChatRoomField | undefined> {
    const userIdByApp = hookData.user_id_by_app;
    const zaloOaId = zaloOa.id;
    const userTakeRoomToChatBody: UserTakeRoomToChatBodyField = {
        userIdByApp: userIdByApp,
        zaloOaId: zaloOaId,
    };
    const keyRedis = `${prefix_cache_chatRoom_with_zaloOaId_userIdByApp}_${zaloOaId}_${userIdByApp}`;

    const chatRoom = await serviceRedis.getData<ChatRoomField>(keyRedis);

    if (chatRoom) {
        return chatRoom;
    }

    const queryDB = new QueryDB_UserTakeRoomToChat();
    queryDB.setUserTakeRoomToChatBody(userTakeRoomToChatBody);

    const connection_pool = mssql_server.get_connectionPool();
    if (connection_pool) {
        queryDB.set_connection_pool(connection_pool);
    } else {
        my_log.withYellow('Kết nối cơ sở dữ liệu không thành công !');
        return;
    }

    try {
        const result = await queryDB.run();
        if (result?.recordset.length && result?.recordset.length > 0) {
            const chatRoom1: ChatRoomField = result?.recordset[0];

            const isSet = await serviceRedis.setData<ChatRoomField>(keyRedis, chatRoom1, timeExpireat);
            if (!isSet) {
                console.error('Failed to set zaloApp in cookie in Redis');
                return;
            }

            return chatRoom1;
        } else {
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }
}

// async function getChatSession(code: string, zaloOa: ZaloOaField): Promise<ChatSessionField | undefined> {
//     const userTakeSessionToChatBody: UserTakeSessionToChatBodyField = {
//         code: code,
//         zaloOaId: zaloOa.id,
//     };

//     const queryDB = new QueryDB_UserTakeSessionToChat();
//     queryDB.setUserTakeSessionToChatBody(userTakeSessionToChatBody);

//     const connection_pool = mssql_server.get_connectionPool();
//     if (connection_pool) {
//         queryDB.set_connection_pool(connection_pool);
//     } else {
//         my_log.withYellow('Kết nối cơ sở dữ liệu không thành công !');
//         return;
//     }

//     try {
//         const result = await queryDB.run();
//         if (result?.recordset.length && result?.recordset.length > 0) {
//             const chatSession: ChatSessionField = result?.recordset[0];
//             return chatSession;
//         } else {
//             return;
//         }
//     } catch (error) {
//         console.error(error);
//         return;
//     }
// }

async function createChatRoom(zaloOa: ZaloOaField, hookData: HookDataField, chatSession: ChatSessionField) {
    const chatRoomBody: ChatRoomBodyField = {
        userIdByApp: hookData.user_id_by_app,
        zaloOaId: zaloOa.id,
        accountId: chatSession.selectedAccountId,
    };

    const queryDB = new MutateDB_CreateChatRoom();
    queryDB.setChatRoomBody(chatRoomBody);

    const connection_pool = mssql_server.get_connectionPool();
    if (connection_pool) {
        queryDB.set_connection_pool(connection_pool);
    } else {
        my_log.withYellow('Kết nối cơ sở dữ liệu không thành công !');
        return;
    }

    try {
        const result = await queryDB.run();
        if (result?.recordset.length && result?.recordset.length > 0) {
            const chatRoom: ChatRoomField = result?.recordset[0];

            return chatRoom;
        } else {
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }
}

// function parseTimestamp(ts: string) {
//     const n = Number(ts);

//     if (!Number.isNaN(n)) {
//         if (ts.length === 10) return new Date(n * 1000);
//         if (ts.length === 13) return new Date(n);
//     }

//     return new Date(ts); // ISO string
// }
