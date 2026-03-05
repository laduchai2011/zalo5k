import style from './style.module.scss';
import { MANAGE_AGENT } from '@src/const/text';
import MyToastMessage from './component/MyToastMessage';
import MyLoading from './component/MyLoading';
import CreateService from './component/CreateService';
import ServiceList from './component/ServiceList';

const ManageAgent = () => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{MANAGE_AGENT}</div>
                <CreateService />
                <ServiceList />
            </div>
            <div>
                <MyToastMessage />
                <MyLoading />
            </div>
        </div>
    );
};

export default ManageAgent;
