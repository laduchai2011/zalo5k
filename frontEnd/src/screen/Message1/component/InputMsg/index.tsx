import { memo, useRef, useState } from 'react';
import style from './style.module.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@src/redux';
import { IoSend } from 'react-icons/io5';
import { CiImageOn } from 'react-icons/ci';
import { MdOutlineOndemandVideo, MdAttachFile } from 'react-icons/md';
import { PiSmileyStickerLight } from 'react-icons/pi';
import { ZaloAppField, ZaloOaField } from '@src/dataStruct/zalo';
import { useCreateMessageV1Query } from '@src/redux/query/messageV1RTK';
import { CreateMessageV1BodyField } from '@src/dataStruct/message_v1/body';

const InputMsg = () => {
    const { id } = useParams<{ id: string }>();
    const textarea_element = useRef<HTMLTextAreaElement | null>(null);
    const zaloApp: ZaloAppField | undefined = useSelector((state: RootState) => state.AppSlice.zaloApp);
    const zaloOa: ZaloOaField | undefined = useSelector((state: RootState) => state.MessageV1Slice.zaloOa);
    const [text, setText] = useState<string>('');

    const handleInput = () => {
        const el = textarea_element.current;
        if (!el) return;

        el.style.height = 'auto'; // reset
        el.style.height = el.scrollHeight + 'px'; // grow theo nội dung
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setText(value);
    };

    const handleSend = () => {
        if (!zaloApp || !zaloOa || !id) return;

        // const createMessageV1Body: CreateMessageV1BodyField = {
        //     zaloApp: zaloApp,
        //     zaloOa: zaloOa, 
        //     chatRoomId: Number(id),
        //     payload: {
        //         recipient: 
        //     }
        // }
    }

    return (
        <div className={style.parent}>
            <div className={style.icons}>
                <CiImageOn size={20} />
                <MdOutlineOndemandVideo size={20} />
                <MdAttachFile size={20} />
                <PiSmileyStickerLight size={20} />
            </div>
            <div className={style.textInput}>
                <div>
                    <textarea
                        value={text}
                        onChange={(e) => handleTextChange(e)}
                        ref={textarea_element}
                        rows={2}
                        placeholder="Nhắn gì đó !"
                        onInput={handleInput}
                    />
                </div>
                <div>
                    <IoSend onClick={() => handleSend()} size={25} />
                </div>
            </div>
        </div>
    );
};

export default memo(InputMsg);
