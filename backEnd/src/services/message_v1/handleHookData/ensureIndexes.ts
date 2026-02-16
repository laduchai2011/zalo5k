import { getDbMonggo } from '@src/connect/mongo';

export async function ensureIndexes() {
    const db = getDbMonggo();
    const col_messages = db.collection('messages');

    await col_messages.createIndex({ chat_room_id: 1, timestamp: -1 });
    col_messages.createIndex({ chat_room_id: 1, message_id: 1 }, { unique: true });

    const col_lastMessage = db.collection('lastMessage');

    await col_lastMessage.createIndex({ chat_room_id: 1 }, { unique: true });
    await col_lastMessage.createIndex({ timestamp: -1 });
}
