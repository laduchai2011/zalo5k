import style from './style.module.scss';
import { OA_SETTING } from '@src/const/text';
import MyOa from './component/MyOa';
import SessionList from './component/SessionList';

const OaSetting = () => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{OA_SETTING}</div>
                <div>
                    <MyOa />
                </div>
                <div>
                    <SessionList />
                </div>
            </div>
        </div>
    );
};

export default OaSetting;
