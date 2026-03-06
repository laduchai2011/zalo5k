import { memo } from 'react';
import style from './style.module.scss';
import OneService from './component/OneService';

const ServiceList = () => {
    const list_service = [1, 2, 3, 4, 5].map((item, index) => {
        return <OneService key={index} />;
    });

    return <div className={style.parent}>{list_service}</div>;
};

export default memo(ServiceList);
