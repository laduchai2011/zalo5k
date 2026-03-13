import { FC, memo, useEffect, useState } from 'react';
import style from './style.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@src/redux';
import { useNavigate } from 'react-router-dom';
import { route_enum } from '@src/router/type';
import { ChatRoomRoleSchema } from '@src/dataStruct/chatRoom';
import { MessageV1Field, NewMessageV1Field } from '@src/dataStruct/message_v1';
import { ZaloOaField, ZaloAppField } from '@src/dataStruct/zalo';
import { ZaloUserField } from '@src/dataStruct/zalo/user';
import { AccountField } from '@src/dataStruct/account';
import { useGetLastMessageQuery, useLazyGetAllNewMessagesQuery } from '@src/redux/query/messageV1RTK';
import { useGetZaloUserQuery } from '@src/redux/query/zaloRTK';
import { timeAgoSmart } from '@src/utility/time';
import { MEMBER, YOU, USER, OA, IMAGE, VIDEO, FILE, STICKER, AUDIO } from '@src/const/text';
import { ZaloMessageType } from '@src/dataStruct/zalo/hookData';
import { Zalo_Event_Name_Enum } from '@src/dataStruct/zalo/hookData/common';
import { handleNewMsgAmount } from './handle';

const User: FC<{ chatRoomRoleSchema: ChatRoomRoleSchema }> = ({ chatRoomRoleSchema }) => {
    const navigate = useNavigate();
    const zaloApp: ZaloAppField | undefined = useSelector((state: RootState) => state.AppSlice.zaloApp);
    const account: AccountField | undefined = useSelector((state: RootState) => state.AppSlice.account);
    const selectedOa: ZaloOaField | undefined = useSelector((state: RootState) => state.Home1Slice.selectedOa);
    const chatRoomRole: ChatRoomRoleSchema = chatRoomRoleSchema;
    const [lastMessage, setLastMessage] = useState<MessageV1Field<ZaloMessageType> | undefined>(undefined);
    const [zaloUser, setZaloUser] = useState<ZaloUserField | undefined>(undefined);
    const isUserSend = lastMessage?.event_name.startsWith('user_send');
    const isOaSend = lastMessage?.event_name.startsWith('oa_send');
    const [note, setNote] = useState<string>('');
    const [member, setMember] = useState<string>('');
    const [newMessage, setNewMessage] = useState<NewMessageV1Field<ZaloMessageType>[]>([]);

    const [getAllNewMessages] = useLazyGetAllNewMessagesQuery();

    const {
        data: data_lastMessage,
        // isFetching,
        isLoading: isLoading_lastMessage,
        isError: isError_lastMessage,
        error: error_lastMessage,
    } = useGetLastMessageQuery({ chatRoomId: chatRoomRole.chat_room_id.toString() });
    useEffect(() => {
        if (isError_lastMessage && error_lastMessage) {
            console.error(error_lastMessage);
        }
    }, [isError_lastMessage, error_lastMessage]);
    useEffect(() => {
        // dispatch(set_isLoading(isLoading_zaloOa));
    }, [isLoading_lastMessage]);
    useEffect(() => {
        const resData = data_lastMessage;
        if (resData?.isSuccess && resData.data) {
            setLastMessage(resData.data);
        }
    }, [data_lastMessage]);

    const {
        data: data_zaloUser,
        // isFetching,
        isLoading: isLoading_zaloUser,
        isError: isError_zaloUser,
        error: error_zaloUser,
    } = useGetZaloUserQuery(
        { zaloApp: zaloApp!, zaloOa: selectedOa!, userIdByApp: lastMessage?.user_id_by_app || '' },
        { skip: zaloApp === undefined || selectedOa === undefined || lastMessage === undefined }
    );
    useEffect(() => {
        if (isError_zaloUser && error_zaloUser) {
            console.error(error_zaloUser);
            // dispatch(
            //     setData_toastMessage({
            //         type: messageType_enum.ERROR,
            //         message: 'Lấy dữ liệu phòng hội thoại KHÔNG thành công !',
            //     })
            // );
        }
    }, [isError_zaloUser, error_zaloUser]);
    useEffect(() => {
        // dispatch(set_isLoading(isLoading_chatRoom));
    }, [isLoading_zaloUser]);
    useEffect(() => {
        const resData = data_zaloUser;
        // console.log(resData);
        if (resData?.isSuccess && resData.data && resData.data) {
            setZaloUser(resData.data);
        }
    }, [data_zaloUser]);

    useEffect(() => {
        if (!lastMessage) return;

        if (account?.id === lastMessage?.reply_account_id) {
            setMember(YOU);
        } else {
            setMember(MEMBER);
        }

        const msg = () => {
            const event_name = lastMessage.event_name;

            switch (event_name) {
                case Zalo_Event_Name_Enum.user_send_text: {
                    setNote(lastMessage.message.text || '');
                    break;
                }
                case Zalo_Event_Name_Enum.user_send_image: {
                    setNote(IMAGE);
                    break;
                }
                case Zalo_Event_Name_Enum.user_send_video: {
                    setNote(VIDEO);
                    break;
                }
                case Zalo_Event_Name_Enum.user_send_audio: {
                    setNote(AUDIO);
                    break;
                }
                case Zalo_Event_Name_Enum.user_send_file: {
                    setNote(FILE);
                    break;
                }
                case Zalo_Event_Name_Enum.user_send_sticker: {
                    setNote(STICKER);
                    break;
                }
                // case Zalo_Event_Name_Enum.user_send_link: {
                // }
                case Zalo_Event_Name_Enum.oa_send_text: {
                    setNote(lastMessage.message.text || '');
                    break;
                }
                case Zalo_Event_Name_Enum.oa_send_image: {
                    setNote(IMAGE);
                    break;
                }
                case Zalo_Event_Name_Enum.oa_send_video: {
                    setNote(VIDEO);
                    break;
                }
                case Zalo_Event_Name_Enum.oa_send_audio: {
                    setNote(AUDIO);
                    break;
                }
                case Zalo_Event_Name_Enum.oa_send_file: {
                    setNote(FILE);
                    break;
                }
                case Zalo_Event_Name_Enum.oa_send_sticker: {
                    setNote(STICKER);
                    break;
                }
                // case Zalo_Event_Name_Enum.user_send_link: {
                // }
                default: {
                    break;
                }
            }
        };

        msg();
    }, [lastMessage, account?.id]);

    useEffect(() => {
        const chatRoomId = chatRoomRole.chat_room_id;
        getAllNewMessages({ chatRoomId: chatRoomId.toString() })
            .then((res) => {
                const resData = res.data;
                if (resData?.isSuccess && resData.data) {
                    setNewMessage(resData.data);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, [chatRoomRole, getAllNewMessages]);

    const handleGotoMessage1 = () => {
        navigate(route_enum.MESSAGE1 + '/' + `${chatRoomRole.chat_room_id}`);
    };

    return (
        <div className={style.parent} onClick={() => handleGotoMessage1()}>
            <div className={style.avatarContainer}>
                <img src={zaloUser?.data.avatar} alt="avatar" />
            </div>
            <div className={style.inforContainer}>
                <div className={style.infor}>
                    <div className={style.name}>{zaloUser?.data.display_name}</div>
                    <div className={style.note}>
                        <div>
                            {isUserSend && <div>{`${USER}:`}</div>}
                            {isOaSend && <div>{`${OA}:`}</div>}
                        </div>
                        {isOaSend && <div>{`${member}:`}</div>}
                        <div>{note}</div>
                    </div>
                </div>
                {newMessage.length === 0 && lastMessage && (
                    <div className={style.time}>{timeAgoSmart(lastMessage.timestamp)}</div>
                )}
                {newMessage.length > 0 && (
                    <div className={style.newMsgAmount}>{handleNewMsgAmount(newMessage.length)}</div>
                )}
            </div>
            <div></div>
        </div>
    );
};

export default memo(User);
