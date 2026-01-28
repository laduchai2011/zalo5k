import { memo, useState, useEffect } from 'react';
import style from './style.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@src/redux';
import { FaRegEye, FaEyeSlash } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { useGetZaloAppWithAccountIdQuery } from '@src/redux/query/zaloRTK';
import { AccountInformationField } from '@src/dataStruct/account';

const OaApp = () => {
    const accountInformation: AccountInformationField | undefined = useSelector(
        (state: RootState) => state.AppSlice.accountInformation
    );
    const myAdmin: number | undefined = useSelector((state: RootState) => state.AppSlice.myAdmin);
    const [isShow_id, setIsShow_id] = useState(false);
    const [isShow_secret, setIsShow_secret] = useState(false);

    const {
        data: data_zaloInforCustomer,
        // isFetching,
        isLoading: isLoading_zaloInforCustomer,
        isError: isError_zaloInforCustomer,
        error: error_zaloInforCustomer,
    } = useGetZaloAppWithAccountIdQuery(
        { role: accountInformation?.accountType || '', accountId: myAdmin?.toString() || '' },
        { skip: myAdmin === undefined || accountInformation === undefined }
    );
    useEffect(() => {
        // if (isError_zaloInforCustomer && error_zaloInforCustomer) {
        //     console.error(error_zaloInforCustomer);
        //     dispatch(
        //         setData_toastMessage({
        //             type: toastMessageType_enum.ERROR,
        //             message: 'Lấy dữ liệu từ zalo KHÔNG thành công !',
        //         })
        //     );
        // }
    }, [isError_zaloInforCustomer, error_zaloInforCustomer]);
    useEffect(() => {
        // setIsLoading(isLoading_medication);
    }, [isLoading_zaloInforCustomer]);
    useEffect(() => {
        // const resData = data_zaloInforCustomer;
        // if (resData?.isSuccess && resData.data && resData.data.error === 0) {
        //     setZaloCustomer(resData.data);
        // }
    }, [data_zaloInforCustomer]);

    const handleShow_id = (isShow: boolean) => {
        setIsShow_id(isShow);
    };

    const handleShow_secret = (isShow: boolean) => {
        setIsShow_secret(isShow);
    };

    return (
        <div className={style.parent}>
            <div>
                <div className={style.label}>label</div>
                <div>
                    <div>
                        <div>Tên ứng dụng</div>
                        <div>Tên ứng dụng</div>
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <div>Định danh ứng dụng</div>
                            <div>
                                {isShow_id && <FaRegEye onClick={() => handleShow_id(false)} />}
                                {!isShow_id && <FaEyeSlash onClick={() => handleShow_id(true)} />}
                            </div>
                        </div>
                        <div>
                            {isShow_id && <div>Định danh ứng dụng</div>}
                            {!isShow_id && (
                                <div>
                                    <GoDotFill /> <GoDotFill /> <GoDotFill /> <GoDotFill /> <GoDotFill />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <div>Khóa ứng dụng</div>
                            <div>
                                {isShow_secret && <FaRegEye onClick={() => handleShow_secret(false)} />}
                                {!isShow_secret && <FaEyeSlash onClick={() => handleShow_secret(true)} />}
                            </div>
                        </div>
                        <div>
                            {isShow_secret && <div>Khóa ứng dụng</div>}
                            {!isShow_secret && (
                                <div>
                                    <GoDotFill /> <GoDotFill /> <GoDotFill /> <GoDotFill /> <GoDotFill />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={style.warn}>Thông tin không được để lộ</div>
            </div>
        </div>
    );
};

export default memo(OaApp);
