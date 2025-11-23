import { QueryDB } from '@src/services/account/interface';
import { AccountField } from '@src/dataStruct/account';
import ServiceRedis from '@src/cache/cacheRedis';

const serviceRedis = ServiceRedis.getInstance();

class QueryDB_GetMemberReceiveMessage extends QueryDB {
    constructor() {
        super();
    }

    async run(): Promise<AccountField | void> {
        const key = 'memberReceiveMessage';

        try {
            await serviceRedis.init();
            const result = await serviceRedis.getData<AccountField>(key);

            if (result) {
                return result;
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export default QueryDB_GetMemberReceiveMessage;
