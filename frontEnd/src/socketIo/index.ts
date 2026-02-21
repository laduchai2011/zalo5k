import { SOCKET_URL } from '@src/const/api/socketUrl';
import { SocketType } from '@src/dataStruct/socketIo';
import io from 'socket.io-client';

let socket: SocketType | null = null;

export const getSocket = () => {
    if (!socket) {
        socket = io(SOCKET_URL || '', { path: '/socket.io/' });
        // socket = io('wss://socketapp.5kaquarium.com', {
        //     path: "/socket.io/",
        // });
    }
    return socket;
};
