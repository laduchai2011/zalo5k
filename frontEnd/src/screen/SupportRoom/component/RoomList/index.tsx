import { memo, useEffect, useState } from 'react';
import style from './style.module.scss';
import ARoom from './component/ARoom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/redux';
import { useLazyGetChatRoomsMongoQuery } from '@src/redux/query/chatRoomRTK';
import { setData_toastMessage, set_isLoading } from '@src/redux/slice/SupportRoom';
import { messageType_enum } from '@src/component/ToastMessage/type';
import { AccountField } from '@src/dataStruct/account';
import { ChatRoomRoleSchema } from '@src/dataStruct/chatRoom';
import { ZaloOaField } from '@src/dataStruct/zalo';
import { SEE_MORE } from '@src/const/text';

const RoomList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const account: AccountField | undefined = useSelector((state: RootState) => state.AppSlice.account);
    const selectedOa: ZaloOaField | undefined = useSelector((state: RootState) => state.SupportRoomSlice.selectedOa);
    const [chatRoomRoleSchemas, setChatRoomRoleSchemas] = useState<ChatRoomRoleSchema[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const limit = 30;
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [getChatRoomsMongo] = useLazyGetChatRoomsMongoQuery();

    useEffect(() => {
        if (!selectedOa || !account) return;
        dispatch(set_isLoading(true));
        getChatRoomsMongo({
            limit: limit,
            cursor: null,
            authorizedAccountId: account.id,
            zaloOaId: selectedOa.id,
        })
            .then((res) => {
                const resData = res.data;
                if (resData?.isSuccess && resData.data) {
                    setChatRoomRoleSchemas(resData.data.items);
                    setCursor(resData.data.cursor);
                    setHasMore(resData.data.items.length === limit);
                }
            })
            .catch((err) => {
                console.error(err);
                dispatch(
                    setData_toastMessage({
                        type: messageType_enum.ERROR,
                        message: 'Lấy danh sách phòng chat KHÔNG thành công !',
                    })
                );
            })
            .finally(() => {
                dispatch(set_isLoading(false));
            });
    }, [dispatch, getChatRoomsMongo, selectedOa, account]);

    const handleSeeMore = () => {
        if (!selectedOa || !account) return;
        if (!hasMore) return;
        dispatch(set_isLoading(true));
        getChatRoomsMongo({
            limit: 30,
            cursor: cursor,
            authorizedAccountId: account.id,
            zaloOaId: selectedOa.id,
        })
            .then((res) => {
                const resData = res.data;
                if (resData?.isSuccess && resData.data) {
                    setChatRoomRoleSchemas((prev) => [...prev, ...(resData.data?.items || [])]);
                    setCursor(resData.data.cursor);
                    setHasMore(resData.data.cursor !== cursor);
                    setHasMore(resData.data.items.length === limit);
                }
            })
            .catch((err) => {
                console.error(err);
                dispatch(
                    setData_toastMessage({
                        type: messageType_enum.ERROR,
                        message: 'Lấy danh sách phòng chat KHÔNG thành công !',
                    })
                );
            })
            .finally(() => {
                dispatch(set_isLoading(false));
            });
    };

    const list_chatRoomRole = chatRoomRoleSchemas.map((item) => {
        return <ARoom key={item.chat_room_id} chatRoomRoleSchema={item} />;
    });

    return (
        <div className={style.parent}>
            {list_chatRoomRole}
            <div className={style.seeMore}>{hasMore && <div onClick={() => handleSeeMore()}>{SEE_MORE}</div>}</div>
        </div>
    );
};

export default memo(RoomList);
