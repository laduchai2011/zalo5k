import { FC, memo } from 'react';
import style from './style.module.scss';
import { IoMdClose } from 'react-icons/io';
import ReplyText from './component/ReplyText';
import { Zalo_Event_Name_Enum } from '@src/dataStruct/zalo/hookData/common';
import { MessageV1Field } from '@src/dataStruct/message_v1';
import { ZaloMessageType, MessageTextField } from '@src/dataStruct/zalo/hookData';

const ReplyContainer: FC<{ data?: MessageV1Field<ZaloMessageType> }> = ({ data }) => {
    const ReplyMsg = () => {
        if (!data) return;

        const event_name = data.event_name;

        switch (event_name) {
            case Zalo_Event_Name_Enum.oa_send_text: {
                const data_t = data as MessageV1Field<MessageTextField>;
                return <ReplyText data={data_t} />;
            }
            // case Zalo_Event_Name_Enum.oa_send_image: {
            //     const data_t = data as MessageV1Field<MessageImageField | MessageMultiImageField>;

            // }
            // case Zalo_Event_Name_Enum.oa_send_video: {
            //     const data_t = data as MessageV1Field<MessageVideoField>;
            //     return <MsgVideo msgList_element={msgList_element} data={data_t} />;
            // }
            // case Zalo_Event_Name_Enum.oa_send_audio: {
            //     const data_t = data as MessageV1Field<MessageAudioField>;

            // }
            // case Zalo_Event_Name_Enum.oa_send_file: {
            //     const data_t = data as MessageV1Field<MessageFileField>;

            // }
            // case Zalo_Event_Name_Enum.oa_send_sticker: {
            //     const data_t = data as MessageV1Field<MessageStickerField>;

            // }
            default: {
                return;
            }
        }
    };

    return (
        <div className={style.parent}>
            <div />
            <div>
                <div>tra loi</div>
                <div>{ReplyMsg()}</div>
            </div>
            <div>
                <IoMdClose />
            </div>
        </div>
    );
};

export default memo(ReplyContainer);
