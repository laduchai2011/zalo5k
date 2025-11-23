import { QueryDB } from '@src/services/account/interface';
import { AccountField } from '@src/dataStruct/account';
import ServiceRedis from '@src/cache/cacheRedis';

const serviceRedis = ServiceRedis.getInstance();

class QueryDB_GetMemberReceiveMessage extends QueryDB {
    private _member: AccountField | undefined;

    constructor() {
        super();
    }

    async run(): Promise<AccountField | void> {
        const key = 'memberReceiveMessage';

        if (this._member !== undefined) {
            try {
                await serviceRedis.init();
                const result = await serviceRedis.getData<AccountField>(key);

                if (result) {
                    return this._member;
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log('MutateDB_SetMemberReceiveMessage: error method run()');
        }
    }
}

export default QueryDB_GetMemberReceiveMessage;
