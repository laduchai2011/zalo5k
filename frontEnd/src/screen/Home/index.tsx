import style from './style.module.scss';
import MessageBox from './components/MessageBox';
import { HOME } from '@src/const/text';

const Home = () => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{HOME}</div>
                <div className={style.list}>
                    <MessageBox />
                    <MessageBox />
                    <MessageBox />
                    <MessageBox />
                    <MessageBox />
                    <MessageBox />
                    <MessageBox />
                    <MessageBox />
                    <MessageBox />
                    <MessageBox />
                    <MessageBox />
                    <MessageBox />
                    <MessageBox />
                    <MessageBox />
                    <MessageBox />
                    <MessageBox />
                </div>
            </div>
        </div>
    );
};

export default Home;
