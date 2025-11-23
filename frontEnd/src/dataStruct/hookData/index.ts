export interface HookDataField<Tdata = ZaloMessage> {
    app_id: string;
    user_id_by_app: string;
    event_name: string;
    sender: {
        id: string;
    };
    recipient: {
        id: string;
    };
    message: Tdata;
    timestamp: string;
}

export interface MessageTextField {
    text: string;
    msg_id: string;
}

type ZaloMessage = MessageTextField | Record<string, unknown>; // fallback

export interface ZaloCustomerField {
    data: {
        user_id: string;
        avatar: string;
        display_name: string;
        user_gender: string;
        tags: [];
    };
    error: number;
    message: string;
}
