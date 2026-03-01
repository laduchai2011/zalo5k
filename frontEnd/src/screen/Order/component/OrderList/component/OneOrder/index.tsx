import { memo, FC, useState, useRef, useEffect } from 'react';
import style from './style.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@src/redux';
import { PHONE_NUMBER, CONTENT, TITLE, PAY, CHAT } from '@src/const/text';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { setIsShow_editOrderDialog, setIsShow_payDialog } from '@src/redux/slice/Order';

const OneOrder: FC<{ index: number }> = ({ index }) => {
    const dispatch = useDispatch<AppDispatch>();
    const payText_element = useRef<HTMLDivElement | null>(null);
    const isPay = false;
    const [payText, setPayText] = useState<string>('Chưa thanh toán');

    useEffect(() => {
        if (!payText_element.current) return;
        const payTextElement = payText_element.current;

        if (isPay) {
            setPayText('Đã thanh toán');
            payTextElement.classList.add(style.paid);
        } else {
            setPayText('Chưa thanh toán');
            payTextElement.classList.remove(style.paid);
        }
    }, [isPay]);

    const handleOpenEdit = () => {
        dispatch(setIsShow_editOrderDialog(true));
    };

    const handleOpenPay = () => {
        dispatch(setIsShow_payDialog(true));
    };

    return (
        <div className={style.parent}>
            <div className={style.index}>
                <div>{index}</div>
                <div>uuid</div>
                <div>
                    <CiEdit onClick={() => handleOpenEdit()} size={22} color="green" />
                    <MdDelete size={22} color="red" />
                </div>
            </div>
            <div className={style.label}>
                <div>{TITLE}</div>
                <div>skdjfksdh kjsdhg skdjfksdh skdjfksdh skdjfksdh skdjfksdh skdjfksdh skdjfksdh</div>
            </div>
            <div className={style.content}>
                <div>{CONTENT}</div>
                <div>skdjfksdh kjsdhg skdjfksdh skdjfksdh skdjfksdh skdjfksdh skdjfksdh skdjfksdh</div>
            </div>
            <div className={style.phone}>
                <div>{PHONE_NUMBER}</div>
                <div>0329384723</div>
            </div>
            <div className={style.chat}>
                <div>{CHAT}</div>
                <div>id</div>
            </div>
            <div className={style.isPay}>
                <div>{PAY}</div>
                <div ref={payText_element}>{payText}</div>
                <div>{!isPay && <button onClick={() => handleOpenPay()}>{PAY}</button>}</div>
            </div>
        </div>
    );
};

export default memo(OneOrder);
