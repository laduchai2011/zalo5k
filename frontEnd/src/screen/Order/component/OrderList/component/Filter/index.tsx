import { memo, useState } from 'react';
import style from './style.module.scss';
import { PAY } from '@src/const/text';

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
                </select>
                <input placeholder="Mã" />
            </div>
            {isCheckBox && (
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
            )}
        </div>
    );
};

export default memo(Filter);
