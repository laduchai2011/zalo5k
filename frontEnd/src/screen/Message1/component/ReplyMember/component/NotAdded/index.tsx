import { memo } from 'react';
import style from './style.module.scss';

const NotAdded = () => {
    return (
        <div className={style.parent}>
            <div>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNzSvQMx07eqW79xIar2vd4x_1NUKPZ7kKUw&s"
                    alt=""
                />
                <div>name</div>
            </div>
            <div>
                <button>Thêm</button>
            </div>
        </div>
    );
};

export default memo(NotAdded);
