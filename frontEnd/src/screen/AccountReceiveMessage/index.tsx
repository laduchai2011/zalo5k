import style from './style.module.scss';
import { ACCOUNT_RECEIVE_MESSAGE } from '@src/const/text';
import OaList from './component/OaList';
import Selected from './component/Selected';
import List from './component/List';
import MyToastMessage from './component/MyToastMessage';
import MyLoading from './component/MyLoading';

const AccountReceiveMessage = () => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{ACCOUNT_RECEIVE_MESSAGE}</div>
                <OaList />
                <Selected />
                <List />
            </div>
            <div>
                <MyToastMessage />
                <MyLoading />
            </div>
        </div>
    );
};

export default AccountReceiveMessage;
