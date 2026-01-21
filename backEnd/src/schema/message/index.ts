import { z } from 'zod';
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

const UserSendTextEventSchema = z.object({
    event_name: z.literal('user_send_text'),
    ...BaseEventSchema,
    message: TextMessageSchema,
});

const MessageSchema = z.discriminatedUnion('event_name', [UserSendTextEventSchema]);
