import { consumeMessage } from '@src/messageQueue/Consumer';
import { sendMessage } from '@src/messageQueue/Producer';
import Handle_CreateMessageText from './handle/CreateMessageText';
import { CreateMessageBodyField, messageStatus_enum, messageType_enum } from '@src/dataStruct/message';
import { sender_enum } from '@src/dataStruct/message';
import { MessageTextField, HookDataField, zalo_event_name_enum } from '@src/dataStruct/hookData';
import { my_log } from '@src/log';

export function createMessageFromCustomerSend() {
    consumeMessage('customerSend_sendToMember_storeDB', (messageZalo) => {
        const handle_createMessageText = new Handle_CreateMessageText();

        const data = messageZalo.data as HookDataField<MessageTextField>;
        const message = data.message;

        const messageText: MessageTextField = {
            text: message.text,
            msg_id: message.msg_id,
        };

        const hookData: HookDataField<MessageTextField> = {
            app_id: '',
            user_id_by_app: '',
            event_name: zalo_event_name_enum.member_sending,
            sender: {
                id: data.sender.id,
            },
            recipient: {
                id: data.recipient.id,
            },
            message: messageText,
            timestamp: '',
        };

        const createMessageBody: CreateMessageBodyField = {
            eventName: data.event_name,
            sender: sender_enum.CUSTOMER,
            receiveId: data.sender.id,
            message: JSON.stringify(hookData),
            type: messageType_enum.TEXT,
            timestamp: data.timestamp,
            messageStatus: messageStatus_enum.SENDING,
            accountId: messageZalo.accountId,
        };

        handle_createMessageText.main(createMessageBody, (message) => {
            if (message !== null) {
                sendMessage('customerSend_sendToMember_storeDB_feedback', messageZalo);
            } else {
                my_log.withRed('Lưu trữ tin nhắn khách hàng gửi lên KHÔNG thành công');
            }
        });
    });
}
