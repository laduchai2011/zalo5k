import { FC, memo } from 'react';
import style from './style.module.scss';
import { MessageV1Field } from '@src/dataStruct/message_v1';
import { MessageTextField } from '@src/dataStruct/zalo/hookData';
import { parseTextToParts } from '@src/utility/string';

const MsgText: FC<{ data?: MessageV1Field<MessageTextField> }> = ({ data }) => {
    const text = data?.message.text;
    const parts = parseTextToParts(text || '');

    return (
        <pre className={style.parent}>
            {parts.map((p, i) => {
                if (p.type === 'text') return <div key={i}>{p.value}</div>;

                return (
                    <a
                        key={i}
                        href={p.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        {p.value}
                    </a>
                );
            })}
        </pre>
    );
};

export default memo(MsgText);
