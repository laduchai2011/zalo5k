import style from './style.module.scss';
import { MEMBER } from '@src/const/text';
import MyToastMessage from './component/MyToastMessage';
import MyLoading from './component/MyLoading';
import AddMember from './component/AddMember';
import MemberList from './component/MemberList';

const Member = () => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{MEMBER}</div>
                <AddMember />
                <MemberList />
            </div>
            <div>
                <MyToastMessage />
                <MyLoading />
            </div>
        </div>
    );
};

export default Member;
