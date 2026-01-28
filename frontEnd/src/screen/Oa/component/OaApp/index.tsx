import { memo, useState } from 'react';
import style from './style.module.scss';
import { FaRegEye, FaEyeSlash } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';

const OaApp = () => {
    const [isShow_id, setIsShow_id] = useState(false);
    const [isShow_secret, setIsShow_secret] = useState(false);

    const handleShow_id = (isShow: boolean) => {
        setIsShow_id(isShow);
    };

    const handleShow_secret = (isShow: boolean) => {
        setIsShow_secret(isShow);
    };

    return (
        <div className={style.parent}>
            <div>
                <div className={style.label}>label</div>
                <div>
                    <div>
                        <div>Tên ứng dụng</div>
                        <div>Tên ứng dụng</div>
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <div>Định danh ứng dụng</div>
                            <div>
                                {isShow_id && <FaRegEye onClick={() => handleShow_id(false)} />}
                                {!isShow_id && <FaEyeSlash onClick={() => handleShow_id(true)} />}
                            </div>
                        </div>
                        <div>
                            {isShow_id && <div>Định danh ứng dụng</div>}
                            {!isShow_id && (
                                <div>
                                    <GoDotFill /> <GoDotFill /> <GoDotFill /> <GoDotFill /> <GoDotFill />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <div>Khóa ứng dụng</div>
                            <div>
                                {isShow_secret && <FaRegEye onClick={() => handleShow_secret(false)} />}
                                {!isShow_secret && <FaEyeSlash onClick={() => handleShow_secret(true)} />}
                            </div>
                        </div>
                        <div>
                            {isShow_secret && <div>Khóa ứng dụng</div>}
                            {!isShow_secret && (
                                <div>
                                    <GoDotFill /> <GoDotFill /> <GoDotFill /> <GoDotFill /> <GoDotFill />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={style.warn}>Thông tin không được để lộ</div>
            </div>
        </div>
    );
};

export default memo(OaApp);
