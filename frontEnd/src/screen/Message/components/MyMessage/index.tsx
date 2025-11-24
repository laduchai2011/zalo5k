import { FC } from 'react';
import style from './style.module.scss';

const MyMessage: FC<{ data: number }> = ({ data }) => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.contentContainer}>
                    <div className={style.content}>
                        <div className={style.text}>
                            <div>{data}</div>
                        </div>
                        <img
                            className={style.image}
                            src="https://cdn-media.sforum.vn/storage/app/media/anh-dep-8.jpg"
                            alt="img"
                        />
                    </div>
                    <div className={style.status}>Đang gửi ...</div>
                </div>
            </div>
        </div>
    );
};

export default MyMessage;
