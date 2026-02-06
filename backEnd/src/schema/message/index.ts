import z from 'zod';
import {
    MessageTextSchema,
    MessageImageSchema,
    MessageMultiImageSchema,
    MessageVideoSchema,
    MessageAudioSchema,
    MessageFileSchema,
    MessageStickerSchema,
} from './messageType';
import { Zalo_Event_Name_Enum } from '@src/dataStruct/zalo/hookData/common';

const BaseEventSchema = {
    app_id: z.string(),
    oa_id: z.string(),
    chat_room_id: z.number().int(),
    user_id_by_app: z.string(),
    sender_id: z.string(),
    recipient_id: z.string(),
    reply_account_id: z.number().int(),
    is_seen: z.boolean(),
    // timestamp: z.coerce.date(),
    timestamp: z.preprocess((val) => {
        if (val instanceof Date) return val;

        if (typeof val === 'string') {
            const s = val.trim();

            // unix seconds
            if (/^\d{10}$/.test(s)) return new Date(Number(s) * 1000);

            // unix milliseconds
            if (/^\d{13}$/.test(s)) return new Date(Number(s));

            // ISO or normal string
            return new Date(s);
        }

        if (typeof val === 'number') {
            // unix ms
            return new Date(val);
        }

        return val;
    }, z.date()),
};

const MessageTextZodSchema = z.object({
    event_name: z.union([z.literal(Zalo_Event_Name_Enum.user_send_text), z.literal(Zalo_Event_Name_Enum.oa_send_text)]),
    ...BaseEventSchema,
    message: MessageTextSchema,
});

const MessageImageZodSchema = z.object({
    event_name: z.union([
        z.literal(Zalo_Event_Name_Enum.user_send_image),
        z.literal(Zalo_Event_Name_Enum.oa_send_image),
    ]),
    ...BaseEventSchema,
    message: z.union([MessageImageSchema, MessageMultiImageSchema]),
});

const MessageVideoZodSchema = z.object({
    event_name: z.union([
        z.literal(Zalo_Event_Name_Enum.user_send_video),
        z.literal(Zalo_Event_Name_Enum.oa_send_video),
    ]),
    ...BaseEventSchema,
    message: MessageVideoSchema,
});

const MessageAudioZodSchema = z.object({
    event_name: z.union([
        z.literal(Zalo_Event_Name_Enum.user_send_audio),
        z.literal(Zalo_Event_Name_Enum.oa_send_audio),
    ]),
    ...BaseEventSchema,
    message: MessageAudioSchema,
});

const MessageFileZodSchema = z.object({
    event_name: z.union([z.literal(Zalo_Event_Name_Enum.user_send_file), z.literal(Zalo_Event_Name_Enum.oa_send_file)]),
    ...BaseEventSchema,
    message: MessageFileSchema,
});

const MessageStickerZodSchema = z.object({
    event_name: z.union([
        z.literal(Zalo_Event_Name_Enum.user_send_sticker),
        z.literal(Zalo_Event_Name_Enum.oa_send_sticker),
    ]),
    ...BaseEventSchema,
    message: MessageStickerSchema,
});

export const MessageZodSchema = z.discriminatedUnion('event_name', [
    MessageTextZodSchema,
    MessageImageZodSchema,
    MessageVideoZodSchema,
    MessageAudioZodSchema,
    MessageFileZodSchema,
    MessageStickerZodSchema,
]);

export type MessageSchemaType = z.infer<typeof MessageZodSchema>;

// const MessageSchema = new mongoose.Schema({
//     event_name: String,
//     app_id: String,
//     sender: { id: String },
//     recipient: { id: String },
//     message: Object, // 👈 dynamic
//     timestamp: String,
//     user_id_by_app: String,
// });

// export const MessageModel = mongoose.model('messages', MessageSchema);
