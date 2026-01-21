import { consumeHookData } from '@src/messageQueue/Consumer';

export function hookData() {
    consumeHookData('zalo_hook_data_queue_dev', (data) => {
        console.log('Hook Data Received:');
        console.dir(data, { depth: null });
    });
}
