import { Zalo_Event_Name_Enum } from './common';

export interface HookDataField<T = ZaloMessageType> {
    app_id: string;
    user_id_by_app: string;
    event_name: Zalo_Event_Name_Enum;
    sender: {
        id: string;
    };
    recipient: {
        id: string;
    };
    message: T;
    timestamp: string;
}

interface MessageTextField {
    msg_id: string;
    text: string;
}

interface MessageImageField {
    msg_id: string;
    attachments: [
        {
            payload: {
                thumbnail: string;
                url: string;
            };
            type: 'image';
        },
    ];
}

interface MessageVideoField {
    msg_id: string;
    attachments: [
        {
            payload: {
                thumbnail: string;
                description: string;
                url: string;
            };
            type: 'video';
        },
    ];
}

interface MessageAudioField {
    msg_id: string;
    attachments: [
        {
            payload: {
                url: string;
            };
            type: 'audio';
        },
    ];
}

interface MessageFileField {
    msg_id: string;
    attachments: [
        {
            payload: {
                size: string;
                name: string;
                checksum: string;
                type: string;
                url: string;
            };
            type: 'file';
        },
    ];
}

interface MessageStickerField {
    msg_id: string;
    attachments: [
        {
            payload: {
                id: string;
                url: string;
            };
            type: 'sticker';
        },
    ];
}

type ZaloMessageType =
    | MessageTextField
    | MessageImageField
    | MessageVideoField
    | MessageAudioField
    | MessageFileField
    | MessageStickerField
    | Record<string, unknown>; // fallback
