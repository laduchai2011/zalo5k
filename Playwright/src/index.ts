import { chromium } from 'playwright';
import { consumeMessageTD } from './messageQueue/Consumer';
import { isVideoTDBodyField, VideoTDBodyField } from './dataStruct/video';
import { my_log } from './log';

// const SESSION_PATH = 'sessions/zalo-oa.json';

// const UID = '5324785107455488962'; // user nhận
// const OAID = '2018793888801741529'; // OA ID

const basePath = 'D:/zalo5k/backEnd/data/video/input';

(async () => {
    try {
        const browser = await chromium.launch({
            headless: false, // BẮT BUỘC false để login
        });

        const context = await browser.newContext();

        const pagetop = await context.newPage();

        await pagetop.goto('https://oa.zalo.me/manage/oa', {
            waitUntil: 'domcontentloaded',
        });

        console.log('👉 Login Zalo OA thủ công (QR / password)...');

        // ⏳ đợi bạn login xong
        await pagetop.waitForURL('https://oa.zalo.me/**', {
            timeout: 0,
        });

        await pagetop.waitForTimeout(5000);

        consumeMessageTD('senMes_dev', async (mes) => {
            console.log(11111, mes);
            if (!isVideoTDBodyField(mes)) {
                my_log.withRed('Body không đúng cấu trúc VideoTDBodyField');
            }

            const videoTDBody = mes as VideoTDBodyField;

            const OAID = videoTDBody.oaid;
            const UID = videoTDBody.receiveId;
            const NAME = videoTDBody.name;

            const page = await context.newPage();

            // await page.goto('https://oa.zalo.me/manage/oa', {
            //     waitUntil: 'domcontentloaded',
            // });

            // console.log('👉 Login Zalo OA thủ công (QR / password)...');

            // // ⏳ đợi bạn login xong
            // await page.waitForURL('https://oa.zalo.me/**', {
            //     timeout: 0,
            // });

            // // Đợi trang chat load ổn định
            // await page.waitForTimeout(5000);

            await page.goto(`https://oa.zalo.me/manage/choose?pageid=${OAID}`);
            await page.waitForTimeout(5000);

            await page.goto(`https://oa.zalo.me/chat?uid=${UID}&oaid=${OAID}`);
            await page.waitForTimeout(5000);

            const btn = page.getByRole('button', { name: 'Tìm hiểu thêm' });
            if ((await btn.count()) > 0) {
                await btn.click();
                const btn2 = page.getByRole('button', { name: 'Hủy' });
                if ((await btn2.count()) > 0) {
                    await btn2.click();
                }
            }

            await page.on('response', async (response) => {
                const url = response.url();

                if (url.includes('/chatv2') && url.includes('get')) {
                    const json = await response.json();
                    console.dir(json, { depth: null });

                    const msgId = json?.messages?.[0]?.msg_id;
                    if (msgId) {
                        console.log('📩 msg_id:', msgId);
                    }
                }
            });

            await page.on('websocket', (ws) => {
                ws.on('framereceived', (event) => {
                    const payload = event.payload;
                    console.log('WS msg_id: ', payload);

                    // try {
                    //     const json = JSON.parse(payload);
                    //     const msgId = json?.msg_id || json?.data?.msg_id;

                    //     if (msgId) {
                    //         console.log('📩 WS msg_id:', msgId);
                    //     }
                    // } catch {}
                });
            });

            const [fileChooser] = await Promise.all([
                page.waitForEvent('filechooser'), // Playwright sẽ bắt sự kiện file chooser
                page.click('[aria-describedby="tippy-tooltip-11"]'), // click vào icon video để bật file chooser
            ]);

            // Gán video cần upload
            await fileChooser.setFiles(`${basePath}/${NAME}`);

            // Optional: chờ video upload xong, có thể bấm nút gửi nếu cần
            await page.waitForTimeout(3000); // đợi 3s upload hoàn tất
            await page.keyboard.press('Enter'); // gửi tin nhắn
        });

        await new Promise(() => {});
    } catch (err) {
        console.error('❌ Playwright error:', err);
    }
})();
