import { consumeHookData } from '@src/messageQueue/Consumer';
import { MessageInput, MessageZodSchema } from '@src/schema/message';
import { getDbMonggo } from '@src/connect/mongo';

export function hookData() {
    consumeHookData('zalo_hook_data_queue_dev', async (data) => {
        console.log('Hook Data Received:');
        console.dir(data, { depth: null });

        const parsedMessage = MessageZodSchema.safeParse(data);

        if (!parsedMessage.success) {
            // console.error('Invalid message format:', parsedMessage.error);
        } else {
            const dbMonggo = getDbMonggo();

            const kq = await dbMonggo.collection<MessageInput>('messages').insertOne(parsedMessage.data);

            console.log(1111, kq);
        }
    });
}
