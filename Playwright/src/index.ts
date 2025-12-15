// import fs from 'fs';
// import { chromium, Page, BrowserContext } from 'playwright';

// const SESSION_PATH = 'sessions/zalo.json';
// // const USER_ID = '906809dc-840a-47ed-80bc-03e7f52a416f-7ddeda88d0c599cc494da0dece6554d5';
// const USER_ID = '39318779427775527';
// const MESSAGE = 'Xin chào! Đây là tin nhắn tự động 🚀';

// async function ensureStorageFile() {
//     if (!fs.existsSync(SESSION_PATH) || fs.readFileSync(SESSION_PATH, 'utf8').trim() === '') {
//         fs.mkdirSync('sessions', { recursive: true });
//         fs.writeFileSync(SESSION_PATH, '{}', 'utf8');
//     }
// }

// type LoginResult = {
//     context: BrowserContext;
//     page: Page;
// };
// // 1️⃣ Login QR và lưu session
// async function loginAndSaveSession(): Promise<LoginResult> {
//     const browser = await chromium.launch({ headless: false });
//     // const context = await browser.newContext({ storageState: SESSION_PATH });
//     const context = await browser.newContext();
//     await context.storageState({ path: SESSION_PATH });
//     const page = await context.newPage();

//     await page.goto('https://chat.zalo.me/');
//     await page.waitForLoadState('domcontentloaded');

//     const cookies = await context.cookies();
//     const hasAuth = cookies.some((c) => c.name === 'zpw_sek');

//     // if (page.url().includes('id.zalo.me')) {
//     if (!hasAuth) {
//         console.log('❗ Bạn chưa login. Vui lòng quét QR...');
//         await page.waitForSelector('img[src*="qr"]', { timeout: 60000 });
//         await page.waitForTimeout(20000); // thời gian quét QR

//         await context.storageState({ path: SESSION_PATH });
//         console.log('✔ Session mới đã lưu!');
//     } else {
//         console.log('✔ Session hợp lệ, đã login');
//     }

//     return { context, page };
// }

// async function sendMessageViaPage(page: Page, toId: string, message: string, sek: string) {
//     const result = await page.evaluate(
//         ({ toId, message, sek }) => {
//             return fetch('https://tt-chat3-wpa.chat.zalo.me/api/message/sms?zpw_ver=674&zpw_type=30&nretry=0', {
//                 method: 'POST',
//                 headers: {
//                     'content-type': 'application/x-www-form-urlencoded',
//                     origin: 'https://chat.zalo.me',
//                     referer: 'https://chat.zalo.me/',
//                     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...',
//                     'x-zpw-sek': sek,
//                 },
//                 body: `toid=${toId}&msg=${encodeURIComponent(message)}&type=1`,
//             }).then((r) => r.text());
//         },
//         { toId, message, sek }
//     );

//     console.log('📩 SERVER RESPONSE:', result);
// }

// async function sendMessage(toId: string, message: string, sek: string, context: BrowserContext) {
//     const response = await context.request.post(
//         'https://tt-chat4-wpa.chat.zalo.me/api/message/sms?zpw_ver=674&zpw_type=30&nretry=0',
//         {
//             headers: {
//                 'content-type': 'application/x-www-form-urlencoded',
//                 origin: 'https://chat.zalo.me',
//                 referer: 'https://chat.zalo.me/',
//                 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...',
//                 'x-zpw-sek': sek,
//                 // zpw_sek: sek,
//             },
//             data: `toid=${toId}&msg=${encodeURIComponent(message)}&type=1`,
//         }
//     );

//     const text = await response.text();
//     console.log('📩 SERVER RESPONSE:', text);
// }

// async function sendMessage1(chatId: string, message: string, sek: string, context: BrowserContext) {
//     const response = await context.request.post(
//         'https://tt-chat4-wpa.chat.zalo.me/api/message/sms?zpw_ver=674&zpw_type=30&nretry=0',
//         {
//             headers: {
//                 'content-type': 'application/x-www-form-urlencoded',
//                 origin: 'https://chat.zalo.me',
//                 referer: 'https://chat.zalo.me/',
//                 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...',
//                 'x-zpw-sek': sek,
//                 // zpw_sek: sek,
//             },
//             data: `chatId=${chatId}&msg=${encodeURIComponent(message)}&type=1`,
//         }
//     );

//     const text = await response.text();
//     console.log('📩 SERVER RESPONSE 1:', text);
// }

