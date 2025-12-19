import { FC, memo } from 'react';
import style from './style.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@src/redux';
import LazyImage from '@src/component/LazyImage';
import { FaPlay } from 'react-icons/fa6';
import { MessageVideoField } from '@src/dataStruct/hookData';
import { setData_playVideo } from '@src/redux/slice/Message';

const Thumbnail: FC<{ data: MessageVideoField }> = ({ data }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handlePlay = () => {
        dispatch(setData_playVideo({ isPlay: true, src: data.attachment.payload.elements[0].url }));
    };

    return (
        <div className={style.parent}>
            <LazyImage className={style.image} src={data.attachment.payload.elements[0].thumbnail} alt="img" />
            <FaPlay className={style.playIcon} onClick={() => handlePlay()} />
        </div>
    );
};

export default memo(Thumbnail);
