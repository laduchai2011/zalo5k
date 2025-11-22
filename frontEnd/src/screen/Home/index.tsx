import { useEffect } from 'react';
import style from './style.module.scss';
import MessageBox from './components/MessageBox';
import { HOME } from '@src/const/text';
import { useGetMyCustomsQuery } from '@src/redux/query/myCustomRTK';
import io from 'socket.io-client';
import Header from '../Header';
import { select_enum } from '@src/router/type';

type SocketType = ReturnType<typeof io>;

let socket: SocketType;

type messageSoc = {
    roomName: string;
    message: string;
};

const Home = () => {
    useEffect(() => {
        // Kết nối server
        socket = io('http://zalo5k.local.com:3005');

        socket.on('connect', () => {
            console.log('Connected:', socket.id);
        });

        // Nhận message từ server
        socket.on('roomMessage', (message: messageSoc) => {
            // setMessages((prev) => [...prev, data]);
            console.log(1111111, message);
        });

        socket.emit('roomMessage', { roomName: 'room1', message: 'client hello' });

        return () => {
            socket.disconnect();
        };
    }, []);

    const {
        data: data_myCustoms,
        // isFetching,
        isLoading: isLoading_myCustoms,
        isError: isError_myCustoms,
        error: error_myCustoms,
    } = useGetMyCustomsQuery({ page: 0, size: 0, accountId: -1 });
    useEffect(() => {
        if (isError_myCustoms && error_myCustoms) {
            console.error(error_myCustoms);
            // dispatch(
            //     setData_toastMessage({
            //         type: messageType_enum.SUCCESS,
            //         message: 'Lấy dữ liệu KHÔNG thành công !',
            //     })
            // );
        }
    }, [isError_myCustoms, error_myCustoms]);
    useEffect(() => {
        // setIsLoading(isLoading_medication);
    }, [isLoading_myCustoms]);
    useEffect(() => {
        const resData = data_myCustoms;
        console.log('myCustoms:', resData);
    }, [data_myCustoms]);
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
                <div className={style.headerTab}>
                    <Header selected={select_enum.HOME} />
                </div>
            </div>
        </div>
    );
};

export default Home;
