import { FC, memo, useState } from 'react';
import style from './style.module.scss';
import { IoIosMore } from 'react-icons/io';
import MsgText from './MsgText';
import MsgImage from './MsgImage';
import MsgVideo from './MsgVideo';
import MsgSticker from './MsgSticker';

const UserMsg: FC<{ msgList_element?: HTMLDivElement | null }> = ({ msgList_element }) => {
    const [isMore, setIsMore] = useState<boolean>(false);

    const handleShowMore = () => {
        setIsMore(!isMore);
    };

    return (
        <div className={style.parent}>
            <div className={style.avatarContainer}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNzSvQMx07eqW79xIar2vd4x_1NUKPZ7kKUw&s"
                    alt="avatar"
                />
            </div>
            <div className={style.msgContainer}>
                <div className={style.name}>Name</div>
                <div>
                    <MsgVideo msgList_element={msgList_element} />
                </div>
                <div className={style.moreInfor}>time</div>
            </div>
            <div className={style.iconContainer}>
                <IoIosMore onClick={() => handleShowMore()} size={25} />
                {isMore && (
                    <div className={style.moreContainer}>
                        <div>Trả lời</div>
                        <div>Chia sẻ</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(UserMsg);
