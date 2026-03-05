import style from './style.module.scss';
import { SEARCH } from '@src/const/text';

const Filter = () => {
    return (
        <div className={style.parent}>
            <div>
                <input placeholder="Nhập id người dùng !" />
            </div>
            <div>
                <div>{SEARCH}</div>
            </div>
        </div>
    );
};

export default Filter;
