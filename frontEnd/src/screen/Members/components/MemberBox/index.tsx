import style from './style.module.scss';
import avatarnull from '@src/asset/avatar/avatarnull.png';

const MemberBox = () => {
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
                        <div>12</div>
                    </div>
                    <div className={style.infor}>
                        <div>Tin nhắn mới</div>
                        <div>12</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberBox;
