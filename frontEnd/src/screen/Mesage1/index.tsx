import style from './style.module.scss';
import { MESSAGE } from '@src/const/text';
import InputMsg from './component/InputMsg';
import MsgList from './component/MsgList';

const Message1 = () => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{MESSAGE}</div>
                {/* <div className={style.messageContainer}></div> */}
                <MsgList />
                <InputMsg />
            </div>
        </div>
    );
};

export default Message1;
