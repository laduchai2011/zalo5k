import { FC, memo, useEffect, useState } from 'react';
import style from './style.module.scss';
import avatarnull from '@src/asset/avatar/avatarnull.png';
import { useNavigate } from 'react-router-dom';
import { route_enum } from '@src/router/type';
import { MyCustomerField, IsNewMessageField } from '@src/dataStruct/myCustom';
import { useGetInforCustomerOnZaloQuery, useGetIsNewMessageQuery } from '@src/redux/query/myCustomerRTK';
import { ZaloCustomerField } from '@src/dataStruct/hookData';
import { set_id_isNewMessage_current } from '@src/redux/slice/App';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@src/redux';

const MessageBox: FC<{ data: MyCustomerField }> = ({ data }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    // console.log('MessageBox', data);

    const [zaloCustomer, setZaloCustomer] = useState<ZaloCustomerField | undefined>(undefined);
    const [isNewMes, setIsNewMes] = useState<boolean>(false);
    const [data_isNewMes, setData_setIsNewMes] = useState<IsNewMessageField | undefined>(undefined);

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
        console.log('MessageBox', data_zaloInforCustomer);
        if (resData?.isSuccess && resData.data && resData.data.error === 0) {
            setZaloCustomer(resData.data);
        }
    }, [data_zaloInforCustomer]);

    const {
        data: data_IsNewMessage,
        // isFetching,
        isLoading: isLoading_IsNewMessage,
        isError: isError_IsNewMessage,
        error: error_IsNewMessage,
    } = useGetIsNewMessageQuery({ myCustomerId: data.id });
    useEffect(() => {
        if (isError_IsNewMessage && error_IsNewMessage) {
            console.error(error_IsNewMessage);
            // dispatch(
            //     setData_toastMessage({
            //         type: messageType_enum.SUCCESS,
            //         message: 'Lấy dữ liệu KHÔNG thành công !',
            //     })
            // );
        }
    }, [isError_IsNewMessage, error_IsNewMessage]);
    useEffect(() => {
        // setIsLoading(isLoading_medication);
    }, [isLoading_IsNewMessage]);
    useEffect(() => {
        const resData = data_IsNewMessage;
        if (resData?.isSuccess && resData.data) {
            setData_setIsNewMes(resData.data);
            setIsNewMes(true);
        } else {
            setIsNewMes(false);
        }
    }, [data_IsNewMessage]);

    const handleGoToMessage = () => {
        if (data_isNewMes) {
            dispatch(set_id_isNewMessage_current(data_isNewMes?.id));
        }

        const timeout = setTimeout(() => {
            navigate(route_enum.MESSAGE + '/' + `${data.senderId}`);
            clearTimeout(timeout);
        }, 50);
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
                            <div className={style.message}>{isNewMes ? 'Có tin nhắn mới' : ''}</div>
                            {isNewMes && <div className={style.newAmountRed}>3</div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default memo(MessageBox);
