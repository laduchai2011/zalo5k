import style from './style.module.scss';
import OaApp from './component/OaApp';
import MyOa from './component/MyOa';
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
                    <MyOa />
                    <MyOa />
                    <MyOa />
                    <MyOa />
                    <MyOa />
                </div>
            </div>
        </div>
    );
};

export default Oa;
