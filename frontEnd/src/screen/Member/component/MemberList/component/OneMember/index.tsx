import style from './style.module.scss';
import { avatarnull } from '@src/utility/string';

const OneMember = () => {
    return (
        <div className={style.parent}>
            <img src={avatarnull} alt="avatar" />
            <div>name</div>
        </div>
    );
};

export default OneMember;
