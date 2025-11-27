import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './style.module.scss';
// import YourMessage from './components/YourMessage';
import MyMessage from './components/MyMessage';
import { MESSAGE } from '@src/const/text';
import { CreateMessageBodyField, messageStatus_enum, sender_enum, MessageField } from '@src/dataStruct/message';
import { HookDataField, MessageTextField, zalo_event_name_enum } from '@src/dataStruct/hookData';
import { IoMdSend } from 'react-icons/io';
import { useCreateMessageMutation } from '@src/redux/query/messageRTK';
import io from 'socket.io-client';
import { SocketType, MessageSoc } from '@src/dataStruct/socketIO';
import { SOCKET_URL } from '@src/const/api/socketUrl';

let socket: SocketType;

const Message = () => {
    const myId = sessionStorage.getItem('myId');
    const { id } = useParams<{ id: string }>();
    const [hasMore, setHasMore] = useState(true);
    const contentContainer_element = useRef<HTMLDivElement | null>(null);
    const [data, setData] = useState<MessageField[]>([]);
    const [index_mes, set_index_mes] = useState<number>(6);
    const [newMessage, setNewMessage] = useState<string>('');

    const [createMessage] = useCreateMessageMutation();

    useEffect(() => {
        // loadMore();
    }, []);

    useEffect(() => {
        if (!myId) return;
        if (!id) return;
        const myRoom = myId + id;

        // Kết nối server
        socket = io(SOCKET_URL || '');

        socket.on('connect', () => {
            console.log('Connected:', socket.id);
        });

        // Nhận message từ server
        socket.on('roomMessage', (message: MessageSoc) => {
            // setMessages((prev) => [...prev, data]);
            console.log('roomMessage', message);
        });

        console.log('myRoom', myRoom);
        socket.emit('joinRoom', myRoom);

        // socket.emit('roomMessage', { roomName: myId, message: 'client hello' });

        return () => {
            socket.emit('leaveRoom', myId);
            socket.disconnect();
        };
    }, [myId, id]);

    const handleScroll = () => {
        const contentContainerElement = contentContainer_element.current;
        if (!contentContainerElement) return;

        const scrollTop = contentContainerElement.scrollTop;
        const scrollHeight = contentContainerElement.scrollHeight;
        const clientHeight = contentContainerElement.clientHeight;

        if (-1 * scrollTop + clientHeight > scrollHeight - 200) {
            loadMore();
        }
    };

    const loadMore = async () => {
        if (!hasMore) return;

        const contentContainerElement = contentContainer_element.current;
        const oldScrollHeight = contentContainerElement?.scrollHeight ?? 0;

        // setData((prev) => [index_mes + 1, ...prev]);
        set_index_mes((prev) => prev + 1);

        // GIỮ NGUYÊN CHỖ ĐANG ĐỌC SAU KHI THÊM TIN
        requestAnimationFrame(() => {
            if (contentContainerElement) {
                const newScrollHeight = contentContainerElement.scrollHeight;
                contentContainerElement.scrollTop = newScrollHeight - oldScrollHeight;
            }
        });
    };

    const handleNewMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewMessage(value);
    };

    const handleSend = () => {
        if (!myId) return;
        if (!id) return;
        const myRoom = myId + id;

        const newMes = newMessage.trim();
        if (newMes.length === 0) return;

        const messageText: MessageTextField = {
            text: newMes,
            msg_id: '',
        };

        const hookData: HookDataField<MessageTextField> = {
            app_id: '',
            user_id_by_app: '',
            event_name: zalo_event_name_enum.member_sending,
            sender: {
                id: myId,
            },
            recipient: {
                id: id,
            },
            message: messageText,
            timestamp: '',
        };

        const createMessageBody: CreateMessageBodyField = {
            eventName: zalo_event_name_enum.member_sending,
            sender: sender_enum.MEMBER,
            receiveId: id,
            message: JSON.stringify(hookData),
            timestamp: '',
            messageStatus: messageStatus_enum.SENDING,
            accountId: -1,
        };

        createMessage(createMessageBody)
            .then((res) => {
                const resData = res.data;
                console.log('createMessage', resData);
                if (resData?.isSuccess && resData.data) {
                    socket.emit('roomMessage', { roomName: myRoom, message: JSON.stringify(resData.data) });
                }
            })
            .catch((err) => console.error(err));
    };

    const list_mes = data.map((item, index) => {
        return <MyMessage key={index} data={item} />;
    });

    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{MESSAGE}</div>
                <div className={style.contentContainer} ref={contentContainer_element} onScroll={handleScroll}>
                    {list_mes}
                </div>
                <div className={style.inputContainer}>
                    <input value={newMessage} onChange={(e) => handleNewMessageChange(e)} placeholder="Viết tin nhắn" />
                    <IoMdSend onClick={() => handleSend()} size={30} color="blue" />
                </div>
            </div>
        </div>
    );
};

export default Message;
