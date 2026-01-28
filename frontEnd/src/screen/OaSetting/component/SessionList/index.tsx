import { memo } from 'react';
import style from './style.module.scss';
import { SESSION_LIST } from '@src/const/text';
import { MdDelete } from 'react-icons/md';

const SessionList = () => {
    const list = [1, 2, 3, 4].map((item, index) => (
        <div key={index}>
            <div>{item}</div>
            <div>
                <MdDelete size={20} color="red" />
            </div>
        </div>
    ));

    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{SESSION_LIST}</div>
                <div className={style.list}>{list}</div>
            </div>
        </div>
    );
};

export default memo(SessionList);
