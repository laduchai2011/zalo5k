import { getDbMonggo } from '@src/connect/mongo';

export async function ensureIndexes() {
    const db = getDbMonggo();
    const col_messages = db.collection('message');

    await col_messages.createIndex({ chat_room_id: 1, timestamp: -1 });
    col_messages.createIndex({ chat_room_id: 1, message_id: 1 }, { unique: true });

    const col_lastMessage = db.collection('lastMessage');

    await col_lastMessage.createIndex({ chat_room_id: 1 }, { unique: true });
    await col_lastMessage.createIndex({ timestamp: -1 });

    const col_chatRoomRole = db.collection('chatRoomRole');

    await col_chatRoomRole.createIndex({ authorized_account_id: 1 });
    await col_chatRoomRole.createIndex({ chat_room_id: 1 });
    await col_chatRoomRole.createIndex({ zalo_oa_id: 1 });
    await col_chatRoomRole.createIndex({ account_id: 1 });
    await col_chatRoomRole.createIndex({ chat_room_id: 1, authorized_account_id: 1 }, { unique: true });
}
