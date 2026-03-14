import style from './style.module.scss';
import { NOTE } from '@src/const/text';
import MyLoading from './component/MyLoading';
import MyToastMessage from './component/MyToastMessage';
import Header from '@src/screen/Header';
import OaList from './component/OaList';
import NoteList from './component/NoteList';
import { select_enum } from '@src/router/type';

const Note = () => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{NOTE}</div>
                <OaList />
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
