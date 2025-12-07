import { rabbit_server } from '@src/connect';
import { MessageZaloField } from '../type';

export async function sendMessage(queue: string, messageZalo: MessageZaloField) {
    await rabbit_server.init();
    const channel = rabbit_server.getChannel();

    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(messageZalo)));
}
