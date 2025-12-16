import { memo } from 'react';
import style from './style.module.scss';

const NoteContent = () => {
    return (
        <div className={style.parent}>
            <div>
                <span>1</span>
            </div>
            <div>
                note note note note note note note note note note note note note note note note note note note note note
                notenote note note note note note
            </div>
        </div>
    );
};

export default memo(NoteContent);
