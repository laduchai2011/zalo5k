import { FC, memo } from 'react';
import style from './style.module.scss';
import { MessageV1Field } from '@src/dataStruct/message_v1';
import { MessageTextField } from '@src/dataStruct/zalo/hookData';

const MsgText: FC<{ data?: MessageV1Field<MessageTextField> }> = ({ data }) => {
    return <div className={style.parent}>{data?.message.text}</div>;
};

export default memo(MsgText);
