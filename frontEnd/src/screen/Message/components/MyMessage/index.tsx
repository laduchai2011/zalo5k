import { FC } from 'react';
import style from './style.module.scss';
import { MessageField } from '@src/dataStruct/message';
import { HookDataField, MessageTextField } from '@src/dataStruct/hookData';

const MyMessage: FC<{ data: MessageField }> = ({ data }) => {
    const message = data.message;
    const hookData: HookDataField<MessageTextField> = JSON.parse(message);
    const messageText: MessageTextField = hookData.message;
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.contentContainer}>
                    <div className={style.content}>
                        <div className={style.text}>
                            <div>{messageText.text}</div>
                        </div>
                        {/* <img
                            className={style.image}
                            src="https://cdn-media.sforum.vn/storage/app/media/anh-dep-8.jpg"
                            alt="img"
                        /> */}
                    </div>
                    <div className={style.status}>Đang gửi ...</div>
                </div>
            </div>
        </div>
    );
};

export default MyMessage;
