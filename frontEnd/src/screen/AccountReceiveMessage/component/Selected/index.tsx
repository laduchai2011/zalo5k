import { memo, useState } from 'react';
import style from './style.module.scss';
import { avatarnull } from '@src/utility/string';
import { UN_SELECTED } from '@src/const/text';

const Selected = () => {
    const [isSelect, setIsSelect] = useState<boolean>(true);

    const handleSelect = () => {
        setIsSelect(false);
    };

    return (
        <div className={style.parent}>
            {isSelect && (
                <div className={style.main}>
                    <div className={style.avatarContainer}>
                        <img src={avatarnull} alt="avatar" />
                    </div>
                    <div className={style.nameContainer}>sdfsdsdf</div>
                    <div className={style.btnContainer}>
                        <div onClick={() => handleSelect()}>{UN_SELECTED}</div>
                    </div>
                </div>
            )}
            {!isSelect && (
                <div className={style.main1}>
                    <div>Chưa có lựa chọn nào !</div>
                </div>
            )}
        </div>
    );
};

export default memo(Selected);
