import { FC, memo } from 'react';
import style from './style.module.scss';
import { avatarnull } from '@src/utility/string';

const OneAccount: FC<{ index: number }> = ({ index }) => {
    return (
        <div className={style.parent}>
            <div className={style.indexContainer}>
                <div>{index}</div>
                <input type="checkbox" />
            </div>
            <div className={style.inforContainer}>
                <div className={style.avatarContainer}>
                    <img src={avatarnull} alt="avatar" />
                </div>
                <div className={style.nameContainer}>sdfsdsdf</div>
            </div>
        </div>
    );
};

export default memo(OneAccount);
