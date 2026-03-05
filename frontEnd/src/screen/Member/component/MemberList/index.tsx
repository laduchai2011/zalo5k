import style from './style.module.scss';
import Filter from './component/Filter';
import OneMember from './component/OneMember';

const MemberList = () => {
    const list_member = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item, index) => {
        return <OneMember key={index} />;
    });

    return (
        <div className={style.parent}>
            <Filter />
            <div>{list_member}</div>
        </div>
    );
};

export default MemberList;
