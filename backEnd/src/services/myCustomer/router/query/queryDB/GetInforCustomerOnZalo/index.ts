import axios from 'axios';
import { QueryDB } from '@src/services/myCustomer/interface';
import { ZaloCustomerField } from '@src/dataStruct/hookData';

class QueryZalo_GetInforCustomerOnZalo extends QueryDB {
    private _customerId: string | undefined;
    private _accessToken: string | undefined;

    constructor() {
        super();
    }

    setCustomerId = (customerId: string) => {
        this._customerId = customerId;
    };

    setAccessToken = (accessToken: string) => {
        this._accessToken = accessToken;
    };

    async run(): Promise<ZaloCustomerField | void> {
        if (this._customerId !== undefined && this._accessToken !== undefined) {
            try {
                const result = await getZaloUserInfo(this._customerId, this._accessToken);

                return result;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default QueryZalo_GetInforCustomerOnZalo;

async function getZaloUserInfo(customerId: string, accessToken: string): Promise<ZaloCustomerField> {
    const res = await axios.get('https://openapi.zalo.me/v2.0/oa/getprofile', {
        params: {
            data: JSON.stringify({ user_id: customerId }),
        },
        headers: {
            access_token: accessToken,
        },
    });

    return res.data as ZaloCustomerField;
}
