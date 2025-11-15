import { memo } from 'react';
import style from './style.module.scss';
import avatarnull from '@src/asset/avatar/avatarnull.png';
import { useNavigate } from 'react-router-dom';
import { route_enum } from '@src/router/type';

const MessageBox = () => {
    const navigate = useNavigate();

    const handleGoToMessage = () => {
        navigate(route_enum.MESSAGE);
    };

    return (
        <div className={style.parent} onClick={() => handleGoToMessage()}>
            <div className={style.avatarContainer}>
                <img src={avatarnull} alt="avatar" />
            </div>
            <div className={style.contentContainer}>
                <div className={style.nameContainer}>
                    <div>
                        <div className={style.name}>name name name name name name name name name name name</div>
                        <div className={style.time}>time</div>
                    </div>
                </div>
                <div className={style.messageContainer}>
                    <div>
                        <div className={style.message}>
                            Message Message Message Message Message Message Message Message
                        </div>
                        <div className={style.newAmount}>3</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(MessageBox);
