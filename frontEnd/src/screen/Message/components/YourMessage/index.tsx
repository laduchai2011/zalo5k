import { FC, memo, useEffect, useState } from 'react';
import style from './style.module.scss';
import { useParams } from 'react-router-dom';
// import avatarnull from '@src/asset/avatar/avatarnull.png';
import { MessageField, messageType_enum } from '@src/dataStruct/message';
import {
    HookDataField,
    MessageTextField,
    ZaloMessage,
    MessageImageOaSendField,
    ZaloCustomerField,
    MessageVideosField,
} from '@src/dataStruct/hookData';
import LinkifyText from '@src/component/LinkifyText';
import LazyImage from '@src/component/LazyImage';
import LazyVideo from '@src/component/LazyVideo';
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
                            {zaloCustomer?.data.avatar && (
                                <LazyImage className={style.avatar} src={zaloCustomer?.data.avatar} alt="avatar" />
                            )}
                        </div>
                        <div className={style.contentContainer}>
                            <div className={style.content}>
                                <div className={style.text}>
                                    {messageText.text && <LinkifyText text={messageText.text} />}
                                </div>
                            </div>
                            <div className={style.status}>{data.messageStatus}</div>
                        </div>
                    </div>
                </div>
            );
        }
        case messageType_enum.IMAGES: {
            const messageImage = hookData.message as MessageImageOaSendField;
            return (
                <div className={style.parent}>
                    <div className={style.main}>
                        <div className={style.avatarContainer}>
                            {zaloCustomer?.data.avatar && (
                                <LazyImage className={style.avatar} src={zaloCustomer?.data.avatar} alt="avatar" />
                            )}
                        </div>
                        <div className={style.contentContainer}>
                            <div className={style.content}>
                                <LazyImage
                                    className={style.image}
                                    src={messageImage.attachments[0].payload.url}
                                    alt="img"
                                />
                                <div className={style.text}>
                                    {messageImage.text && <LinkifyText text={messageImage.text} />}
                                </div>
                            </div>
                            <div className={style.status}>{data.messageStatus}</div>
                        </div>
                    </div>
                </div>
            );
        }
        case messageType_enum.VIDEOS: {
            const messageVideo = hookData.message as MessageVideosField;
            console.log(1111111, messageVideo);
            return (
                <div className={style.parent}>
                    <div className={style.main}>
                        <div className={style.avatarContainer}>
                            {zaloCustomer?.data.avatar && (
                                <LazyImage className={style.avatar} src={zaloCustomer?.data.avatar} alt="avatar" />
                            )}
                        </div>
                        <div className={style.contentContainer}>
                            <div className={style.content}>
                                <LazyVideo className={style.image} src={messageVideo.attachments[0].payload.url} />
                                <div className={style.text}>
                                    {messageVideo.text && <LinkifyText text={messageVideo.text} />}
                                </div>
                            </div>
                            <div className={style.status}>{data.messageStatus}</div>
                        </div>
                    </div>
                </div>
            );
        }
        default: {
            return;
        }
    }
};

export default memo(YourMessage);
