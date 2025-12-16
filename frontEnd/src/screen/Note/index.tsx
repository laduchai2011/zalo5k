import { useState, useRef, useEffect } from 'react';
import style from './style.module.scss';
import { NOTE, SEE_MORE } from '@src/const/text';
import Header from '@src/screen/Header';
import NoteFilter from './component/NoteFilter';
import NoteContent from './component/NoteContent';
import { select_enum } from '@src/router/type';

const Note = () => {
    const optionContainer_element = useRef<HTMLDivElement | null>(null);
    const [selectedOption, setSelectedOption] = useState<number>(0);

    useEffect(() => {
        const optionContainerElement = optionContainer_element.current;
        if (!optionContainerElement) return;
        const options = optionContainerElement.children;
        for (let i: number = 0; i < options.length; i++) {
            options[i].classList.remove(style.selected);
        }
        options[selectedOption].classList.add(style.selected);
    }, [selectedOption]);

    const handleSelectOptions = (selectedOption_: number) => {
        setSelectedOption(selectedOption_);
    };

    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{NOTE}</div>
                <div className={style.optionContainer} ref={optionContainer_element}>
                    <div className={style.option} onClick={() => handleSelectOptions(0)}>
                        Ghi chú
                    </div>
                    <div className={style.option} onClick={() => handleSelectOptions(1)}>
                        Đơn hàng
                    </div>
                </div>
                <div>
                    <NoteFilter />
                </div>
                <div className={style.list}>
                    <NoteContent />
                    <NoteContent />
                    <NoteContent />
                    <NoteContent />
                    <NoteContent />
                    <NoteContent />
                    <NoteContent />
                    <div className={style.seeMore}>
                        <div title={SEE_MORE}>{SEE_MORE}</div>
                    </div>
                </div>
                <div className={style.headerTab}>
                    <Header selected={select_enum.NOTE} />
                </div>
            </div>
        </div>
    );
};

export default Note;
