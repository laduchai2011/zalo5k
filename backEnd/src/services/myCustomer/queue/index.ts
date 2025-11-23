import { consumeMessage } from '@src/messageQueue/Consumer';
import { sendMessage } from '@src/messageQueue/Producer';
import Handle_GetAMyCustomer from './handle/GetAMyCustomer';
import Handle_CreateMyCustom from './handle/CreateMyCustom';
import { AccountField } from '@src/dataStruct/account';
import ServiceRedis from '@src/cache/cacheRedis';

const serviceRedis = ServiceRedis.getInstance();

function checkMyCustommer() {
    consumeMessage('customerSend_checkMyCustommer', (messageZalo) => {
        const handle_getAMyCustomer = new Handle_GetAMyCustomer();
        const handle_createMyCustom = new Handle_CreateMyCustom();

        handle_getAMyCustomer.main({ senderId: messageZalo.data.sender.id }, async (myCustomer) => {
            const messageZalo1 = { ...messageZalo };
            if (myCustomer) {
                messageZalo1.accountId = myCustomer.accountId;
                messageZalo1.isNewCustom = false;
            } else {
                const key = 'memberReceiveMessage';
                try {
                    await serviceRedis.init();
                    const result = await serviceRedis.getData<AccountField>(key);
                    messageZalo1.accountId = result.id;
                    messageZalo1.isNewCustom = false;

                    handle_createMyCustom.main(
                        {
                            senderId: messageZalo1.data.sender.id,
                            accountId: messageZalo1.accountId,
                        },
                        (myCustomer) => {
                            if (myCustomer) {
                                console.log('Tạo MyCustom thành công !');
                            } else {
                                console.log('Tạo MyCustom không thành công !');
                            }
                        }
                    );
                } catch (error) {
                    console.error(error);
                }
            }

            sendMessage('customerSend_sendToMember', messageZalo1);
        });
    });
}

export { checkMyCustommer };
