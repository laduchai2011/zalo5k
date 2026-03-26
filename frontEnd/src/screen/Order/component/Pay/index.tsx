import { memo, useEffect, useRef, useState } from 'react';
import style from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@src/redux';
import { IoMdClose } from 'react-icons/io';
import { CLOSE } from '@src/const/text';
import {
    setData_toastMessage,
    setIsShow_payDialog,
    setOrder_payDialog,
    setNewOrder_payDialog,
} from '@src/redux/slice/Order';
import { messageType_enum } from '@src/component/ToastMessage/type';
import { OrderField } from '@src/dataStruct/order';
import { formatMoney } from '@src/utility/string';
import { useLazyGetOrderWithIdQuery } from '@src/redux/query/orderRTK';
import { getSocket } from '@src/socketIo';

const Pay = () => {
    const dispatch = useDispatch<AppDispatch>();
    const parent_element = useRef<HTMLDivElement | null>(null);
    const isShow: boolean = useSelector((state: RootState) => state.OrderSlice.payDialog.isShow);
    const order: OrderField | undefined = useSelector((state: RootState) => state.OrderSlice.payDialog.order);
    const newOrder: OrderField | undefined = useSelector((state: RootState) => state.OrderSlice.payDialog.newOrder);
    const [qrCode, setQrCode] = useState<string>('');
    const [order1, setOrder1] = useState<OrderField | undefined>(undefined);

    const [getOrderWithId] = useLazyGetOrderWithIdQuery();

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
        if (newOrder) {
            setOrder1(newOrder);
        } else if (order) {
            setOrder1(order);
        }

        return () => {
            dispatch(setOrder_payDialog(undefined));
            dispatch(setNewOrder_payDialog(undefined));
        };
    }, [dispatch, order, newOrder]);

    useEffect(() => {
        // if (!order) return;

        const socket = getSocket();

        // const onSocketOrderPay = (orderS: OrderField) => {
        //     const orderId = orderS.id;
        //     console.log(orderS);

        //     if (order.id === orderId) {
        //         getOrderWithId({ id: orderId })
        //             .then((res) => {
        //                 const resData = res.data;
        //                 if (resData?.isSuccess && resData.data) {
        //                     const orderUpdated = resData.data;
        //                     console.log(orderUpdated);
        //                     dispatch(setNewOrder_payDialog(orderUpdated));
        //                     dispatch(setIsShow_payDialog(false));
        //                 } else {
        //                     dispatch(
        //                         setData_toastMessage({
        //                             type: messageType_enum.ERROR,
        //                             message: 'Thanh toán không thành công !',
        //                         })
        //                     );
        //                 }
        //             })
        //             .catch((err) => {
        //                 console.error(err);
        //             });
        //     }
        // };

        const onSocketOrderPay = (orderS: OrderField) => {
            setOrder1((prev) => {
                if (!prev) return prev;

                if (prev.id === orderS.id) {
                    getOrderWithId({ id: orderS.id })
                        .then((res) => {
                            const resData = res.data;

                            if (resData?.isSuccess && resData.data) {
                                dispatch(setNewOrder_payDialog(resData.data));
                                dispatch(setIsShow_payDialog(false));
                            } else {
                                dispatch(
                                    setData_toastMessage({
                                        type: messageType_enum.ERROR,
                                        message: 'Thanh toán không thành công !',
                                    })
                                );
                            }
                        })
                        .catch(console.error);
                }

                return prev;
            });
        };

        socket.on('orderPay', onSocketOrderPay);

        return () => {
            socket.off('orderPay', onSocketOrderPay);
        };
    }, [dispatch, getOrderWithId]);

    useEffect(() => {
        if (!order1) return;
        const des = `ztksPayjorderPayj${order1.id}`;
        setQrCode(`https://qr.sepay.vn/img?acc=VQRQAHJHB9302&bank=MBBank&amount=${order1.money}&des=${des}`);
    }, [order1]);

    const handleClose = () => {
        dispatch(setIsShow_payDialog(false));
    };

    return (
        <div className={style.parent} ref={parent_element}>
            <div className={style.main}>
                <div className={style.closeContainer}>
                    <IoMdClose onClick={() => handleClose()} size={25} title={CLOSE} />
                </div>
                <div className={style.contentContainer}>
                    {order1?.isPay && <div>Đơn hàng đã thanh toán</div>}
                    {!order1?.isPay && <div>Vui lòng quét mã QR để thanh toán</div>}
                    {!order1?.isPay && <div>{qrCode.length > 0 && <img src={qrCode} alt="qrCode" />}</div>}
                    {order1 && !order1?.isPay && <div className={style.money}>{formatMoney(order1.money)}</div>}
                </div>
            </div>
        </div>
    );
};

export default memo(Pay);
