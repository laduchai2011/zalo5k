import style from './style.module.scss';
import { MEMBER_RECEIVE_MESSAGE } from '@src/const/text';
import avatarnull from '@src/asset/avatar/avatarnull.png';

const MemberReceiveMessage = () => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{MEMBER_RECEIVE_MESSAGE}</div>
                <div className={style.row}>
                    <div className={style.selected}>
                        <img className={style.avatar} src={avatarnull} alt="avatar" />
                        <div className={style.name}>Nguyen Van A</div>
                    </div>
                    <div className={style.list}>
                        <div>sdfsdf</div>
                        <div>sdfsdf</div>
                        <div>sdfsdf</div>
                        <div>sdfsdf</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberReceiveMessage;
