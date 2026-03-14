import { FC, memo } from 'react';
import style from './style.module.scss';

const OneNote: FC<{ index: number }> = ({ index }) => {
    return (
        <div className={style.parent}>
            <div>{index}</div>
            <div>Note</div>
        </div>
    );
};

export default memo(OneNote);
