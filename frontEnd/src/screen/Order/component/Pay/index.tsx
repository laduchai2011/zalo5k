import { memo, useEffect, useRef, useState } from 'react';
import style from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@src/redux';
import { IoMdClose } from 'react-icons/io';
import { CLOSE } from '@src/const/text';
import { setIsShow_payDialog, setOrder_payDialog } from '@src/redux/slice/Order';
import { OrderField } from '@src/dataStruct/order';
import { formatMoney } from '@src/utility/string';

const Pay = () => {
    const dispatch = useDispatch<AppDispatch>();
    const parent_element = useRef<HTMLDivElement | null>(null);
    const isShow: boolean = useSelector((state: RootState) => state.OrderSlice.payDialog.isShow);
    const order: OrderField | undefined = useSelector((state: RootState) => state.OrderSlice.payDialog.order);
    const [qrCode, setQrCode] = useState<string>('');

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

    useEffect(() => {
        if (!order) return;
        const des = `ztksPayjorderPayj${order.id}`;
        setQrCode(`https://qr.sepay.vn/img?acc=VQRQAHJHB9302&bank=MBBank&amount=${order.money}&des=${des}`);
    }, [order]);

    const handleClose = () => {
        dispatch(setIsShow_payDialog(false));
        dispatch(setOrder_payDialog(undefined));
    };

    return (
        <div className={style.parent} ref={parent_element}>
            <div className={style.main}>
                <div className={style.closeContainer}>
                    <IoMdClose onClick={() => handleClose()} size={25} title={CLOSE} />
                </div>
                <div className={style.contentContainer}>
                    {order?.isPay && <div>Đơn hàng đã thanh toán</div>}
                    {!order?.isPay && <div>Vui lòng quét mã QR để thanh toán</div>}
                    {!order?.isPay && <div>{qrCode.length > 0 && <img src={qrCode} alt="qrCode" />}</div>}
                    {order && <div className={style.money}>{formatMoney(order.money)}</div>}
                </div>
            </div>
        </div>
    );
};

export default memo(Pay);
