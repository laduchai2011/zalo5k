import { FC } from 'react';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { route_enum } from '@src/router/type';

const User: FC<{ index: number }> = ({ index }) => {
    const navigate = useNavigate();

    const handleGotoMessage1 = () => {
        navigate(route_enum.MESSAGE1 + '/' + `${1}`);
    };

    return (
        <div className={style.parent} onClick={() => handleGotoMessage1()}>
            <div className={style.avatarContainer}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNzSvQMx07eqW79xIar2vd4x_1NUKPZ7kKUw&s"
                    alt="avatar"
                />
            </div>
            <div className={style.inforContainer}>
                <div className={style.infor}>
                    <div className={style.name}>
                        name name name name name name name name name name name name name name
                    </div>
                    <div className={style.note}>Chưa có ghi chú nào</div>
                </div>
                <div className={style.time}>5 giờ</div>
            </div>
            <div></div>
        </div>
    );
};

export default User;
