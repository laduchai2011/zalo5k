import style from './style.module.scss';
import MemberBox from './components/MemberBox';
import { MEMBERS } from '@src/const/text';
import Header from '../Header';
import { select_enum } from '@src/router/type';

const Members = () => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{MEMBERS}</div>
                <div className={style.list}>
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                    <MemberBox />
                </div>
                <div className={style.headerTab}>
                    <Header selected={select_enum.MEMBERS} />
                </div>
            </div>
        </div>
    );
};

export default Members;
