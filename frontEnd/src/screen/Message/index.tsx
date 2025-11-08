import style from './style.module.scss';
import YourMessage from './components/YourMessage';
import MyMessage from './components/MyMessage';

const Message = () => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>Tin nhắn</div>
                <div className={style.contentContainer}>
                    <YourMessage />
                    <MyMessage />
                </div>
            </div>
        </div>
    );
};

export default Message;
