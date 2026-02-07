import { useEffect } from 'react';
import style from './style.module.scss';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@src/redux';
import { MESSAGE } from '@src/const/text';
import InputMsg from './component/InputMsg';
import MsgList from './component/MsgList';
import { useGetChatRoomsWithIdQuery } from '@src/redux/query/chatRoomRTK';
import { setData_chatRoom, setData_toastMessage, set_isLoading } from '@src/redux/slice/Message1';
import { messageType_enum } from '@src/component/ToastMessage/type';

const Message1 = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>();
    const {
        data: data_chatRoom,
        // isFetching,
        isLoading: isLoading_chatRoom,
        isError: isError_chatRoom,
        error: error_chatRoom,
    } = useGetChatRoomsWithIdQuery({ id: Number(id) }, { skip: id === undefined });
    useEffect(() => {
        if (isError_chatRoom && error_chatRoom) {
            console.error(error_chatRoom);
            dispatch(
                setData_toastMessage({
                    type: messageType_enum.ERROR,
                    message: 'Lấy dữ liệu phòng hội thoại KHÔNG thành công !',
                })
            );
        }
    }, [dispatch, isError_chatRoom, error_chatRoom]);
    useEffect(() => {
        dispatch(set_isLoading(isLoading_chatRoom));
    }, [dispatch, isLoading_chatRoom]);
    useEffect(() => {
        const resData = data_chatRoom;
        if (resData?.isSuccess && resData.data) {
            dispatch(setData_chatRoom(resData.data));
        }
    }, [dispatch, data_chatRoom]);

    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{MESSAGE}</div>
                <MsgList />
                <InputMsg />
            </div>
        </div>
    );
};

export default Message1;
