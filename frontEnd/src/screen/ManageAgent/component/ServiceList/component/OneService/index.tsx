import { FC, memo, useState, useEffect } from 'react';
import style from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@src/redux';
import { BASIC, UPGRADE, DELETE } from '@src/const/text';
import { avatarnull } from '@src/utility/string';
import { IoIosMore, IoMdAdd } from 'react-icons/io';
import { AccountField } from '@src/dataStruct/account';
import { AgentField } from '@src/dataStruct/agent';
import { setIsShow_memberListDialog, set_agent_memberListDialog } from '@src/redux/slice/ManageAgent';
import { useLazyGetAccountWithIdQuery } from '@src/redux/query/accountRTK';
import { set_isLoading, setData_toastMessage } from '@src/redux/slice/ManageAgent';
import { messageType_enum } from '@src/component/ToastMessage/type';

const OneService: FC<{ index: number; data: AgentField }> = ({ index, data }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [account, setAccount] = useState<AccountField | undefined>(undefined);
    const iShow_MemberListDialog: boolean = useSelector(
        (state: RootState) => state.ManageAgentSlice.memberListDialog.isShow
    );
    const agent_MemberListDialog: AgentField | undefined = useSelector(
        (state: RootState) => state.ManageAgentSlice.memberListDialog.agent
    );

    const [getAccountWithId] = useLazyGetAccountWithIdQuery();

    useEffect(() => {
        if (iShow_MemberListDialog) return;
        if (!agent_MemberListDialog) return;

        if (data.id === agent_MemberListDialog.id) {
            if (!agent_MemberListDialog.agentAccountId) return;
            getAccountWithId({ id: agent_MemberListDialog.agentAccountId })
                .then((res) => {
                    const resData = res.data;
                    if (resData?.isSuccess && resData.data) {
                        setAccount(resData.data);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    dispatch(
                        setData_toastMessage({
                            type: messageType_enum.ERROR,
                            message: 'Đã có lỗi xảy ra !',
                        })
                    );
                })
                .finally(() => dispatch(set_isLoading(false)));
        }
    }, [iShow_MemberListDialog, agent_MemberListDialog, getAccountWithId, dispatch, data]);

    useEffect(() => {
        if (!data?.agentAccountId) return;
        getAccountWithId({ id: data.agentAccountId })
            .then((res) => {
                const resData = res.data;
                if (resData?.isSuccess && resData.data) {
                    setAccount(resData.data);
                }
            })
            .catch((err) => {
                console.error(err);
                dispatch(
                    setData_toastMessage({
                        type: messageType_enum.ERROR,
                        message: 'Đã có lỗi xảy ra !',
                    })
                );
            })
            .finally(() => dispatch(set_isLoading(false)));
    }, [dispatch, data, getAccountWithId]);

    const handleAddAgent = () => {
        dispatch(setIsShow_memberListDialog(true));
        dispatch(set_agent_memberListDialog(data));
    };

    const handleDelAgent = () => {};

    return (
        <div className={style.parent}>
            <div className={style.header}>
                <div>{index + 1}</div>
                <div>
                    <div>{BASIC}</div>
                    <div>{UPGRADE}</div>
                    <IoIosMore size={25} />
                </div>
            </div>
            <div className={style.content}>
                <div>Bạn đang dùng gói cơ bản, giới hạn 30 tin nhắn trong ngày</div>
            </div>
            {account && (
                <div className={style.infor}>
                    <div>
                        <img src={account.avatar ? account.avatar : avatarnull} alt="avatar" />
                        <div>{`${account.firstName} ${account.lastName}`}</div>
                    </div>
                    <div>
                        <button onClick={() => handleDelAgent()}>{DELETE}</button>
                    </div>
                </div>
            )}
            {!account && (
                <div className={style.add}>
                    <IoMdAdd onClick={() => handleAddAgent()} size={30} />
                </div>
            )}
            <div className={style.btn}>
                <div>Hủy dịch vụ</div>
            </div>
        </div>
    );
};

export default memo(OneService);
