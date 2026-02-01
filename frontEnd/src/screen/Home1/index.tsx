import style from './style.module.scss';
import { HOME } from '@src/const/text';
import Header from '../Header';
import OaList from './component/OaList';
import { select_enum } from '@src/router/type';
import MyToastMessage from './component/MyToastMessage';
import MyLoading from './component/MyLoading';

const Home1 = () => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{HOME}</div>
                <OaList />
                <div className={style.list}>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                </div>
                <div className={style.headerTab}>
                    <Header selected={select_enum.HOME} />
                </div>
            </div>
            <div>
                <MyToastMessage />
                <MyLoading />
            </div>
        </div>
    );
};

export default Home1;
