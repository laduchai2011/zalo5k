import { FC, memo } from 'react';
import style from './style.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@src/redux';
import { NoteField } from '@src/dataStruct/note';
import { set_editNoteDialog } from '@src/redux/slice/Note';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';

const OneNote: FC<{ index: number; data: NoteField }> = ({ index, data }) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleOpenEdit = () => {
        dispatch(set_editNoteDialog({ isShow: true, note: data }));
    };

    return (
        <div className={style.parent}>
            <div className={style.index}>
                <div>{index}</div>
                <div>
                    <CiEdit onClick={() => handleOpenEdit()} size={22} color="green" />
                    <MdDelete size={22} color="red" />
                </div>
            </div>
            <div>
                <div dangerouslySetInnerHTML={{ __html: data.note }} />
            </div>
        </div>
    );
};

export default memo(OneNote);
