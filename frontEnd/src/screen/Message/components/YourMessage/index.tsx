import { FC, useEffect, useState } from 'react';
import style from './style.module.scss';
import { useParams } from 'react-router-dom';
// import avatarnull from '@src/asset/avatar/avatarnull.png';
import { MessageField, messageType_enum } from '@src/dataStruct/message';
import {
    HookDataField,
    MessageTextField,
    ZaloMessage,
    MessageImageField,
    ZaloCustomerField,
} from '@src/dataStruct/hookData';
import LinkifyText from '@src/component/LinkifyText';
import LazyImage from '@src/component/LazyImage';
import { useGetInforCustomerOnZaloQuery } from '@src/redux/query/myCustomerRTK';

const YourMessage: FC<{ data: MessageField }> = ({ data }) => {
    const { id } = useParams<{ id: string }>();
    const message = data.message;
    const hookData: HookDataField<ZaloMessage> = JSON.parse(message);

    const [zaloCustomer, setZaloCustomer] = useState<ZaloCustomerField | undefined>(undefined);

    const {
        data: data_zaloInforCustomer,
        // isFetching,
        isLoading: isLoading_zaloInforCustomer,
        isError: isError_zaloInforCustomer,
        error: error_zaloInforCustomer,
    } = useGetInforCustomerOnZaloQuery({ customerId: id || '' }, { skip: id === undefined });
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

    switch (data.type) {
        case messageType_enum.TEXT: {
            const messageText = hookData.message as MessageTextField;
            return (
                <div className={style.parent}>
                    <div className={style.main}>
                        <div className={style.avatarContainer}>
                            <img src={zaloCustomer?.data.avatar} alt="avatar" />
                        </div>
                        <div className={style.contentContainer}>
                            <div className={style.content}>
                                <div className={style.text}>
                                    {messageText.text && <LinkifyText text={messageText.text} />}
                                </div>
                            </div>
                            <div className={style.status}>Đang gửi ...</div>
                        </div>
                    </div>
                </div>
            );
        }
        case messageType_enum.IMAGES: {
            const messageImage = hookData.message as MessageImageField;
            return (
                <div className={style.parent}>
                    <div className={style.main}>
                        <div className={style.avatarContainer}>
                            <img src={zaloCustomer?.data.avatar} alt="avatar" />
                        </div>
                        <div className={style.contentContainer}>
                            <div className={style.content}>
                                <div className={style.text}>
                                    {messageImage.text && <LinkifyText text={messageImage.text} />}
                                </div>
                                <LazyImage
                                    className={style.image}
                                    src={messageImage.attachment.payload.elements[0].url}
                                    alt="img"
                                />
                            </div>
                            <div className={style.status}>Đang gửi ...</div>
                        </div>
                    </div>
                </div>
            );
        }
        default: {
            return;
        }
    }

    // return (
    //     <div className={style.parent}>
    //         <div className={style.main}>
    //             <div className={style.avatarContainer}>
    //                 <img src={avatarnull} alt="avatar" />
    //             </div>
    //             <div className={style.contentContainer}>
    //                 <div className={style.content}>
    //                     <div className={style.text}>{messageText.text}</div>
    //                     {/* <img
    //                         className={style.image}
    //                         src="https://cdn-media.sforum.vn/storage/app/media/anh-dep-8.jpg"
    //                         alt="img"
    //                     /> */}
    //                 </div>
    //                 <div className={style.status}>Đang gửi ...</div>
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default YourMessage;
