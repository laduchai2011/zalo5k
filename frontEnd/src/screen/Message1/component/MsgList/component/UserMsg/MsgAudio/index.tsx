import { FC, memo } from 'react';
import style from './style.module.scss';
import { MessageAudioField } from '@src/dataStruct/zalo/hookData';
import { MessageV1Field } from '@src/dataStruct/message_v1';

const MsgAudio: FC<{ data?: MessageV1Field<MessageAudioField> }> = () => {
    return (
        <div className={style.parent}>
            <audio controls src="https://f2-voice-aac-dl.zdn.vn/7161588375936326558/2e67445195e474ba2df5.aac" />
        </div>
    );
};

export default memo(MsgAudio);
