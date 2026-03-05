import style from './style.module.scss';
import { ADD } from '@src/const/text';

const CreateService = () => {
    return (
        <div className={style.parent}>
            <div>{ADD}</div>
        </div>
    );
};

export default CreateService;
