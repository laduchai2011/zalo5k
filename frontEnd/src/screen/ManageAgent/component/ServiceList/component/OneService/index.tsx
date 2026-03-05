import { memo, useState } from 'react';
import style from './style.module.scss';
import { BASIC, UPGRADE, DELETE } from '@src/const/text';
import { avatarnull } from '@src/utility/string';
import { IoIosMore, IoMdAdd } from 'react-icons/io';

const OneService = () => {
    const [agent, setAgent] = useState<number | undefined>(undefined);

    const handleAddAgent = () => {
        setAgent(1);
    };

    const handleDelAgent = () => {
        setAgent(undefined);
    };

    return (
        <div className={style.parent}>
            <div className={style.header}>
                <div>1</div>
                <div>
                    <div>{BASIC}</div>
                    <div>{UPGRADE}</div>
                    <IoIosMore size={25} />
                </div>
            </div>
            <div className={style.content}>
                <div>Bạn đang dùng gói cơ bản, giới hạn 30 tin nhắn trong ngày</div>
            </div>
            {agent && (
                <div className={style.infor}>
                    <div>
                        <img src={avatarnull} alt="avatar" />
                        <div>Name</div>
                    </div>
                    <div>
                        <button onClick={() => handleDelAgent()}>{DELETE}</button>
                    </div>
                </div>
            )}
            {!agent && (
                <div className={style.add}>
                    <IoMdAdd onClick={() => handleAddAgent()} size={30} />
                </div>
            )}
            <div className={style.btn}>
                <div>Hủy dịch vụ</div>
            </div>
        </div>
    );
};

export default memo(OneService);
