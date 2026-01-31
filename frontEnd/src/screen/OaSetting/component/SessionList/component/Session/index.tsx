import { FC, memo, useEffect, useState } from 'react';
import style from './style.module.scss';
import { MdDelete } from 'react-icons/md';
import { GoDotFill } from 'react-icons/go';
import avatarnull from '@src/asset/avatar/avatarnull.png';
import { ChatSessionField } from '@src/dataStruct/chatSession';

const Session: FC<{ index: number; data: ChatSessionField }> = ({ index, data }) => {
    const btnText = data.isReady ? 'Bỏ săn sàng' : 'Sẵn sàng';
    const readyColor = data.isReady ? 'green' : 'gray';
    const selectedAccountId = data.selectedAccountId;

    const handleDel = () => {};

    return (
        <div className={style.parent}>
            <div className={style.header}>
                <div>{index}</div>
                <div>{data.label}</div>
                <div>
                    <GoDotFill size={20} color={readyColor} />
                    <MdDelete onClick={() => handleDel()} size={20} color="red" />
                </div>
            </div>
            <div className={style.infor}>
                <div>{`Mã phiên: ${data.code}`}</div>
                <div>Chỉ định: Lựa chọn hoặc nhập id</div>
                <div className={style.selectedContainer}>
                    <div>
                        <select id="fruit" name="fruit">
                            <option value="apple">Táo</option>
                            <option value="banana">Chuối</option>
                            <option value="mango">Xoài</option>
                        </select>
                    </div>
                    <div>
                        <input placeholder="id" />
                    </div>
                </div>
            </div>
            <div className={style.selectedAcount}>
                <div>
                    <img src={avatarnull} alt="" />
                </div>
                <div>name</div>
            </div>
            <div className={style.btnContainer}>
                <button>{btnText}</button>
            </div>
        </div>
    );
};

export default memo(Session);
