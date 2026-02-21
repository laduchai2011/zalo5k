import { memo, useRef, useState, useEffect } from 'react';
import style from './style.module.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@src/redux';
import { IoSend } from 'react-icons/io5';
import { CiImageOn } from 'react-icons/ci';
import { MdOutlineOndemandVideo, MdAttachFile } from 'react-icons/md';
import { PiSmileyStickerLight } from 'react-icons/pi';
import { ZaloAppField, ZaloOaField } from '@src/dataStruct/zalo';
import { useCreateMessageV1Mutation, useGetLastMessageQuery } from '@src/redux/query/messageV1RTK';
import { CreateMessageV1BodyField } from '@src/dataStruct/message_v1/body';
import { MessageV1Field } from '@src/dataStruct/message_v1';
import { ZaloMessageType } from '@src/dataStruct/zalo/hookData';

const InputMsg = () => {
    const { id } = useParams<{ id: string }>();
    const textarea_element = useRef<HTMLTextAreaElement | null>(null);
    const zaloApp: ZaloAppField | undefined = useSelector((state: RootState) => state.AppSlice.zaloApp);
    const zaloOa: ZaloOaField | undefined = useSelector((state: RootState) => state.MessageV1Slice.zaloOa);
    const [text, setText] = useState<string>('');
    const [lastMessage, setLastMessage] = useState<MessageV1Field<ZaloMessageType> | undefined>(undefined);
    const [createMessageV1] = useCreateMessageV1Mutation();

    const {
        data: data_lastMessage,
        // isFetching,
        isLoading: isLoading_lastMessage,
        isError: isError_lastMessage,
        error: error_lastMessage,
    } = useGetLastMessageQuery({ chatRoomId: id || '' }, { skip: id === undefined });
    useEffect(() => {
        if (isError_lastMessage && error_lastMessage) {
            console.error(error_lastMessage);
        }
    }, [isError_lastMessage, error_lastMessage]);
    useEffect(() => {
        // dispatch(set_isLoading(isLoading_zaloOa));
    }, [isLoading_lastMessage]);
    useEffect(() => {
        const resData = data_lastMessage;
        if (resData?.isSuccess && resData.data) {
            setLastMessage(resData.data);
        }
    }, [data_lastMessage]);

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
        if (!lastMessage) return;

        const txt = text.trim();
        if (txt.length === 0) return;

        let u_senderId: string = '';

        const isUserSend = lastMessage.event_name.startsWith('user_send');
        const isOaSend = lastMessage.event_name.startsWith('oa_send');

        if (isUserSend) {
            u_senderId = lastMessage.sender_id;
        }

        if (isOaSend) {
            u_senderId = lastMessage.recipient_id;
        }

        const createMessageV1Body: CreateMessageV1BodyField = {
            zaloApp: zaloApp,
            zaloOa: zaloOa,
            chatRoomId: Number(id),
            payload: {
                recipient: {
                    user_id: u_senderId,
                },
                message: {
                    text: txt,
                },
            },
        };

        createMessageV1(createMessageV1Body)
            .then(() => {
                // const resData = res.data;
                // console.log(111111, resData);
                setText('');
            })
            .catch((err) => console.error(err));
    };

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
