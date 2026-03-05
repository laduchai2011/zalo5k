import style from './style.module.scss';
import { ADD } from '@src/const/text';

const AddMember = () => {
    return (
        <div className={style.parent}>
            <input placeholder="Nhập id người dùng !" />
            <div>{ADD}</div>
        </div>
    );
};

export default AddMember;
