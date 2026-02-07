import { FC, memo } from 'react';
import style from './style.module.scss';
import { HookDataField } from '@src/dataStruct/zalo/hookData';
import LazyImage from '@src/component/LazyImage';

const MsgImage: FC<{ hookData?: HookDataField }> = () => {
    return (
        <div className={style.parent}>
            <LazyImage
                className={style.image}
                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt8cRWnrApHOH_kYlIusnH-OIEc_LdDDUldg&s'}
                alt="img"
            />
        </div>
    );
};

export default memo(MsgImage);
