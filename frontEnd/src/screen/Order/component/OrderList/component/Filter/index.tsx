import { memo, useState } from 'react';
import style from './style.module.scss';
import { PAY, MONEY, FROM, TO } from '@src/const/text';

const Filter = () => {
    const [isCheckBox, setIsCheckBox] = useState<boolean>(true);
    const [isPay, setIsPay] = useState<boolean>(false);
    const [isNotPay, setIsNotPay] = useState<boolean>(false);

    const handleSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === 'chatRoomId') {
            setIsCheckBox(true);
        } else {
            setIsCheckBox(false);
        }
    };

    const handleIsPay = () => {
        setIsPay(!isPay);
    };

    const handleIsNotPay = () => {
        setIsNotPay(!isNotPay);
    };

    return (
        <div className={style.parent}>
            <div className={style.chatRoomId}>
                <select onChange={(e) => handleSelected(e)}>
                    <option value="chatRoomId">Mã phòng chat</option>
                    <option value="orderId">Mã đơn hàng</option>
                    <option value="phoneNumber">Số điện thoại</option>
                </select>
                <input placeholder="Mã" />
            </div>
            <div className={style.checks}>
                <div>
                    <input type="checkbox" checked={isPay} onChange={() => handleIsPay()} />
                    <div>{PAY}</div>
                </div>
                <div>
                    <input type="checkbox" checked={isNotPay} onChange={() => handleIsNotPay()} />
                    <div>{PAY}</div>
                </div>
            </div>
            <div className={style.money}>
                <div>{MONEY}</div>
                <div className={style.txt}>{FROM}</div>
                <input placeholder="VND" />
                <div className={style.txt}>{TO}</div>
                <input placeholder="VND" />
            </div>
        </div>
    );
};

export default memo(Filter);