// async function sendMessage2(convId: string, message: string, sek: string, context: BrowserContext) {
//     const response = await context.request.post(
//         'https://tt-chat4-wpa.chat.zalo.me/api/message/sms?zpw_ver=674&zpw_type=30&nretry=0',
//         {
//             headers: {
//                 'content-type': 'application/x-www-form-urlencoded',
//                 origin: 'https://chat.zalo.me',
//                 referer: 'https://chat.zalo.me/',
//                 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...',
//                 'x-zpw-sek': sek,
//                 // zpw_sek: sek,
//             },
//             data: `convId=${convId}&msg=${encodeURIComponent(message)}&type=1`,
//         }
//     );

//     const text = await response.text();
//     console.log('📩 SERVER RESPONSE 2:', text);
// }

// function getZpwSekFromFile(path: string): string {
//     if (!fs.existsSync(path)) throw new Error('File session không tồn tại');

//     const raw = fs.readFileSync(path, 'utf8');
//     const data = JSON.parse(raw);

//     if (!data.cookies || !Array.isArray(data.cookies)) {
//         throw new Error('File session không hợp lệ');
//     }

//     const sekCookie = data.cookies.find((c: any) => c.name === 'zpw_sek');
//     if (!sekCookie) throw new Error('Không tìm thấy zpw_sek trong file');

//     return sekCookie.value;
// }

// (async () => {
//     await ensureStorageFile();

//     const { context, page } = await loginAndSaveSession();

//     const search = await page.waitForSelector('input[id="contact-search-input"]', { timeout: 60000 });
//     await search.click(); // focus
//     await search.fill(''); // clear
//     await search.type('Trần Đại Dương', { delay: 80 });

//     // const click = await page.waitForSelector('div[id="recent-item-5275178911188930090"]', { timeout: 180000 });
//     const click = await page.waitForSelector('div[id="friend-item-5275178911188930090"]', { timeout: 180000 });
//     await click.click();

//     // BẮT BUỘC đợi sh_rooms có data
//     // await page.waitForFunction(
//     //     () => {
//     //         const rooms = JSON.parse(localStorage.getItem('sh_rooms') || '[]');
//     //         return rooms.length > 0;
//     //     },
//     //     { timeout: 10000 }
//     // );

//     // Lấy zpw_sek
//     const sek = await getZpwSekFromFile('sessions/zalo.json');

//     console.log(11111111, sek);

//     const userIds = await page.evaluate(() => JSON.parse(localStorage.getItem('sh_user_ids') || '[]'));

//     const rooms = await page.evaluate(() => {
//         return JSON.parse(localStorage.getItem('sh_rooms') || '[]');
//     });

//     console.log(222222, rooms, userIds);

//     // await page.goto(`https://chat.zalo.me/?chatId=${userIds[0]}`);
//     // await sendMessage(userIds[0], MESSAGE, sek, context);
//     for (const toId of userIds) {
//         // await page.goto(`https://chat.zalo.me/?chatId=${toId}`);
//         // await sendMessage(toId, MESSAGE, sek, context);
//         // const result = await page.evaluate(
//         //     ({ toId, MESSAGE, sek }) => {
//         //         // return fetch('https://tt-chat3-wpa.chat.zalo.me/api/message/sms?zpw_ver=674&zpw_type=30&nretry=0', {
//         //         //     method: 'POST',
//         //         //     headers: {
//         //         //         'content-type': 'application/x-www-form-urlencoded',
//         //         //         origin: 'https://chat.zalo.me',
//         //         //         referer: 'https://chat.zalo.me/',
//         //         //         'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...',
//         //         //         'x-zpw-sek': sek,
//         //         //     },
//         //         //     body: `toid=${toId}&msg=${encodeURIComponent(MESSAGE)}&type=1`,
//         //         // }).then((r) => r.text());
//         //         const win = window as any;
//         //         const chat = win?.Zalo?.chat?.getChatById(toId);
//         //         if (chat) chat.sendMessage(MESSAGE);
//         //     },
//         //     { toId, MESSAGE, sek }
//         // );
//         // console.log(333333, result);
//     }

//     // await sendMessage1(rooms.chatId, MESSAGE, sek, context);

//     const convId = await page.evaluate(() => {
//         const raw = localStorage.getItem('0_l_r_m_i::-1');
//         console.log('raw', raw);
//         if (!raw) throw 'No conv';
//         return JSON.parse(raw).convId;
//     });
//     await sendMessage2(convId, MESSAGE, sek, context);

