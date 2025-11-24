import { FC, memo, useEffect, useState } from 'react';
import style from './style.module.scss';
import avatarnull from '@src/asset/avatar/avatarnull.png';
import { useNavigate } from 'react-router-dom';
import { route_enum } from '@src/router/type';
import { MyCustomerField } from '@src/dataStruct/myCustom';
import { useGetInforCustomerOnZaloQuery } from '@src/redux/query/myCustomerRTK';
import { ZaloCustomerField } from '@src/dataStruct/hookData';

const MessageBox: FC<{ data: MyCustomerField }> = ({ data }) => {
    const navigate = useNavigate();

    const [zaloCustomer, setZaloCustomer] = useState<ZaloCustomerField | undefined>(undefined);

    const avatar = zaloCustomer?.data.avatar ? zaloCustomer?.data.avatar : avatarnull;

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
        if (resData?.isSuccess && resData.data && resData.data.error === 0) {
            setZaloCustomer(resData.data);
        }
    }, [data_zaloInforCustomer]);

    const handleGoToMessage = () => {
        navigate(route_enum.MESSAGE + '/' + `${data.senderId}`);
    };

    return (
        zaloCustomer && (
            <div className={style.parent} onClick={() => handleGoToMessage()}>
                <div className={style.avatarContainer}>
                    <img src={avatar} alt="avatar" />
                </div>
                <div className={style.contentContainer}>
                    <div className={style.nameContainer}>
                        <div>
                            <div className={style.name}>{zaloCustomer.data.display_name}</div>
                            <div className={style.time}>time</div>
                        </div>
                    </div>
                    <div className={style.messageContainer}>
                        <div>
                            <div className={style.message}>
                                Message Message Message Message Message Message Message Message
                            </div>
                            <div className={style.newAmount}>3</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default memo(MessageBox);
