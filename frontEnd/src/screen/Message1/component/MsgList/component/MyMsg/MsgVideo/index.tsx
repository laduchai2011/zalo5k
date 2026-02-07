import { FC, memo } from 'react';
import style from './style.module.scss';
import { HookDataField } from '@src/dataStruct/zalo/hookData';
import LazyVideo from '@src/component/LazyVideo';

const MsgVideo: FC<{ msgList_element?: HTMLDivElement | null; hookData?: HookDataField }> = ({ msgList_element }) => {
    return (
        <div className={style.parent}>
            <LazyVideo
                className={style.video}
                src={'https://f141-zvc.dlmd.me/9b07c0f8bbbf57e10eae/7625487327728053874'}
                root={msgList_element}
            />
        </div>
    );
};

export default memo(MsgVideo);
