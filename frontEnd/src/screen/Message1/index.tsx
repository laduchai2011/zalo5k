import { useEffect } from 'react';
import style from './style.module.scss';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/redux';
import { MESSAGE } from '@src/const/text';
import InputMsg from './component/InputMsg';
import MsgList from './component/MsgList';
import { useGetChatRoomsWithIdQuery } from '@src/redux/query/chatRoomRTK';
import { useGetZaloOaWithIdQuery } from '@src/redux/query/zaloRTK';
import { setData_chatRoom, setData_toastMessage, set_isLoading, set_zaloOa } from '@src/redux/slice/Message1';
import { messageType_enum } from '@src/component/ToastMessage/type';
import { AccountInformationField } from '@src/dataStruct/account';

const Message1 = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>();
    const accountInformation: AccountInformationField | undefined = useSelector(
        (state: RootState) => state.AppSlice.accountInformation
    );

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

    const {
        data: data_zaloOa,
        // isFetching,
        isLoading: isLoading_zaloOa,
        isError: isError_zaloOa,
        error: error_zaloOa,
    } = useGetZaloOaWithIdQuery(
        { id: Number(id) || -1, accountId: accountInformation?.addedById || -1 },
        { skip: id === undefined || accountInformation === undefined }
    );
    useEffect(() => {
        if (isError_zaloOa && error_zaloOa) {
            console.error(error_zaloOa);
            dispatch(
                setData_toastMessage({
                    type: messageType_enum.SUCCESS,
                    message: 'Lấy dữ liệu OA KHÔNG thành công !',
                })
            );
        }
    }, [dispatch, isError_zaloOa, error_zaloOa]);
    useEffect(() => {
        dispatch(set_isLoading(isLoading_zaloOa));
    }, [dispatch, isLoading_zaloOa]);
    useEffect(() => {
        const resData = data_zaloOa;
        if (resData?.isSuccess && resData.data) {
            // setZaloOa(resData.data);
            dispatch(set_zaloOa(resData.data));
        }
    }, [dispatch, data_zaloOa]);

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
