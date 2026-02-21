import { FC, memo, useState, useEffect } from 'react';
import style from './style.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@src/redux';
import { IoIosMore } from 'react-icons/io';
import MsgText from './MsgText';
import MsgImage from './MsgImage';
import MsgVideo from './MsgVideo';
import MsgAudio from './MsgAudio';
import MsgFile from './MsgFile';
import MsgSticker from './MsgSticker';
import MsgLink from './MsgLink';
import {
    ZaloMessageType,
    MessageTextField,
    MessageImageField,
    MessageMultiImageField,
    MessageVideoField,
    MessageAudioField,
    MessageFileField,
    MessageStickerField,
    MessageLinkField,
} from '@src/dataStruct/zalo/hookData';
import { MessageV1Field } from '@src/dataStruct/message_v1';
import { ZaloAppField, ZaloOaField } from '@src/dataStruct/zalo';
import { ZaloUserField } from '@src/dataStruct/zalo/user';
import { ChatRoomField } from '@src/dataStruct/chatRoom';
import { Zalo_Event_Name_Enum } from '@src/dataStruct/zalo/hookData/common';
import { timeAgoSmart } from '@src/utility/time';
import { useGetZaloUserQuery } from '@src/redux/query/zaloRTK';

const UserMsg: FC<{ msgList_element?: HTMLDivElement | null; data?: MessageV1Field<ZaloMessageType> }> = ({
    msgList_element,
    data,
}) => {
    const zaloApp: ZaloAppField | undefined = useSelector((state: RootState) => state.AppSlice.zaloApp);
    const zaloOa: ZaloOaField | undefined = useSelector((state: RootState) => state.MessageV1Slice.zaloOa);
    const chatRoom: ChatRoomField | undefined = useSelector((state: RootState) => state.MessageV1Slice.chatRoom);
    const userIdByApp = chatRoom?.userIdByApp;
    const [zaloUser, setZaloUser] = useState<ZaloUserField | undefined>(undefined);

    const {
        data: data_zaloUser,
        // isFetching,
        isLoading: isLoading_zaloUser,
        isError: isError_zaloUser,
        error: error_zaloUser,
    } = useGetZaloUserQuery(
        { zaloApp: zaloApp!, zaloOa: zaloOa!, userIdByApp: userIdByApp! },
        { skip: zaloApp === undefined || zaloOa === undefined || userIdByApp === undefined }
    );
    useEffect(() => {
        if (isError_zaloUser && error_zaloUser) {
            console.error(error_zaloUser);
            // dispatch(
            //     setData_toastMessage({
            //         type: messageType_enum.ERROR,
            //         message: 'Lấy dữ liệu phòng hội thoại KHÔNG thành công !',
            //     })
            // );
        }
    }, [isError_zaloUser, error_zaloUser]);
    useEffect(() => {
        // dispatch(set_isLoading(isLoading_chatRoom));
    }, [isLoading_zaloUser]);
    useEffect(() => {
        const resData = data_zaloUser;
        // console.log(resData);
        if (resData?.isSuccess && resData.data && resData.data) {
            setZaloUser(resData.data);
        }
    }, [data_zaloUser]);

    const [isMore, setIsMore] = useState<boolean>(false);

    const handleShowMore = () => {
        setIsMore(!isMore);
    };

    const msg = () => {
        if (!data) return;
        const event_name = data.event_name;

        switch (event_name) {
            case Zalo_Event_Name_Enum.user_send_text: {
                const data_t = data as MessageV1Field<MessageTextField>;
                return <MsgText data={data_t} />;
            }
            case Zalo_Event_Name_Enum.user_send_image: {
                const data_t = data as MessageV1Field<MessageImageField | MessageMultiImageField>;
                return <MsgImage data={data_t} />;
            }
            case Zalo_Event_Name_Enum.user_send_video: {
                const data_t = data as MessageV1Field<MessageVideoField>;
                return <MsgVideo msgList_element={msgList_element} data={data_t} />;
            }
            case Zalo_Event_Name_Enum.user_send_audio: {
                const data_t = data as MessageV1Field<MessageAudioField>;
                return <MsgAudio data={data_t} />;
            }
            case Zalo_Event_Name_Enum.user_send_file: {
                const data_t = data as MessageV1Field<MessageFileField>;
                return <MsgFile data={data_t} />;
            }
            case Zalo_Event_Name_Enum.user_send_sticker: {
                const data_t = data as MessageV1Field<MessageStickerField>;
                return <MsgSticker data={data_t} />;
            }
            case Zalo_Event_Name_Enum.user_send_link: {
                const data_t = data as MessageV1Field<MessageLinkField>;
                return <MsgLink data={data_t} />;
            }
            default: {
                return;
            }
        }
    };

    return (
        <div className={style.parent}>
            <div className={style.avatarContainer}>
                <img src={zaloUser?.data.avatar} alt="avatar" />
            </div>
            <div className={style.msgContainer}>
                <div className={style.name}>{zaloUser?.data.display_name}</div>
                <div>{msg()}</div>
                {data?.timestamp && <div className={style.moreInfor}>{timeAgoSmart(data.timestamp)}</div>}
            </div>
            <div className={style.iconContainer}>
                <IoIosMore onClick={() => handleShowMore()} size={25} />
                {isMore && (
                    <div className={style.moreContainer}>
                        <div>Trả lời</div>
                        <div>Chia sẻ</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(UserMsg);
