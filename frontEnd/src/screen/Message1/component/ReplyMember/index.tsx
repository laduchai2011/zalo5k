import { memo, useState, useRef, useEffect } from 'react';
import style from './style.module.scss';
import { useParams } from 'react-router-dom';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import { IoAdd } from 'react-icons/io5';
import Added from './component/Added';
import NotAdded from './component/NotAdded';
import { AccountField } from '@src/dataStruct/account';
import { useGetReplyAccountsQuery } from '@src/redux/query/accountRTK';

const ReplyMember = () => {
    const { id } = useParams<{ id: string }>();
    const addedlList_element = useRef<HTMLDivElement | null>(null);
    const notAddedlList_element = useRef<HTMLDivElement | null>(null);
    const [isShowAdded, setIsShowAdded] = useState<boolean>(true);
    const [isShowNotAdded, setIsShowNotAdded] = useState<boolean>(false);
    const [replyAccounts, setReplyAccount] = useState<AccountField[]>([]);
    const [replyAccountTotal, setReplyAccountTotal] = useState<number>(-1);
    const [replyAccountIndex, setReplyAccountIndex] = useState<number>(1);
    const replyAccountSize = 5;

    useEffect(() => {
        if (!addedlList_element.current) return;
        const addedListElement = addedlList_element.current;

        if (isShowAdded) {
            addedListElement.classList.add(style.show);
        } else {
            addedListElement.classList.remove(style.show);
        }
    }, [isShowAdded]);

    useEffect(() => {
        if (!notAddedlList_element.current) return;
        const notAddedListElement = notAddedlList_element.current;

        if (isShowNotAdded) {
            notAddedListElement.classList.add(style.show);
        } else {
            notAddedListElement.classList.remove(style.show);
        }
    }, [isShowNotAdded]);

    const handleShowDown = () => {
        setIsShowAdded(true);
        setIsShowNotAdded(false);
    };

    const handleShowUp = () => {
        setIsShowAdded(false);
    };

    const handleShowNotAdded = () => {
        setIsShowAdded(false);
        setIsShowNotAdded(!isShowNotAdded);
    };

    const {
        data: data_replyAccount,
        // isFetching,
        isLoading: isLoading_replyAccount,
        isError: isError_replyAccount,
        error: error_replyAccount,
    } = useGetReplyAccountsQuery(
        { page: replyAccountIndex, size: replyAccountSize, chatRoomId: Number(id) },
        { skip: id === undefined }
    );
    useEffect(() => {
        if (isError_replyAccount && error_replyAccount) {
            console.error(error_replyAccount);
            // dispatch(
            //     setData_toastMessage({
            //         type: messageType_enum.ERROR,
            //         message: 'Lấy dữ liệu phòng hội thoại KHÔNG thành công !',
            //     })
            // );
        }
    }, [isError_replyAccount, error_replyAccount]);
    useEffect(() => {
        // dispatch(set_isLoading(isLoading_chatRoom));
    }, [isLoading_replyAccount]);
    useEffect(() => {
        const resData = data_replyAccount;
        if (resData?.isSuccess && resData.data) {
            setReplyAccount(resData.data.items);
            setReplyAccountTotal(resData.data.totalCount);
        }
    }, [data_replyAccount]);

    const handleSeeMore_replyAccount = () => {
        setReplyAccountIndex((pre) => pre + 1);
    };

    const list_replyAccount = replyAccounts.map((item, index) => {
        return <Added key={index} index={index} data={item} />;
    });

    return (
        <div className={style.parent}>
            <div className={style.header}>
                <div>Thành viên trả lời tin nhắn</div>
                <div>
                    <IoAdd onClick={() => handleShowNotAdded()} size={25} color="greenyellow" />
                    {!isShowAdded && <GoChevronDown onClick={() => handleShowDown()} size={25} />}
                    {isShowAdded && <GoChevronUp onClick={() => handleShowUp()} size={25} />}
                </div>
            </div>
            <div className={style.addedList} ref={addedlList_element}>
                {list_replyAccount}
                {replyAccounts.length < replyAccountTotal && (
                    <div className={style.addedMore} onClick={() => handleSeeMore_replyAccount()}>
                        Xem thêm
                    </div>
                )}
            </div>
            <div className={style.notAddedList} ref={notAddedlList_element}>
                <NotAdded />
                <NotAdded />
                <NotAdded />
                <NotAdded />
            </div>
        </div>
    );
};

export default memo(ReplyMember);