//     // Gửi tin nhắn
//     // await sendMessageViaPage(page, USER_ID, MESSAGE, sek);
//     // await sendMessage(USER_ID, MESSAGE, sek, context);

//     console.log('✅ HOÀN TẤT');
// })();

// function cleanJson(raw: string) {
//     const idx = raw.indexOf('{');
//     if (idx === -1) throw new Error('Không tìm thấy JSON');
//     return raw.slice(idx);
// }

import { chromium } from 'playwright';
import { URLSearchParams } from 'url';
import fs from 'fs';

const SESSION_PATH = 'sessions/zalo-oa.json';

const UID = '5324785107455488962'; // user nhận
const OAID = '2018793888801741529'; // OA ID
const MESSAGE = 'Xin chào! Tin nhắn tự động 🚀';

(async () => {
    const browser = await chromium.launch({
        headless: false, // BẮT BUỘC false để login
    });

    const context = await browser.newContext();

    // const page_0 = await context.newPage();
    // await page_0.goto('https://oa.zalo.me/home', {
    //     waitUntil: 'domcontentloaded',
    // });
    // await context.storageState({ path: SESSION_PATH });
    const page = await context.newPage();

    await page.goto('https://oa.zalo.me/manage/oa', {
        waitUntil: 'domcontentloaded',
    });

    console.log('👉 Login Zalo OA thủ công (QR / password)...');

    // ⏳ đợi bạn login xong
    await page.waitForURL('https://oa.zalo.me/**', {
        timeout: 0,
    });

    // Đợi trang chat load ổn định
    await page.waitForTimeout(5000);

    // await page.goto('https://oa.zalo.me/manage/oa');
    // await page.waitForTimeout(5000);
    // await page.goto('https://id.zalo.me');
    // await page.waitForTimeout(5000);
    // await page.goto('https://zaloapp.com');
    // await page.waitForTimeout(5000);

    await page.goto(`https://oa.zalo.me/manage/choose?pageid=${OAID}`);
    await page.waitForTimeout(5000);

    await page.goto(`https://oa.zalo.me/chat?uid=${UID}&oaid=${OAID}`);
    await page.waitForTimeout(5000);

    await context.cookies();

    // // 💾 Lưu cookie + localStorage
    await context.storageState({
        path: SESSION_PATH,
    });

    console.log('✅ Đã lưu session:', SESSION_PATH);

    // Tìm input file gần icon video
    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'), // Playwright sẽ bắt sự kiện file chooser
        page.click('[aria-describedby="tippy-tooltip-11"]'), // click vào icon video để bật file chooser
    ]);

    // Gán video cần upload
    await fileChooser.setFiles('E:/video/7291959541730.mp4');

    // Optional: chờ video upload xong, có thể bấm nút gửi nếu cần
    await page.waitForTimeout(3000); // đợi 3s upload hoàn tất
    await page.keyboard.press('Enter'); // gửi tin nhắn

    page.on('request', (request) => {
        const url = request.url();
        if (url.includes('/chatv2/message/send-text')) {
            console.log('💡 Found send-text request');
            console.log('Request headers:', request.headers());
            console.log('Request post data:', request.postData());
        }
    });

    page.on('response', async (response) => {
        const url = response.url();
        if (url.includes('/chatv2/message')) {
            // bất kỳ endpoint chat nào
            try {
                const text = await response.text(); // hoặc json()
                console.log('💌 Incoming message data:', text);
            } catch (e) {
                console.log('Cannot read response body', e);
            }
        }
    });

    page.on('websocket', (ws) => {
        console.log('websocket');

        // ws.on('framessent', (frame: any) => {
        //     console.log('➡️ WS SENT:', frame.payload);
        // });

        ws.on('framereceived', (frame) => {
            console.log('📥 Incoming WS frame:', frame.payload);
        });
    });

    // console.log(await res.json());

    // await browser.close();
})();

function getZpwSekFromFile(path: string): string {
    if (!fs.existsSync(path)) throw new Error('File session không tồn tại');

    const raw = fs.readFileSync(path, 'utf8');
    const data = JSON.parse(raw);

    if (!data.cookies || !Array.isArray(data.cookies)) {
        throw new Error('File session không hợp lệ');
    }

    const sekCookie = data.cookies.find((c: any) => c.name === 'zoaw_sek');
    if (!sekCookie) throw new Error('Không tìm thấy zpw_sek trong file');

    return sekCookie.value;
}
