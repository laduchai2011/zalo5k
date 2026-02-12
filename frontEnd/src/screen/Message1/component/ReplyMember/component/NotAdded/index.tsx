import { FC, memo } from 'react';
import style from './style.module.scss';
import { AccountField } from '@src/dataStruct/account';

const NotAdded: FC<{ index: number; data: AccountField }> = ({ index, data }) => {
    return (
        <div className={style.parent}>
            <div className={style.indexContainer}>{index + 1}</div>
            <div className={style.inforContainer}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNzSvQMx07eqW79xIar2vd4x_1NUKPZ7kKUw&s"
                    alt=""
                />
                <div>{data.firstName + ' ' + data.lastName}</div>
            </div>
            <div className={style.btnContainer}>
                <button>Thêm</button>
            </div>
        </div>
    );
};

export default memo(NotAdded);
