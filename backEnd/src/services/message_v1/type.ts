import { ZaloAppField, ZaloOaField } from '@src/dataStruct/zalo';

export interface IsPassField {
    isPass: boolean;
    zaloApp: ZaloAppField | null;
    zaloOa: ZaloOaField | null;
}
