import { FC, memo } from 'react';
import style from './style.module.scss';
import { HookDataField } from '@src/dataStruct/zalo/hookData';

const MsgText: FC<{ hookData?: HookDataField }> = () => {
    return <div className={style.parent}>MsgText MsgText MsgText MsgText MsgText MsgText</div>;
};

export default memo(MsgText);
