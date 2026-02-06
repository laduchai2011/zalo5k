import style from './style.module.scss';
import { HOME } from '@src/const/text';
import Header from '../Header';
import OaList from './component/OaList';
import { select_enum } from '@src/router/type';
import MyToastMessage from './component/MyToastMessage';
import MyLoading from './component/MyLoading';
import User from './component/User';

const Home1 = () => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{HOME}</div>
                <OaList />
                <div className={style.list}>
                    <User index={1} />
                    <User index={2} />
                    <User index={3} />
                    <User index={4} />
                    <User index={5} />
                    <User index={6} />
                    <User index={7} />
                    <User index={8} />
                    <User index={9} />
                    <User index={10} />
                    <User index={11} />
                    <User index={12} />
                    <User index={13} />
                    <User index={14} />
                    <User index={15} />
                    <User index={16} />
                    <User index={17} />
                    <User index={18} />
                    <User index={19} />
                    <User index={20} />
                    <User index={21} />
                    <User index={22} />
                    <User index={23} />
                    <User index={24} />
                    <User index={25} />
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
