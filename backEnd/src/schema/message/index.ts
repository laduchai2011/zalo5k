import z from 'zod';
import { TextMessageSchema } from './text_message';
import { Zalo_Event_Name_Enum } from '@src/dataStruct/zalo/hookData/common';

const BaseEventSchema = {
    app_id: z.string(),
    oa_id: z.string(),
    chat_room_id: z.number().int(),
    user_id_by_app: z.string(),
    sender_id: z.string(),
    recipient_id: z.string(),
    reply_account_id: z.number().int(),
    timestamp: z.string(),
};

const UserSendTextZodSchema = z.object({
    event_name: z.literal(Zalo_Event_Name_Enum.user_send_text),
    ...BaseEventSchema,
    message: TextMessageSchema,
});

export const MessageZodSchema = z.discriminatedUnion('event_name', [UserSendTextZodSchema]);

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
