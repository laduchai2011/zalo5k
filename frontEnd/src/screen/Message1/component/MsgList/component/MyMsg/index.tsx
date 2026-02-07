import { FC, memo, useState } from 'react';
import style from './style.module.scss';
import { IoIosMore } from 'react-icons/io';
import MsgText from './MsgText';
import MsgImage from './MsgImage';
import MsgVideo from './MsgVideo';
import MsgAudio from './MsgAudio';
import MsgFile from './MsgFile';
import MsgSticker from './MsgSticker';
import { HookDataField } from '@src/dataStruct/zalo/hookData';
import { Zalo_Event_Name_Enum } from '@src/dataStruct/zalo/hookData/common';

const MyMsg: FC<{ msgList_element?: HTMLDivElement | null; hookData?: HookDataField }> = ({
    msgList_element,
    hookData,
}) => {
    const [isMore, setIsMore] = useState<boolean>(false);

    const handleShowMore = () => {
        setIsMore(!isMore);
    };

    const msg = () => {
        if (!hookData) return;
        const event_name = hookData.event_name;

        switch (event_name) {
            case Zalo_Event_Name_Enum.oa_send_text: {
                return <MsgText hookData={hookData} />;
            }
            case Zalo_Event_Name_Enum.oa_send_image: {
                return <MsgImage hookData={hookData} />;
            }
            case Zalo_Event_Name_Enum.oa_send_video: {
                return <MsgVideo msgList_element={msgList_element} hookData={hookData} />;
            }
            case Zalo_Event_Name_Enum.oa_send_audio: {
                return <MsgAudio hookData={hookData} />;
            }
            case Zalo_Event_Name_Enum.oa_send_file: {
                return <MsgFile hookData={hookData} />;
            }
            case Zalo_Event_Name_Enum.oa_send_sticker: {
                return <MsgSticker hookData={hookData} />;
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
