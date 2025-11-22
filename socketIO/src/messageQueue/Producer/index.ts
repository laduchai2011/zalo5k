import { RabbitMQ } from '@src/connect/rabbitMQ';

export async function sendMessage(queue: string, data: unknown) {
    const rabbit = await RabbitMQ.getInstance();
    const channel = rabbit.getChannel();

    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
}
