export interface ConsumeMessage {
    content: Buffer;
    fields: unknown;
    properties: unknown;
}

export interface Channel {
    assertQueue(queue: string): Promise<unknown>;
    consume(queue: string, onMessage: (msg: ConsumeMessage | null) => void): unknown;
    ack(msg: ConsumeMessage): void;
    sendToQueue(queue: string, content: Buffer): boolean;
}

export interface Connection {
    createChannel(): Promise<Channel>;
    on(event: string, handler: (...args: unknown[]) => void): void;
    close(): void;
}

export interface ConsumeMessage {
    content: Buffer;
    fields: unknown;
    properties: unknown;
}

export interface Channel {
    assertQueue(queue: string): Promise<unknown>;
    consume(queue: string, onMessage: (msg: ConsumeMessage | null) => void): unknown;
    ack(msg: ConsumeMessage): void;
    sendToQueue(queue: string, content: Buffer): boolean;
}

export interface Connection {
    createChannel(): Promise<Channel>;
    on(event: string, handler: (...args: unknown[]) => void): void;
    close(): void;
}
