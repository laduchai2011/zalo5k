import style from './style.module.scss';
import { ACCOUNT_RECEIVE_MESSAGE } from '@src/const/text';
import Selected from './component/Selected';
import List from './component/List';

const AccountReceiveMessage = () => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{ACCOUNT_RECEIVE_MESSAGE}</div>
                <Selected />
                <List />
            </div>
        </div>
    );
};

export default AccountReceiveMessage;
