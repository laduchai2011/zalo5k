import { consumeMessage } from '@src/messageQueue/Consumer';
import { sendMessage } from '@src/messageQueue/Producer';
import Handle_GetAMyCustomer from './handle/GetAMyCustomer';

function checkMyCustommer() {
    consumeMessage('checkMyCustommer', (messageZalo) => {
        console.log('checkMyCustommer', messageZalo);
        const handle_getAMyCustomer = new Handle_GetAMyCustomer();
        handle_getAMyCustomer.main({ senderId: messageZalo.data.sender.id }, (myCustomer) => {
            console.log('MyCustomer:', myCustomer);
        });
    });
}

export { checkMyCustommer };
