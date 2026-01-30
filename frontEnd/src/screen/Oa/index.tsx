import style from './style.module.scss';
import OaApp from './component/OaApp';
import OaList from './component/OaList';
import MyToastMessage from './component/MyToastMessage';
import MyLoading from './component/MyLoading';
import { OA_LIST } from '@src/const/text';

const Oa = () => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{OA_LIST}</div>
                <div>
                    <OaApp />
                </div>
                <div>
                    <OaList />
                </div>
                <div>
                    <MyToastMessage />
                    <MyLoading />
                </div>
            </div>
        </div>
    );
};

export default Oa;
