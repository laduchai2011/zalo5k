import { memo, FC, useState, useRef, useEffect } from 'react';
import style from './style.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@src/redux';
import { PHONE_NUMBER, CONTENT, TITLE, PAY, CHAT, FREEDOM, DEFAULT } from '@src/const/text';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { IoAddCircle } from 'react-icons/io5';
import { set_editOrderDialog, setIsShow_payDialog, set_addOrderStatusDialog } from '@src/redux/slice/Order';
import { OrderField } from '@src/dataStruct/order';
import { formatMoney } from '@src/utility/string';
import { timeAgoSmart } from '@src/utility/time';
import { orderStatus_enum, orderStatus_type } from '@src/screen/Order/type';

const OneOrder: FC<{ index: number; data: OrderField }> = ({ index, data }) => {
    const dispatch = useDispatch<AppDispatch>();
    const newOrder: OrderField | undefined = useSelector(
        (state: RootState) => state.OrderSlice.editOrderDialog.newOrder
    );
    const payText_element = useRef<HTMLDivElement | null>(null);
    const [order, setOrder] = useState<OrderField>(data);
    const [payText, setPayText] = useState<string>('Chưa thanh toán');

    useEffect(() => {
        if (!payText_element.current) return;
        const payTextElement = payText_element.current;
        if (order.isPay) {
            setPayText('Đã thanh toán');
            payTextElement.classList.add(style.paid);
        } else {
            setPayText('Chưa thanh toán');
            payTextElement.classList.remove(style.paid);
        }
    }, [order]);

    useEffect(() => {
        if (!newOrder) return;
        if (newOrder.id === order.id) {
            setOrder(newOrder);
        }
    }, [newOrder, order]);

    const handleOpenEdit = () => {
        dispatch(set_editOrderDialog({ isShow: true, order: order }));
    };

    const handleOpenPay = () => {
        dispatch(setIsShow_payDialog(true));
    };

    const handleOpenOrderStatus = (option: orderStatus_type) => {
        dispatch(set_addOrderStatusDialog({ isShow: true, order: order, defaultOption: option }));
    };

    return (
        <div className={style.parent}>
            <div className={style.index}>
                <div>{index}</div>
                <div>{order.uuid}</div>
                <div>
                    <CiEdit onClick={() => handleOpenEdit()} size={22} color="green" />
                    <MdDelete size={22} color="red" />
                </div>
            </div>
            <div className={style.label}>
                <div>{TITLE}</div>
                <div>{order.label}</div>
            </div>
            <div className={style.content}>
                <div>{CONTENT}</div>
                <div dangerouslySetInnerHTML={{ __html: order.content }} />
            </div>
            <div className={style.phone}>
                <div>{PHONE_NUMBER}</div>
                <div>{order.phone}</div>
            </div>
            <div className={style.chat}>
                <div>{CHAT}</div>
                <div>{order.chatRoomId}</div>
            </div>
            <div className={style.isPay}>
                <div>{PAY}</div>
                <div>{formatMoney(order.money)}</div>
                <div ref={payText_element}>{payText}</div>
                <div>{!order.isPay && <button onClick={() => handleOpenPay()}>{PAY}</button>}</div>
            </div>
            <div className={style.status}>
                <div>
                    <div>
                        <div>{FREEDOM}</div>
                        <IoAddCircle
                            onClick={() => handleOpenOrderStatus(orderStatus_enum.FREEDOM)}
                            size={20}
                            color="greenyellow"
                        />
                    </div>
                    <div>
                        <div>{DEFAULT}</div>
                        <IoAddCircle
                            onClick={() => handleOpenOrderStatus(orderStatus_enum.DEFAULT)}
                            size={20}
                            color="greenyellow"
                        />
                    </div>
                </div>
                <div>
                    <div>{FREEDOM}</div>
                    <div>{DEFAULT}</div>
                </div>
            </div>
            <div className={style.time}>{timeAgoSmart(data.createTime)}</div>
        </div>
    );
};

export default memo(OneOrder);
