import { useEffect } from 'react';
import style from './style.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@src/redux';
import { NOTE } from '@src/const/text';
import MyLoading from './component/MyLoading';
import MyToastMessage from './component/MyToastMessage';
import Header from '@src/screen/Header';
import CreateNote from './component/CreateNote';
import OaList from './component/OaList';
import NoteList from './component/NoteList';
import { select_enum } from '@src/router/type';
import { setData_toastMessage, clear_newNotes } from '@src/redux/slice/Note';

const Note = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        return () => {
            dispatch(setData_toastMessage({ type: undefined, message: '' }));
            dispatch(clear_newNotes());
        };
    }, [dispatch]);

    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{NOTE}</div>
                <OaList />
                <CreateNote />
                <NoteList />
                <div className={style.headerTab}>
                    <Header selected={select_enum.NOTE} />
                </div>
            </div>
            <div>
                <MyToastMessage />
                <MyLoading />
                {/* <EditOrder /> */}
            </div>
        </div>
    );
};

export default Note;
