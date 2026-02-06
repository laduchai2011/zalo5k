import { memo } from 'react';
import style from './style.module.scss';

const MsgText = () => {
    return <div className={style.parent}>MsgText MsgText MsgText MsgText MsgText MsgText</div>;
};

export default memo(MsgText);
