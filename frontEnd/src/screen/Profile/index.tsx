import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { PROFILE, ADMIN, MEMBER, MEMBER_RECEIVE_MESSAGE, MANAGE_MEMBERS, SIGNOUT } from '@src/const/text';
import Header from '../Header';
import { select_enum, route_enum } from '@src/router/type';
import avatarnull from '@src/asset/avatar/avatarnull.png';

const Profile = () => {
    const navigate = useNavigate();

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
                        <div className={style.name}>Nguyen Van A</div>
                        <div className={style.admin}>{ADMIN}</div>
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
