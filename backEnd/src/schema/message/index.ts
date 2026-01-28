import z from 'zod';
import { TextMessageSchema } from './text_message';

const BaseEventSchema = {
    app_id: z.string(),

    sender: z.object({
        id: z.string(),
    }),

    recipient: z.object({
        id: z.string(),
    }),

    timestamp: z.string(),

    user_id_by_app: z.string(),
};

const UserSendTextZodSchema = z.object({
    event_name: z.literal('user_send_text'),
    ...BaseEventSchema,
    message: TextMessageSchema,
});

export const MessageZodSchema = z.discriminatedUnion('event_name', [UserSendTextZodSchema]);

export type MessageInput = z.infer<typeof MessageZodSchema>;

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
