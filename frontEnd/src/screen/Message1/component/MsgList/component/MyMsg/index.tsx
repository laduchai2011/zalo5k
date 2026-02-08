import { FC, memo, useState } from 'react';
import style from './style.module.scss';
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
import { Zalo_Event_Name_Enum } from '@src/dataStruct/zalo/hookData/common';

const MyMsg: FC<{ msgList_element?: HTMLDivElement | null; data?: MessageV1Field<ZaloMessageType> }> = ({
    msgList_element,
    data,
}) => {
    const [isMore, setIsMore] = useState<boolean>(false);

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

    return (
        <div className={style.parent}>
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
                <div className={style.name}>
                    <div>(Bạn)</div>
                    <div>Name</div>
                </div>
                <div>{msg()}</div>
                <div className={style.moreInfor}>time</div>
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
