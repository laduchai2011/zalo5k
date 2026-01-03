import { memo, FC, useEffect, useState } from 'react';
import style from './style.module.scss';
import { MyCustomerField } from '@src/dataStruct/myCustom';
import { useGetInforCustomerOnZaloQuery } from '@src/redux/query/myCustomerRTK';
import { ZaloCustomerField } from '@src/dataStruct/hookData';

const AMyCustomer: FC<{ data: MyCustomerField; onSelect?: () => void }> = ({ data, onSelect }) => {
    const [zaloCustomer, setZaloCustomer] = useState<ZaloCustomerField | undefined>(undefined);
    const {
        data: data_zaloInforCustomer,
        // isFetching,
        isLoading: isLoading_zaloInforCustomer,
        isError: isError_zaloInforCustomer,
        error: error_zaloInforCustomer,
    } = useGetInforCustomerOnZaloQuery({ customerId: data.senderId });
    useEffect(() => {
        if (isError_zaloInforCustomer && error_zaloInforCustomer) {
            console.error(error_zaloInforCustomer);
            // dispatch(
            //     setData_toastMessage({
            //         type: messageType_enum.SUCCESS,
            //         message: 'Lấy dữ liệu KHÔNG thành công !',
            //     })
            // );
        }
    }, [isError_zaloInforCustomer, error_zaloInforCustomer]);
    useEffect(() => {
        // setIsLoading(isLoading_medication);
    }, [isLoading_zaloInforCustomer]);
    useEffect(() => {
        const resData = data_zaloInforCustomer;
        console.log('MessageBox', data_zaloInforCustomer);
        if (resData?.isSuccess && resData.data && resData.data.error === 0) {
            setZaloCustomer(resData.data);
        }
    }, [data_zaloInforCustomer]);
    return (
        <div className={style.parent} onClick={onSelect}>
            <img src={zaloCustomer?.data.avatar} />
            <div>{zaloCustomer?.data.display_name}</div>
        </div>
    );
};

export default memo(AMyCustomer);
