import { getDbMonggo } from '@src/connect/mongo';

export async function ensureIndexes() {
    const db = getDbMonggo();
    const col = db.collection('messages');

    // await col.createIndex({ oa_id: 1, user_id_by_app: 1, timestamp: -1 });
    await col.createIndex({ chat_room_id: 1, timestamp: -1 });
    // await col.createIndex({ event_name: 1 });
}
