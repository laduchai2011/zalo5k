import { z } from 'zod';

export const MessageTextSchema = z.object({
    msg_id: z.string(),
    text: z.string(),
    quote_msg_id: z.string().optional(),
});

export const MessageImageSchema = z.object({
    msg_id: z.string(),
    attachments: [
        {
            payload: {
                thumbnail: z.string(),
                url: z.string(),
            },
            type: 'image',
        },
    ],
});

export const MessageVideoSchema = z.object({
    msg_id: z.string(),
    attachments: [
        {
            payload: {
                thumbnail: z.string(),
                description: z.string(),
                url: z.string(),
            },
            type: 'video',
        },
    ],
});

export const MessageAudioSchema = z.object({
    msg_id: z.string(),
    attachments: [
        {
            payload: {
                url: z.string(),
            },
            type: 'audio',
        },
    ],
});

export const MessageFileSchema = z.object({
    msg_id: z.string(),
    attachments: [
        {
            payload: {
                size: z.string(),
                name: z.string(),
                checksum: z.string(),
                type: z.string(),
                url: z.string(),
            },
            type: 'file',
        },
    ],
});

export const MessageStickerSchema = z.object({
    msg_id: z.string(),
    attachments: [
        {
            payload: {
                id: z.string(),
                url: z.string(),
            },
            type: 'sticker',
        },
    ],
});
