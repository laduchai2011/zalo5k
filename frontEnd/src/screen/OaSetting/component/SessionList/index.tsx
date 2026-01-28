import { memo } from 'react';
import style from './style.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@src/redux';
import { SESSION_LIST } from '@src/const/text';
import { MdDelete } from 'react-icons/md';
import { setIsShow_delDialog } from '@src/redux/slice/OaSetting';

const SessionList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleDel = () => {
        dispatch(setIsShow_delDialog(true));
    };

    const list = [1, 2, 3, 4].map((item, index) => (
        <div key={index}>
            <div>{item}</div>
            <div>
                <MdDelete onClick={() => handleDel()} size={20} color="red" />
            </div>
        </div>
    ));

    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{SESSION_LIST}</div>
                <div className={style.list}>{list}</div>
            </div>
        </div>
    );
};

export default memo(SessionList);
