import { memo, useEffect, useRef } from 'react';
import style from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@src/redux';
import { IoMdClose } from 'react-icons/io';
import { CLOSE, AGREE, EXIT, PHONE_NUMBER, CONTENT, TITLE } from '@src/const/text';
import { setData_toastMessage, set_isLoading, setIsShow_editOrderDialog } from '@src/redux/slice/Order';
import { messageType_enum } from '@src/component/ToastMessage/type';
import TextEditor from '@src/component/TextEditor';

const EditOrder = () => {
    const dispatch = useDispatch<AppDispatch>();
    const parent_element = useRef<HTMLDivElement | null>(null);
    const isShow: boolean = useSelector((state: RootState) => state.OrderSlice.editOrderDialog.isShow);

    useEffect(() => {
        if (!parent_element.current) return;
        const parentElement = parent_element.current;

        if (isShow) {
            parentElement.classList.add(style.display);
            const timeout2 = setTimeout(() => {
                parentElement.classList.add(style.opacity);
                clearTimeout(timeout2);
            }, 50);
        } else {
            parentElement.classList.remove(style.opacity);

            const timeout2 = setTimeout(() => {
                parentElement.classList.remove(style.display);
                clearTimeout(timeout2);
            }, 550);
        }
    }, [isShow]);

    const handleClose = () => {
        dispatch(setIsShow_editOrderDialog(false));
    };

    const handleAgree = () => {
        dispatch(setIsShow_editOrderDialog(true));
        const timeout = setTimeout(() => {
            dispatch(set_isLoading(false));
            dispatch(setIsShow_editOrderDialog(false));
            dispatch(setData_toastMessage({ type: messageType_enum.SUCCESS, message: 'Chỉnh sửa thành công !' }));
            clearTimeout(timeout);
        }, 4000);
    };

    return (
        <div className={style.parent} ref={parent_element}>
            <div className={style.main}>
                <div className={style.closeContainer}>
                    <IoMdClose onClick={() => handleClose()} size={25} title={CLOSE} />
                </div>
                <div className={style.contentContainer}>
                    <div className={style.label}>
                        <div>{TITLE}</div>
                        <div>
                            <input />
                        </div>
                    </div>
                    <div className={style.content}>
                        <div>{CONTENT}</div>
                        <div>
                            <TextEditor />
                        </div>
                    </div>
                    <div className={style.phone}>
                        <div>{PHONE_NUMBER}</div>
                        <div>
                            <input />
                        </div>
                    </div>
                </div>
                <div className={style.buttonContainer}>
                    <button onClick={() => handleAgree()}>{AGREE}</button>
                    <button onClick={() => handleClose()}>{EXIT}</button>
                </div>
            </div>
        </div>
    );
};

export default memo(EditOrder);
