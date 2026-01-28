import { AccountInformationField } from '@src/dataStruct/account';

export interface state_props {
    id_isNewMessage_current: number;
    accountInformation?: AccountInformationField;
    myAdmin?: number;
}
