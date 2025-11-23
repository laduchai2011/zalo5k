import { useRef } from 'react';
import style from './style.module.scss';
import { MEMBER_RECEIVE_MESSAGE, ADD_MEMBER, ADD } from '@src/const/text';

const ManageMembers = () => {
    const inputContainer_element = useRef<HTMLDivElement>(null);

    const showInputContainer = () => {
        if (inputContainer_element.current) {
            inputContainer_element.current.classList.toggle(style.show);
        }
    };

    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{MEMBER_RECEIVE_MESSAGE}</div>
                <div className={style.row}>
                    <div className={style.btnContainer} onClick={() => showInputContainer()}>
                        <button>{ADD_MEMBER}</button>
                    </div>
                    <div className={style.inputContainer} ref={inputContainer_element}>
                        <input type="text" placeholder="Tên đăng nhập" />
                        <input type="text" placeholder="Mật khẩu" />
                        <input type="text" placeholder="Tên đầu" />
                        <input type="text" placeholder="Tên cuối" />
                        <button className={style.btnAdd}>{ADD}</button>
                    </div>
                    <div className={style.list}>
                        <div>sdfsdf</div>
                        <div>sdfsdf</div>
                        <div>sdfsdf</div>
                        <div>sdfsdf</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageMembers;
