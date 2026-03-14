import { FC, memo } from 'react';
import style from './style.module.scss';
import { GetNotesBodyField } from '@src/dataStruct/note/body';

const Filter: FC<{ handleGetNotes: (getNotesBody: GetNotesBodyField) => void }> = ({ handleGetNotes }) => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <input placeholder="Id phòng hội thoại" />
            </div>
        </div>
    );
};

export default memo(Filter);
