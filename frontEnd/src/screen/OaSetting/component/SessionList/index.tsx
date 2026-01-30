import { memo } from 'react';
import style from './style.module.scss';
import { SESSION_LIST, SEE_MORE } from '@src/const/text';
import Session from './component/Session';

const SessionList = () => {
    const list = [1, 2, 3, 4].map((item, index) => {
        return <Session key={index} index={index + 1} />;
    });

    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{SESSION_LIST}</div>
                <div className={style.list}>{list}</div>
                <div className={style.more}>
                    <div>{SEE_MORE}</div>
                </div>
            </div>
        </div>
    );
};

export default memo(SessionList);
