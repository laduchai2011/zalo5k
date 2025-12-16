import { memo, useState, useEffect } from 'react';
import style from './style.module.scss';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { useGetMyCustomersQuery } from '@src/redux/query/myCustomerRTK';
import { MyCustomerField } from '@src/dataStruct/myCustom';
import AMyCustomer from './component/AMyCustomer';

const NoteFilter = () => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const [myCustomers, setMyCustomers] = useState<MyCustomerField[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<MyCustomerField | undefined>(undefined);

    const handleShow = () => {
        setIsShow(!isShow);
    };

    const {
        data: data_myCustomers,
        // isFetching,
        isLoading: isLoading_myCustomers,
        isError: isError_myCustomers,
        error: error_myCustomers,
    } = useGetMyCustomersQuery({ page: 1, size: 500, accountId: -1 });
    useEffect(() => {
        if (isError_myCustomers && error_myCustomers) {
            console.error(error_myCustomers);
            // dispatch(
            //     setData_toastMessage({
            //         type: messageType_enum.SUCCESS,
            //         message: 'Lấy dữ liệu KHÔNG thành công !',
            //     })
            // );
        }
    }, [isError_myCustomers, error_myCustomers]);
    useEffect(() => {
        // setIsLoading(isLoading_medication);
    }, [isLoading_myCustomers]);
    useEffect(() => {
        const resData = data_myCustomers;
        // console.log(1111111, resData);
        if (resData?.isSuccess && resData.data) {
            setMyCustomers(resData.data.items);
        }
    }, [data_myCustomers]);

    useEffect(() => {
        setSelectedCustomer(myCustomers[0]);
    }, [myCustomers]);

    const list_customer = myCustomers.map((item, index) => {
        return <AMyCustomer data={item} key={index} onSelect={() => setSelectedCustomer(item)} />;
    });

    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.selected}>
                    {selectedCustomer ? <AMyCustomer data={selectedCustomer} /> : <div>Không xác định</div>}
                    <div className={style.iconcontainer}>
                        {!isShow && <BiChevronDown onClick={() => handleShow()} size={20} />}
                        {isShow && <BiChevronUp onClick={() => handleShow()} size={20} />}
                    </div>
                </div>
                {isShow && <div className={style.options}>{list_customer}</div>}
            </div>
        </div>
    );
};

export default memo(NoteFilter);
