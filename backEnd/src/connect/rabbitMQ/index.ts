import { connect } from 'amqplib';
import type { Connection, Channel } from '@src/types/amqp';
import { my_log } from '@src/log';

export class RabbitMQ {
    private static instance: RabbitMQ;

    private connection!: Connection;
    private channel!: Channel;

    private constructor() {}

    static getInstance(): RabbitMQ {
        if (!RabbitMQ.instance) {
            RabbitMQ.instance = new RabbitMQ();
            // await RabbitMQ.instance.init();
        }
        return RabbitMQ.instance;
    }

    async init() {
        const url = process.env.RABBIT_URL || 'amqp://guest:guest@5kaquarium.com:5672';

        // connect() TRẢ VỀ Connection — đúng type
        const conn: Connection = await connect(url);
        this.connection = conn;

        // createChannel() TRẢ VỀ Channel — đúng type
        const ch: Channel = await conn.createChannel();
        this.channel = ch;

        my_log.withGreen('RabbitMQ connected successly !');

        this.connection.on('error', (err) => {
            console.error('RabbitMQ connection error:', err);
        });

        this.connection.on('close', () => {
            console.warn('RabbitMQ connection closed');
        });
    }

    public getChannel(): Channel {
        return this.channel;
    }

    async close(): Promise<void> {
        if (this.connection) {
            await this.connection.close();
            my_log.withYellow('RabbitMQ connection closed.');
        }
    }
}
