import { useState, useEffect } from 'react';
import style from './style.module.scss';
import { MEMBER_RECEIVE_MESSAGE } from '@src/const/text';
import avatarnull from '@src/asset/avatar/avatarnull.png';
import { AccountField } from '@src/dataStruct/account';
import { useGetAllMembersQuery, useSetMemberReceiveMessageMutation } from '@src/redux/query/accountRTK';

const MemberReceiveMessage = () => {
    const [allMembers, setAllMembers] = useState<AccountField[]>([]);
    const [selectedMember, setSelectedMember] = useState<AccountField | null>(null);

    const [setMemberReceiveMessage] = useSetMemberReceiveMessageMutation();

    const {
        data: data_allMembers,
        // isFetching,
        isLoading: isLoading_allMembers,
        isError: isError_allMembers,
        error: error_allMembers,
    } = useGetAllMembersQuery({ addedById: -1 });
    useEffect(() => {
        if (isError_allMembers && error_allMembers) {
            console.error(error_allMembers);
            // dispatch(
            //     setData_toastMessage({
            //         type: messageType_enum.SUCCESS,
            //         message: 'Lấy dữ liệu KHÔNG thành công !',
            //     })
            // );
        }
    }, [isError_allMembers, error_allMembers]);
    useEffect(() => {
        // setIsLoading(isLoading_medication);
    }, [isLoading_allMembers]);
    useEffect(() => {
        const resData = data_allMembers;

        if (resData?.isSuccess && resData?.data) {
            setAllMembers(resData.data);
        }
    }, [data_allMembers]);

    const handleSelectMemberReceiveMessage = (member: AccountField) => {
        setMemberReceiveMessage(member)
            .then((res) => {
                const resData = res.data;
                console.log(11111, resData);
                if (resData?.isSuccess && resData?.data) {
                    setSelectedMember(resData.data);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const list_members = allMembers.map((member, index) => (
        <div key={index} onClick={() => handleSelectMemberReceiveMessage(member)}>
            {member.userName} - {member.firstName} {member.lastName} - {member.phone}
        </div>
    ));

    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{MEMBER_RECEIVE_MESSAGE}</div>
                <div className={style.row}>
                    {selectedMember === null ? (
                        <div className={style.selected}>Chưa xác định</div>
                    ) : (
                        <div className={style.selected}>
                            <img className={style.avatar} src={avatarnull} alt="avatar" />
                            <div className={style.name}>
                                {selectedMember?.firstName + ' ' + selectedMember?.lastName}
                            </div>
                        </div>
                    )}
                    <div className={style.list}>{list_members}</div>
                </div>
            </div>
        </div>
    );
};

export default MemberReceiveMessage;
