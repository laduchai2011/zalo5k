import { FC, memo, useState, useEffect, useRef } from 'react';
import style from './style.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@src/redux';
import { useParams } from 'react-router-dom';
import { IoIosMore } from 'react-icons/io';
import MsgText from './MsgText';
import MsgImage from './MsgImage';
import MsgVideo from './MsgVideo';
import MsgAudio from './MsgAudio';
import MsgFile from './MsgFile';
import MsgSticker from './MsgSticker';
import {
    ZaloMessageType,
    MessageTextField,
    MessageImageField,
    MessageMultiImageField,
    MessageVideoField,
    MessageAudioField,
    MessageFileField,
    MessageStickerField,
} from '@src/dataStruct/zalo/hookData';
import { MessageV1Field } from '@src/dataStruct/message_v1';
import { AccountField } from '@src/dataStruct/account';
import { ChatRoomRoleField } from '@src/dataStruct/chatRoom';
import { Zalo_Event_Name_Enum } from '@src/dataStruct/zalo/hookData/common';
import { timeAgoSmart } from '@src/utility/time';
import { useGetChatRoomRoleWithCridAaidQuery } from '@src/redux/query/chatRoomRTK';
import { useGetAccountWithIdQuery } from '@src/redux/query/accountRTK';

const MyMsg: FC<{ msgList_element?: HTMLDivElement | null; data?: MessageV1Field<ZaloMessageType> }> = ({
    msgList_element,
    data,
}) => {
    const defaultColor = '#EBEBEB';
    const parent_element = useRef<HTMLDivElement | null>(null);
    const account: AccountField | undefined = useSelector((state: RootState) => state.AppSlice.account);
    const { id } = useParams<{ id: string }>();
    const [isMore, setIsMore] = useState<boolean>(false);
    const [chatRoomRole, setChatRoomRole] = useState<ChatRoomRoleField | undefined>(undefined);
    const youString: string | null = data?.reply_account_id === account?.id ? 'Bạn' : null;
    const [accountWId, setAccountWId] = useState<AccountField | undefined>(undefined);

    const handleShowMore = () => {
        setIsMore(!isMore);
    };

    const msg = () => {
        if (!data) return;
        const event_name = data.event_name;

        switch (event_name) {
            case Zalo_Event_Name_Enum.oa_send_text: {
                const data_t = data as MessageV1Field<MessageTextField>;
                return <MsgText data={data_t} />;
            }
            case Zalo_Event_Name_Enum.oa_send_image: {
                const data_t = data as MessageV1Field<MessageImageField | MessageMultiImageField>;
                return <MsgImage data={data_t} />;
            }
            case Zalo_Event_Name_Enum.oa_send_video: {
                const data_t = data as MessageV1Field<MessageVideoField>;
                return <MsgVideo msgList_element={msgList_element} data={data_t} />;
            }
            case Zalo_Event_Name_Enum.oa_send_audio: {
                const data_t = data as MessageV1Field<MessageAudioField>;
                return <MsgAudio data={data_t} />;
            }
            case Zalo_Event_Name_Enum.oa_send_file: {
                const data_t = data as MessageV1Field<MessageFileField>;
                return <MsgFile data={data_t} />;
            }
            case Zalo_Event_Name_Enum.oa_send_sticker: {
                const data_t = data as MessageV1Field<MessageStickerField>;
                return <MsgSticker data={data_t} />;
            }
            default: {
                return;
            }
        }
    };

    const {
        data: data_chatRoomRole,
        // isFetching,
        isLoading: isLoading_chatRoomRole,
        isError: isError_chatRoomRole,
        error: error_chatRoomRole,
    } = useGetChatRoomRoleWithCridAaidQuery(
        { authorizedAccountId: data?.reply_account_id || -1, chatRoomId: Number(id) },
        { skip: id === undefined || data === undefined }
    );
    useEffect(() => {
        if (isError_chatRoomRole && error_chatRoomRole) {
            console.error(error_chatRoomRole);
            // dispatch(
            //     setData_toastMessage({
            //         type: messageType_enum.ERROR,
            //         message: 'Lấy dữ liệu phòng hội thoại KHÔNG thành công !',
            //     })
            // );
        }
    }, [isError_chatRoomRole, error_chatRoomRole]);
    useEffect(() => {
        // dispatch(set_isLoading(isLoading_chatRoom));
    }, [isLoading_chatRoomRole]);
    useEffect(() => {
        const resData = data_chatRoomRole;
        if (resData?.isSuccess && resData.data) {
            setChatRoomRole(resData.data);
        }
    }, [data_chatRoomRole]);

    const {
        data: data_account_wid,
        // isFetching,
        isLoading: isLoading_account_wid,
        isError: isError_account_wid,
        error: error_account_wid,
    } = useGetAccountWithIdQuery({ id: data?.reply_account_id || -1 }, { skip: data === undefined });
    useEffect(() => {
        if (isError_account_wid && error_account_wid) {
            console.error(error_account_wid);
        }
    }, [isError_account_wid, error_account_wid]);
    useEffect(() => {
        // dispatch(set_isLoading(isLoading_account));
    }, [isLoading_account_wid]);
    useEffect(() => {
        const resData = data_account_wid;
        if (resData?.isSuccess && resData.data) {
            setAccountWId(resData.data);
        }
    }, [data_account_wid]);

    useEffect(() => {
        if (!parent_element.current) return;
        const parentElement = parent_element.current;
        const background = chatRoomRole?.backGroundColor ? chatRoomRole?.backGroundColor : defaultColor;
        parentElement.style.setProperty('--msgBackground', `${background}`);
    }, [chatRoomRole]);

    return (
        <div className={style.parent} ref={parent_element}>
            <div className={style.iconContainer}>
                <IoIosMore onClick={() => handleShowMore()} size={25} />
                {isMore && (
                    <div className={style.moreContainer}>
                        <div>Trả lời</div>
                        <div>Chia sẻ</div>
                    </div>
                )}
            </div>
            <div className={style.msgContainer}>
                <div className={style.nameContainer}>
                    {youString && <div className={style.youString}>{`(${youString})`}</div>}
                    <div className={style.name}>{accountWId?.firstName + ' ' + accountWId?.lastName}</div>
                </div>
                <div>{msg()}</div>
                {data?.timestamp && <div className={style.moreInfor}>{timeAgoSmart(data.timestamp)}</div>}
            </div>
            <div className={style.avatarContainer}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNzSvQMx07eqW79xIar2vd4x_1NUKPZ7kKUw&s"
                    alt="avatar"
                />
            </div>
        </div>
    );
};

export default memo(MyMsg);
