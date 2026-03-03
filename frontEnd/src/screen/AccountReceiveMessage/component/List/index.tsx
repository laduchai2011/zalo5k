import { memo } from 'react';
import style from './style.module.scss';
import OneAccount from './component/OneAccount';

const List = () => {
    const list_account = [1, 2, 3, 4, 5].map((item, index) => {
        return <OneAccount key={index} index={index} />;
    });

    return (
        <div className={style.parent}>
            <div>so luong thanh vien</div>
            <div className={style.list}>{list_account}</div>
        </div>
    );
};

export default memo(List);
