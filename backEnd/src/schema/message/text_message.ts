import { z } from 'zod';

export const TextMessageSchema = z.object({
    event_name: z.literal('user_send_text'),

    app_id: z.string(),

    sender: z.object({
        id: z.string(),
    }),

    recipient: z.object({
        id: z.string(),
    }),

    message: z.object({
        text: z.string(),
        msg_id: z.string(),
    }),

    timestamp: z.string().regex(/^\d+$/, 'timestamp must be numeric string'),

    user_id_by_app: z.string(),
});
