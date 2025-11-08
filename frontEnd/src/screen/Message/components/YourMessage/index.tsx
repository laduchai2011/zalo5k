import style from './style.module.scss';
import avatarnull from '@src/asset/avatar/avatarnull.png';

const YourMessage = () => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.avatarContainer}>
                    <img src={avatarnull} alt="avatar" />
                </div>
                <div className={style.contentContainer}>
                    <div className={style.text}>message</div>
                    <img
                        className={style.image}
                        src="https://cdn-media.sforum.vn/storage/app/media/anh-dep-8.jpg"
                        alt="img"
                    />
                </div>
            </div>
        </div>
    );
};

export default YourMessage;
