import { useRef, useState, useEffect } from 'react';
import style from './style.module.scss';
import YourMessage from './components/YourMessage';
// import MyMessage from './components/MyMessage';
import { MESSAGE } from '@src/const/text';

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

        // console.log(
        //     111111,
        //     contentContainerElement.scrollTop,
        //     contentContainerElement.scrollHeight,
        //     contentContainerElement.clientHeight
        // );
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

        // console.log(222222222222);

        // const res = await fetchMessages(page);

        setData((prev) => [index_mes + 1, ...prev]);
        set_index_mes((prev) => prev + 1);
        // setPage((p) => p + 1);
        // setHasMore(res.hasMore);
        // setHasMore(false);

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
            </div>
        </div>
    );
};

export default Message;
