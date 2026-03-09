import { FC, memo } from 'react';
import style from './style.module.scss';
import { MessageV1Field } from '@src/dataStruct/message_v1';
import { MessageTextField } from '@src/dataStruct/zalo/hookData';

const ReplyText: FC<{ data?: MessageV1Field<MessageTextField> }> = ({ data }) => {
    return (
        <div className={style.parent}>
            <div>text text text text text text text text text text text</div>
        </div>
    );
};

export default memo(ReplyText);
