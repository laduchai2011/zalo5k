import { memo, useRef, useEffect, useState } from 'react';
import style from './style.module.scss';
import { useParams } from 'react-router-dom';
import UserMsg from './component/UserMsg';
import MyMsg from './component/MyMsg';
import { useLazyGetMessagesForChatScreenQuery } from '@src/redux/query/messageV1RTK';
import { MessageV1Field } from '@src/dataStruct/message_v1';
import { ZaloMessageType } from '@src/dataStruct/zalo/hookData';

const MsgList = () => {
    const { id } = useParams<{ id: string }>();
    const parent_element = useRef<HTMLDivElement | null>(null);
    const bottom_element = useRef<HTMLDivElement | null>(null);
    const [messages, setMessages] = useState<MessageV1Field<ZaloMessageType>[]>([]);
    const size = 10;
    const lockLoadMore = useRef<boolean>(true);
    const [cursor, setCursor] = useState<string | null>(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [getMessages] = useLazyGetMessagesForChatScreenQuery();

    useEffect(() => {
        if (!id) return;
        getMessages({ cursor: null, size: size, chatRoomId: Number(id) })
            .then((res) => {
                const resData = res.data;
                if (resData?.isSuccess && resData.data) {
                    setMessages(resData.data?.items);
                    setCursor(resData.data.cursor);
                    setHasMore(resData.data?.items.length === size);
                }
                requestAnimationFrame(() => {
                    if (!parent_element.current) return;
                    const parentElement = parent_element.current;
                    parentElement.scrollTop = parentElement.scrollHeight;
                });
            })
            .catch((err) => console.error(err))
            .finally(() => (lockLoadMore.current = false));
    }, [getMessages, id]);

    useEffect(() => {
        const scrollToBottom = () => {
            if (!bottom_element.current) return;
            const bottomElement = bottom_element.current;
            bottomElement.scrollIntoView({ behavior: 'auto' });
        };
        scrollToBottom();
        setTimeout(() => {
            scrollToBottom();
        }, 1000);
        setTimeout(() => {
            scrollToBottom();
        }, 2000);
    }, []);

    const loadMore = async () => {
        if (!id) return;
        if (lockLoadMore.current) return;
        if (!hasMore || isLoadingMore) return;
        if (!parent_element.current) return;
        const parentElement = parent_element.current;

        setIsLoadingMore(true);

        const container = parentElement;
        const prevScrollHeight = container.scrollHeight;
        const prevScrollTop = container.scrollTop;

        getMessages({ cursor: cursor, size: size, chatRoomId: Number(id) })
            .then((res) => {
                const resData = res.data;
                if (resData?.isSuccess && resData.data) {
                    setMessages((pre) => [...(resData.data?.items || []), ...pre]);
                    setCursor(resData.data.cursor);
                    setHasMore(resData.data?.items.length === size);
                }
                requestAnimationFrame(() => {
                    const newScrollHeight = container.scrollHeight;
                    container.scrollTop = prevScrollTop + (newScrollHeight - prevScrollHeight);
                    setIsLoadingMore(false);
                });
            })
            .catch((err) => console.error(err))
            .finally(() => (lockLoadMore.current = false));
    };

    const onScroll = () => {
        const el = parent_element.current;
        if (!el) return;

        if (el.scrollTop <= 20) {
            loadMore();
        }
    };

    const list_message = messages.map((item, index) => {
        const eventName = item.event_name;
        const isUserSend = eventName.startsWith('user_send');
        const isOaSend = eventName.startsWith('oa_send');

        if (isUserSend) {
            return <UserMsg key={index} msgList_element={parent_element.current} data={item} />;
        }

        if (isOaSend) {
            return <MyMsg key={index} msgList_element={parent_element.current} data={item} />;
        }

        return;
    });

    return (
        <div className={style.parent} ref={parent_element} onScroll={onScroll}>
            {isLoadingMore && <div className={style.loading}>Đang tải ...</div>}
            {list_message}
            <div ref={bottom_element}></div>
        </div>
    );
};

export default memo(MsgList);
