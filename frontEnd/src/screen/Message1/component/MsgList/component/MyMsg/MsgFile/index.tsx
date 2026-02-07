import { FC, memo } from 'react';
import { HookDataField } from '@src/dataStruct/zalo/hookData';

const MsgFile: FC<{ hookData?: HookDataField }> = () => {
    return <div>MsgFile</div>;
};

export default memo(MsgFile);
