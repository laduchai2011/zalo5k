import { createServer } from 'http';
import { Server } from 'socket.io';
import { consumeMessage } from '@src/messageQueue/Consumer';

const httpServer = createServer(); // ❗ Không dùng Express

const io = new Server(httpServer, {
    cors: {
        origin: '*', // Cho phép mọi domain kết nối
    },
});

consumeMessage('test', (data) => {
    console.log(1111111, data);
});

// Lắng nghe connection
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Tham gia phòng
    socket.on('joinRoom', (roomName: string) => {
        socket.join(roomName);
        console.log(`User ${socket.id} joined room ${roomName}`);

        // // Thông báo cho tất cả trong phòng
        // io.to(roomName).emit('systemMessage', `User ${socket.id} joined the room`);
    });

    // Gửi tin nhắn trong phòng
    socket.on('roomMessage', ({ roomName, message }) => {
        console.log(1111, roomName, message);
        socket.emit('roomMessage', { roomName: 'room1', message: 'server hello' });
        io.to(roomName).emit('roomMessage', { user: socket.id, message });
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
httpServer.listen(3005, () => {
    console.log('Socket.IO server running on port 3005');
});
