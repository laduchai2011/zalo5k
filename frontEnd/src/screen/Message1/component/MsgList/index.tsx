import { memo, useRef } from 'react';
import style from './style.module.scss';
import UserMsg from './component/UserMsg';

const MsgList = () => {
    const parent_element = useRef<HTMLDivElement | null>(null);

    return (
        <div className={style.parent} ref={parent_element}>
            <UserMsg msgList_element={parent_element.current} />
        </div>
    );
};

export default memo(MsgList);
