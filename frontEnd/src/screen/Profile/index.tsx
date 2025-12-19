import { useState, useEffect } from 'react';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { PROFILE, ADMIN, MEMBER, MEMBER_RECEIVE_MESSAGE, MANAGE_MEMBERS, SIGNOUT } from '@src/const/text';
import Header from '../Header';
import { select_enum, route_enum } from '@src/router/type';
import avatarnull from '@src/asset/avatar/avatarnull.png';
import { AccountField, AccountInformationField, accountType_enum, accountType_type } from '@src/dataStruct/account';

const Profile = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState<AccountField | null>(null);
    const [accountInformation, setAccountInformation] = useState<AccountInformationField | null>(null);
    const [accountType, setAccountType] = useState<accountType_type>(accountType_enum.MEMBER);

    useEffect(() => {
        const accountStorage = sessionStorage.getItem('account');
        if (!accountStorage) return;
        setAccount(JSON.parse(accountStorage));
    }, []);
    useEffect(() => {
        const accountInformationStorage = sessionStorage.getItem('account');
        if (!accountInformationStorage) return;
        setAccountInformation(JSON.parse(accountInformationStorage));
    }, []);
    useEffect(() => {
        if (accountInformation?.accountType === accountType_enum.ADMIN) {
            setAccountType(accountType_enum.ADMIN);
        }
        if (accountInformation?.accountType === accountType_enum.MEMBER) {
            setAccountType(accountType_enum.MEMBER);
        }
    }, [accountInformation]);

    const goToMemberReceiveMessage = () => {
        navigate(route_enum.MEMBER_RECEIVE_MESSAGE);
    };

    const goToManageMembers = () => {
        navigate(route_enum.MANAGE_MEMBERS);
    };

    const goToSignout = () => {
        navigate(route_enum.SIGNOUT);
    };

    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{PROFILE}</div>
                <div className={style.list}>
                    <div className={style.infor}>
                        <img className={style.avatar} src={avatarnull} alt="avatar" />
                        <div className={style.name}>{`${account?.firstName} ${account?.lastName}`}</div>
                        <div className={style.admin}>{accountType}</div>
                    </div>
                    <div className={style.option} onClick={() => goToMemberReceiveMessage()}>
                        {MEMBER_RECEIVE_MESSAGE}
                    </div>
                    <div className={style.option} onClick={() => goToManageMembers()}>
                        {MANAGE_MEMBERS}
                    </div>
                    <div className={style.option} onClick={() => goToSignout()}>
                        {SIGNOUT}
                    </div>
                </div>
                <div className={style.headerTab}>
                    <Header selected={select_enum.PROFILE} />
                </div>
            </div>
        </div>
    );
};

export default Profile;
