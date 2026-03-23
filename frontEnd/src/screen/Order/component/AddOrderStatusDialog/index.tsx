import { memo, useEffect, useRef, useState } from 'react';
import style from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@src/redux';
import { IoMdClose } from 'react-icons/io';
import {
    CLOSE,
    AGREE,
    EXIT,
    ORDER_STATUS,
    DEFAULT,
    FREEDOM,
    NOT_PAY,
    PAID,
    NOT_SEND,
    SENT,
    RETURN,
} from '@src/const/text';
import {
    setData_toastMessage,
    set_isLoading,
    set_addOrderStatusDialog,
    setFinal_addOrderStatusDialog,
} from '@src/redux/slice/Order';
import { messageType_enum } from '@src/component/ToastMessage/type';
import { OrderField, OrderStatusField } from '@src/dataStruct/order';
import { CreateOrderStatusBodyField } from '@src/dataStruct/order/body';
import { orderStatus_type, orderStatus_enum, defaultSelections } from '../../type';

const AddOrderStatusDialog = () => {
    const dispatch = useDispatch<AppDispatch>();
    const parent_element = useRef<HTMLDivElement | null>(null);
    const options_element = useRef<HTMLDivElement | null>(null);
    const isShow: boolean = useSelector((state: RootState) => state.OrderSlice.addOrderStatusDialog.isShow);
    const order: OrderField | undefined = useSelector(
        (state: RootState) => state.OrderSlice.addOrderStatusDialog.order
    );
    const defaultOption: orderStatus_type | undefined = useSelector(
        (state: RootState) => state.OrderSlice.addOrderStatusDialog.defaultOption
    );

    const [selected, setSelected] = useState<orderStatus_type>(orderStatus_enum.FREEDOM);

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
        if (defaultOption) {
            setSelected(defaultOption);
        } else {
            setSelected(orderStatus_enum.FREEDOM);
        }
    }, [defaultOption]);

    useEffect(() => {
        if (!options_element.current) return;
        const optionsElement = options_element.current;
        const freedomElement = optionsElement.children[0];
        const defaultElement = optionsElement.children[1];

        switch (selected) {
            case orderStatus_enum.FREEDOM: {
                freedomElement.classList.add(style.selected);
                defaultElement.classList.remove(style.selected);
                break;
            }
            case orderStatus_enum.DEFAULT: {
                freedomElement.classList.remove(style.selected);
                defaultElement.classList.add(style.selected);
                break;
            }
            default: {
                freedomElement.classList.add(style.selected);
                defaultElement.classList.remove(style.selected);
                break;
            }
        }
    }, [selected]);

    const handleSelected = (selected: orderStatus_type) => {
        setSelected(selected);
    };

    const handleClose = () => {
        dispatch(set_addOrderStatusDialog({ isShow: false, order: undefined }));
    };

    const handleAgree = () => {};

    return (
        <div className={style.parent} ref={parent_element}>
            <div className={style.main}>
                <div className={style.closeContainer}>
                    <IoMdClose onClick={() => handleClose()} size={25} title={CLOSE} />
                </div>
                <div className={style.contentContainer}>
                    <div className={style.label}>
                        <div>{ORDER_STATUS}</div>
                    </div>
                    <div className={style.optionContainer}>
                        <div className={style.options} ref={options_element}>
                            <div onClick={() => handleSelected(orderStatus_enum.FREEDOM)}>{FREEDOM}</div>
                            <div onClick={() => handleSelected(orderStatus_enum.DEFAULT)}>{DEFAULT}</div>
                        </div>
                    </div>
                    <div className={style.selectedContentContainer}>
                        <div className={style.defaultSelection}>
                            <div>Lựa chọn trạng thái mặc định</div>
                            <div>
                                <select>
                                    <option value={defaultSelections.NOT_PAY}>{NOT_PAY}</option>
                                    <option value={defaultSelections.PAID}>{PAID}</option>
                                    <option value={defaultSelections.NOT_SEND}>{NOT_SEND}</option>
                                    <option value={defaultSelections.SENT}>{SENT}</option>
                                    <option value={defaultSelections.RETURN}>{RETURN}</option>
                                </select>
                            </div>
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

export default memo(AddOrderStatusDialog);
