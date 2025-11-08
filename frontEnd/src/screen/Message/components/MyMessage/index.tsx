import style from './style.module.scss';

const MyMessage = () => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.contentContainer}>
                    <div className={style.text}>
                        <div>message</div>
                    </div>
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

export default MyMessage;
