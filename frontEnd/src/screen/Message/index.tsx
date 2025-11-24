import { useRef, useState, useEffect } from 'react';
import style from './style.module.scss';
import YourMessage from './components/YourMessage';
// import MyMessage from './components/MyMessage';
import { MESSAGE } from '@src/const/text';
import { IoMdSend } from 'react-icons/io';

const Message = () => {
    const [hasMore, setHasMore] = useState(true);
    const contentContainer_element = useRef<HTMLDivElement | null>(null);
    const [data, setData] = useState<number[]>([1, 2, 3, 4, 5, 6]);
    const [index_mes, set_index_mes] = useState<number>(6);

    useEffect(() => {
        loadMore();
    }, []);

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

        setData((prev) => [index_mes + 1, ...prev]);
        set_index_mes((prev) => prev + 1);

        // GIỮ NGUYÊN CHỖ ĐANG ĐỌC SAU KHI THÊM TIN
        requestAnimationFrame(() => {
            if (contentContainerElement) {
                const newScrollHeight = contentContainerElement.scrollHeight;
                contentContainerElement.scrollTop = newScrollHeight - oldScrollHeight;
            }
        });
    };

    const list_mes = data.map((item, index) => {
        return <YourMessage key={index} data={item} />;
    });

    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{MESSAGE}</div>
                <div className={style.contentContainer} ref={contentContainer_element} onScroll={handleScroll}>
                    {list_mes}
                </div>
                <div className={style.inputContainer}>
                    <input placeholder="Viết tin nhắn" />
                    <IoMdSend size={30} color="blue" />
                </div>
            </div>
        </div>
    );
};

export default Message;
