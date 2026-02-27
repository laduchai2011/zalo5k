import style from './style.module.scss';
import { ORDER } from '@src/const/text';
import OaList from './component/OaList';
import OrderList from './component/OrderList';
import EditOrder from './component/EditOrder';
import { select_enum } from '@src/router/type';
import MyToastMessage from './component/MyToastMessage';
import MyLoading from './component/MyLoading';
import Header from '../Header';

const Order = () => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{ORDER}</div>
                <OaList />
                <OrderList />
                <div className={style.headerTab}>
                    <Header selected={select_enum.ORDER} />
                </div>
            </div>
            <div>
                <MyToastMessage />
                <MyLoading />
                <EditOrder />
            </div>
        </div>
    );
};

export default Order;
