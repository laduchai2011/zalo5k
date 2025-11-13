import style from './style.module.scss';
import YourMessage from './components/YourMessage';
import MyMessage from './components/MyMessage';
import { MESSAGE } from '@src/const/text';

const Message = () => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{MESSAGE}</div>
                <div className={style.contentContainer}>
                    <YourMessage />
                    <MyMessage />
                </div>
            </div>
        </div>
    );
};

export default Message;
