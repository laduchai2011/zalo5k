import { z } from 'zod';

export const TextMessageSchema = z.object({
    text: z.string(),
    msg_id: z.string(),
    quote_msg_id: z.string().optional(),
});
