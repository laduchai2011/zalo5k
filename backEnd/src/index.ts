import express, { Express } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import process from 'process';
import cors from 'cors';

dotenv.config();

import service_image from './services/image';
import service_video from './services/video';
import service_account from '@src/services/account';
import service_myCustomer from './services/myCustomer';
import service_message from './services/message';
import service_note from './services/note';

const app: Express = express();
const port = process.env.PORT || 3007;

const isProduct = process.env.NODE_ENV === 'production';

const apiString = isProduct ? '' : '/api';

app.use(cookieParser());
app.use(apiString, express.json());
app.use(apiString, express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     const allowedOrigins = ['http://zalo5k.local.com:3000'];
//     const origin = req.headers.origin as string;
//     if (allowedOrigins.includes(origin)) {
//         res.header('Access-Control-Allow-Origin', origin);
//     }
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Credentials', 'true');

//     // 👉 Quan trọng: xử lý preflight
//     if (req.method === 'OPTIONS') {
//         res.sendStatus(200);
//         return;
//     }

//     next();
// });
const originArray: string[] = ['http://zalo5k.local.com:3000'];
app.use(
    cors({
        origin: originArray,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
    })
);

app.use(`${apiString}/hello`, (req, res) => {
    res.send('hello');
});

app.use(`${apiString}/service_image`, service_image);
app.use(`${apiString}/service_video`, service_video);
app.use(`${apiString}/service_account`, service_account);
app.use(`${apiString}/service_myCustomer`, service_myCustomer);
app.use(`${apiString}/service_message`, service_message);
app.use(`${apiString}/service_note`, service_note);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
