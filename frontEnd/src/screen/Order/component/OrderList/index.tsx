import { memo, useEffect, useState } from 'react';
import style from './style.module.scss';
// import User from './component/User';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/redux';
// import { setData_toastMessage, set_isLoading } from '@src/redux/slice/Home1';
// import { messageType_enum } from '@src/component/ToastMessage/type';
import { AccountField } from '@src/dataStruct/account';
import { ZaloOaField } from '@src/dataStruct/zalo';
import { SEE_MORE } from '@src/const/text';

const UserList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const account: AccountField | undefined = useSelector((state: RootState) => state.AppSlice.account);
    const selectedOa: ZaloOaField | undefined = useSelector((state: RootState) => state.Home1Slice.selectedOa);

    const handleSeeMore = () => {};

    const list_chatRoomRole = [1, 2, 3, 4].map((item, index) => {
        return <div key={index}></div>;
    });

    return (
        <div className={style.parent}>
            {list_chatRoomRole}
            <div className={style.seeMore}>
                <div onClick={() => handleSeeMore()}>{SEE_MORE}</div>
            </div>
        </div>
    );
};

export default memo(UserList);
