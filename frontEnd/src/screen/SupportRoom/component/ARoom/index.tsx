import { memo } from 'react';
import style from './style.module.scss';
import avatarnull from '@src/asset/avatar/avatarnull.png';

const ARoom = () => {
    return (
        <div className={style.parent}>
            <div className={style.avatarContainer}>
                <img src={avatarnull} alt="avatar" />
            </div>
            <div className={style.contentContainer}>
                <div className={style.nameContainer}>
                    <div className={style.name}>name name name name name name name name name name name name</div>
                </div>
                <div className={style.inforContainer}>
                    <div className={style.infor}>
                        <div>Khách hàng</div>
                    </div>
                    <div className={style.infor}>
                        <div className={`${style.role} ${style.read}`}>Đọc</div>
                        <div className={`${style.role} ${style.send}`}>Gửi</div>
                    </div>
                    <div className={style.infor}>
                        <div>12</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ARoom);
