import { memo } from 'react';
import style from './style.module.scss';
import { CREATE_NEW_SESSION } from '@src/const/text';

const CreateNewSession = () => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{CREATE_NEW_SESSION}</div>
                <div className={style.contentContainer}>
                    <div className={style.warn}>
                        Nếu không tạo phiên, chúng tôi sẽ phát hội thoại cho các phiên bất kỳ hoặc người dùng sẽ không
                        thể nhắn tin cho bạn
                    </div>
                    <div className={style.inputContainer}>
                        <input placeholder="Nhập phiên hội thoại" />
                    </div>
                    <div className={style.btnContainer}>
                        <button className={style.btn}>Tạo phiên mới</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(CreateNewSession);
