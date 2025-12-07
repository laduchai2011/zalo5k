import type { ConsumeMessage } from '@src/types/amqp';
import { rabbit_server } from '@src/connect';
import { MessageZaloField } from '../type';

export async function consumeMessage(queue: string, callback: (messageZalo: MessageZaloField) => void) {
    await rabbit_server.init();
    const channel = rabbit_server.getChannel();

    await channel.assertQueue(queue);

    channel.consume(queue, (msg: ConsumeMessage | null) => {
        if (!msg) return;

        const data = JSON.parse(msg.content.toString());
        // console.log('Received:', data);
        callback(data);

        channel.ack(msg);
    });
}
