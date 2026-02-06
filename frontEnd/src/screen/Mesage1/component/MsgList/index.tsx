import { memo } from 'react';
import style from './style.module.scss';
import UserMsg from './component/UserMsg';

const MsgList = () => {
    return (
        <div className={style.parent}>
            <UserMsg />
        </div>
    );
};

export default memo(MsgList);
