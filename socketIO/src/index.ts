import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { consumeMessage } from '@src/messageQueue/Consumer';
import { sendMessage } from '@src/messageQueue/Producer';
import { MessageZaloField } from './messageQueue/type';
import process from 'process';

dotenv.config();

const isProduct = process.env.NODE_ENV === 'production';

const httpServer = createServer(); // ❗ Không dùng Express

const io = new Server(httpServer, {
    // cors: {
    //     origin: "https://5kaquarium.com", // domain client
    //     methods: ["GET", "POST"],
    //     // credentials: true, // BỎ ĐI nếu client không dùng cookies / Authorization
    // }
    cors: {
        origin: '*',
    },
});

consumeMessage('customerSend_sendToMember', (data) => {
    const room = data.accountId.toString() + data.data.sender.id;
    const myRoom = data.accountId.toString();
    console.log(1111111111, data);
    io.to(myRoom).emit('roomMessage', JSON.stringify(data));
    io.to(room).emit('roomMessage', JSON.stringify(data));
});

// consumeMessage('test', (data) => {
//     console.log(22222222222, data);
// });

// Lắng nghe connection
io.on('connection', (socket) => {
    // console.log('User connected:', socket.id);

    // Tham gia phòng
    socket.on('joinRoom', (roomName: string) => {
        socket.join(roomName);
        console.log(`User ${socket.id} joined room ${roomName}`);

        // Thông báo cho tất cả trong phòng
        // io.to(roomName).emit('systemMessage', `User ${socket.id} joined the room`);
    });

    // Gửi tin nhắn trong phòng
    socket.on('roomMessage', ({ roomName, message }) => {
        // socket.emit('roomMessage', { roomName: 'room1', message: 'server hello' });
        const messageZalo: MessageZaloField = {
            data: message,
            isNewCustom: false,
            accountId: -1,
        };
        // console.log(33333333333, message);
        // sendMessage('test', messageZalo);
        sendMessage('memberSend_sendToCustomer', messageZalo);
        // io.to(roomName).emit('roomMessage', `server hello: ${message}`);
    });

    // Rời phòng
    socket.on('leaveRoom', (roomName: string) => {
        socket.leave(roomName);
        io.to(roomName).emit('systemMessage', `User ${socket.id} left the room`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Chạy server
const port = isProduct ? process.env.PORT : 1000;
httpServer.listen(port, () => {
    console.log(`Socket.IO server running on port ${port}`);
});
