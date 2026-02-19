import { HookDataSchema } from '@src/dataStruct/zalo/hookData';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MessageV1Field<T> extends HookDataSchema<T> {}

export interface PagedMessageV1Field<T> {
    items: MessageV1Field<T>[];
    cursor: string | null;
}

export interface SocketMessageField {
    chatRoomId: number;
    _id: string;
}
