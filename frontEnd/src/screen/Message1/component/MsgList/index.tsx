import { memo, useRef, useEffect, useState } from 'react';
import style from './style.module.scss';
import { useParams } from 'react-router-dom';
import UserMsg from './component/UserMsg';
import MyMsg from './component/MyMsg';
import { useGetMessagesForChatScreenQuery } from '@src/redux/query/message1RTK';
import { MessageV1Field, PagedMessageV1Field } from '@src/dataStruct/message_v1';
import { ZaloMessageType } from '@src/dataStruct/zalo/hookData';

const MsgList = () => {
    const { id } = useParams<{ id: string }>();
    const parent_element = useRef<HTMLDivElement | null>(null);
    const [messages, setMessages] = useState<MessageV1Field<ZaloMessageType>[]>([]);
    const [pagedMessage, setPagedMessage] = useState<PagedMessageV1Field<ZaloMessageType> | null>(null);
    const size = 30;

    const {
        data: data_messages,
        // isFetching,
        isLoading: isLoading_messages,
        isError: isError_messages,
        error: error_messages,
    } = useGetMessagesForChatScreenQuery({ cursor: null, size: size, chatRoomId: 23 }, { skip: id === undefined });
    useEffect(() => {
        if (isError_messages && error_messages) {
            console.error(error_messages);
            // dispatch(
            //     setData_toastMessage({
            //         type: messageType_enum.ERROR,
            //         message: 'Lấy dữ liệu OA KHÔNG thành công !',
            //     })
            // );
        }
    }, [isError_messages, error_messages]);
    useEffect(() => {
        // dispatch(set_isLoading(isLoading_chatSession));
    }, [isLoading_messages]);
    useEffect(() => {
        const resData = data_messages;
        console.log(resData);
        if (resData?.isSuccess && resData.data) {
            setMessages((pre) => [...pre, ...(resData.data?.items || [])]);
            setPagedMessage(resData.data);
        }
    }, [data_messages]);

    const list_message = messages.map((item) => {
        const eventName = item.event_name;
        const isUserSend = eventName.startsWith('user_send');
        const isOaSend = eventName.startsWith('oa_send');

        if (isUserSend) {
            return <UserMsg key={item.message_id} msgList_element={parent_element.current} data={item} />;
        }

        if (isOaSend) {
            return <MyMsg key={item.message_id} msgList_element={parent_element.current} data={item} />;
        }

        return;
    });

    return (
        <div className={style.parent} ref={parent_element}>
            {list_message}
        </div>
    );
};

export default memo(MsgList);
