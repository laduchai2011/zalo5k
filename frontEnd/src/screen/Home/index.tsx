import style from './style.module.scss';
import MessageBox from './components/MessageBox';

const Home = () => {
    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>Trang chủ</div>
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
