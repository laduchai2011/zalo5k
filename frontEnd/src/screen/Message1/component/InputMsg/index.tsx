import { memo, useRef } from 'react';
import style from './style.module.scss';
import { IoSend } from 'react-icons/io5';
import { CiImageOn } from 'react-icons/ci';
import { MdOutlineOndemandVideo, MdAttachFile } from 'react-icons/md';
import { PiSmileyStickerLight } from 'react-icons/pi';

const InputMsg = () => {
    const textarea_element = useRef<HTMLTextAreaElement | null>(null);

    const handleInput = () => {
        const el = textarea_element.current;
        if (!el) return;

        el.style.height = 'auto'; // reset
        el.style.height = el.scrollHeight + 'px'; // grow theo nội dung
    };

    return (
        <div className={style.parent}>
            <div className={style.icons}>
                <CiImageOn size={20} />
                <MdOutlineOndemandVideo size={20} />
                <MdAttachFile size={20} />
                <PiSmileyStickerLight size={20} />
            </div>
            <div className={style.textInput}>
                <div>
                    <textarea ref={textarea_element} rows={2} placeholder="Nhắn gì đó !" onInput={handleInput} />
                </div>
                <div>
                    <IoSend size={25} />
                </div>
            </div>
        </div>
    );
};

export default memo(InputMsg);
