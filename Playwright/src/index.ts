import { chromium, Page } from 'playwright';
import { consumeMessageTD } from './messageQueue/Consumer';
import { sendMessageTD } from './messageQueue/Producer';
import { isVideoTDBodyField, VideoTDBodyField } from './dataStruct/video';
import { my_log } from './log';
import path from 'path';
import fs from 'fs';
// import { pipeline } from 'stream/promises';
// import { Readable } from 'stream';

const SESSION_PATH = 'sessions/zalo-oa.json';

const isProduct = process.env.NODE_ENV === 'production';
const dev_prefix = isProduct ? '' : 'dev';

// const UID = '5324785107455488962'; // user nhận
// const OAID_TOP = '2018793888801741529'; // OA ID
interface PageField {
    oaid: string;
    uid: string;
    page: Page;
    accountId: number;
}

const videoPath = path.join(process.cwd(), 'data', 'video', 'input');
const basePath = isProduct ? videoPath : 'D:/zalo5k/backEnd/data/video/input';

// class LockKey {
//     private locked = false;
//     private waiting: Array<() => void> = [];

//     async waitLock(): Promise<void> {
//         if (!this.locked) {
//             this.locked = true;
//             return;
//         }

//         return new Promise((resolve) => {
//             this.waiting.push(resolve);
//         });
//     }

//     openLock() {
//         if (this.waiting.length > 0) {
//             const next = this.waiting.shift()!;
//             next(); // đánh thức task tiếp theo
//         } else {
//             this.locked = false;
//         }
//     }
// }

// async function cutQrLogTerminal(page: Page) {
//     // Chờ QR xuất hiện
//     const qrImg = page.locator('.qr-container img');
//     await qrImg.waitFor({ timeout: 15000 });

//     // Lấy src base64
//     const base64 = await qrImg.getAttribute('src');

//     if (!base64) throw new Error('Không lấy được QR');

//     // Cắt prefix
//     const base64Data = base64.replace(/^data:image\/png;base64,/, '');

//     // Lưu file
//     fs.writeFileSync('zalo-qr.png', base64Data, 'base64');

//     console.log('✅ QR saved: zalo-qr.png');
// }

// function webStreamToNode(stream: ReadableStream<Uint8Array>) {
//     const reader = stream.getReader();

//     return new Readable({
//         async read() {
//             try {
//                 const { done, value } = await reader.read();
//                 if (done) {
//                     this.push(null);
//                 } else {
//                     this.push(Buffer.from(value));
//                 }
//             } catch (err) {
//                 this.destroy(err as Error);
//             }
//         },
//     });
// }

// export async function downloadVideo(url: string, outputDir: string, fileName?: string) {
//     const res = await fetch(url);

//     const body = res.body;
//     if (!res.ok || !body) {
//         // throw new Error(`Download failed: ${res.status}`);
//         console.error(`Download failed: ${res.status}`);
//         return;
//     }

//     fs.mkdirSync(outputDir, { recursive: true });

//     const urlObj = new URL(url);
//     const nameFromUrl = path.basename(urlObj.pathname);
//     const finalName = fileName || (nameFromUrl && nameFromUrl.includes('.') ? nameFromUrl : 'video.mp4');

//     const filePath = path.join(outputDir, finalName);

//     const fileStream = fs.createWriteStream(filePath);

//     const readable = webStreamToNode(body);

//     await pipeline(readable, fileStream);

//     return filePath;
// }

(async () => {
    try {
        const browser = await chromium.launch({
            headless: false, // BẮT BUỘC false để login
            args: ['--disable-blink-features=AutomationControlled'],
        });

        const context = await browser.newContext({
            storageState: SESSION_PATH,
            userAgent:
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            viewport: { width: 1280, height: 800 },
        });

        const pagetop = await context.newPage();

        // BẮT BUỘC load trang gốc trước
        await pagetop.goto('https://oa.zalo.me', { timeout: 0 });
        await pagetop.waitForTimeout(3000);

        // await pagetop.goto('https://oa.zalo.me/manage/oa', {
        //     // waitUntil: 'domcontentloaded',
        //     timeout: 5000,
        // });
        await pagetop.goto('https://oa.zalo.me/manage/oa', { timeout: 0 });
        await pagetop.waitForTimeout(3000);

        console.log('👉 Login Zalo OA thủ công (QR / password)...');

        // cutQrLogTerminal(pagetop);

        // ⏳ đợi bạn login xong
        await pagetop.waitForURL('https://oa.zalo.me/**', {
            timeout: 0,
        });

        // await pagetop.click('a[href^="https://oa.zalo.me/manage/register/service"]');

        await pagetop.waitForTimeout(5000);

        let pages: PageField[] = [];

        // await pagetop.goto(`https://oa.zalo.me/manage/choose?pageid=${OAID_TOP}`, {
        //     waitUntil: 'domcontentloaded',
        //     timeout: 60000,
        // });

        // const lockKey = new LockKey();

        consumeMessageTD(`chatRoom_tadao_${dev_prefix}`, async ({ status, oaid, uid, accountId }) => {
            console.log('chatRoom_tadao', status);
            switch (status) {
                case 'open': {
                    const OAID = oaid;
                    const UID = uid;
                    try {
                        let i_page: number = -1;
                        let page: Page | null = null;
                        for (let i: number = 0; i < pages.length; i++) {
                            if (pages[i].oaid === oaid && pages[i].uid === uid) {
                                i_page = i;
                                page = pages[i].page;
                                break;
                            }
                        }

                        if (i_page === -1) {
                            page = await context.newPage();
                            pages.push({ oaid: oaid, uid: uid, page: page, accountId: accountId });
                            await page.goto(`https://oa.zalo.me/chat?uid=${UID}&oaid=${OAID}`, {
                                // waitUntil: 'domcontentloaded',
                                timeout: 0,
                            });
                            await page.waitForTimeout(6000);

                            const btn = page.getByRole('button', { name: 'Tìm hiểu thêm' });
                            if ((await btn.count()) > 0) {
                                await btn.click();
                                const btn2 = page.getByRole('button', { name: 'Hủy' });
                                if ((await btn2.count()) > 0) {
                                    await btn2.click();
                                }
                            }
                        }

                        if (!page) {
                            my_log.withRed('Không lấy được page trong chatRoom_tadao');
                            return;
                        }

                        // await page.waitForTimeout(3000);

                        sendMessageTD(`open_chatRoom_tadao_success_${dev_prefix}`, { oaid, uid, accountId });
                    } catch (error) {
                        sendMessageTD(`open_chatRoom_tadao_failure_${dev_prefix}`, { oaid, uid, accountId });
                        console.error(error);
                    }
                    break;
                }
                case 'close': {
                    for (let i: number = 0; i < pages.length; i++) {
                        if (pages[i].oaid === oaid && pages[i].uid === uid) {
                            pages[i].page.close();
                            break;
                        }
                    }

                    const newArr = pages.filter((item) => !(item.oaid === oaid && item.uid === uid));

                    pages = newArr;

                    break;
                }
                default: {
                    //statements;
                    break;
                }
            }
        });

        // consumeMessageTD(`send_videoTD_${dev_prefix}`, async (mes) => {
        consumeMessageTD(`send_videoTD`, async (mes) => {
            console.log('send_videoTD', mes);
            if (!isVideoTDBodyField(mes)) {
                my_log.withRed('Body không đúng cấu trúc VideoTDBodyField');
            }

            const videoTDBody = mes as VideoTDBodyField;

            let page: Page | null = null;

            for (let i: number = 0; i < pages.length; i++) {
                if (pages[i].oaid === videoTDBody.oaid && pages[i].uid === videoTDBody.receiveId) {
                    page = pages[i].page;
                    break;
                }
            }

            if (!page) {
                my_log.withRed('Không lấy được page trong send_videoTD');
                sendMessageTD(`send_videoTD_failure_${dev_prefix}`, {
                    oaid: videoTDBody.oaid,
                    uid: videoTDBody.receiveId,
                    accountId: videoTDBody.accountId,
                    name: videoTDBody.name,
                });
                return;
            }

            const NAME = videoTDBody.name;

            const urlvideo = `http://api.5kaquarium.com/service_video/query/streamVideo?id=${NAME}`;
            try {
                const res = await fetch(urlvideo);
                const body = res.body;
                console.log('✅ Video downloaded:', body);
                if (!res.ok || !body) {
                    sendMessageTD(`send_videoTD_failure_${dev_prefix}`, {
                        oaid: videoTDBody.oaid,
                        uid: videoTDBody.receiveId,
                        accountId: videoTDBody.accountId,
                        name: videoTDBody.name,
                    });
                    return;
                } else {
                    // await pipeline(
                    //     Readable.fromWeb(body as unknown as globalThis.ReadableStream<Uint8Array>),
                    //     fs.createWriteStream(path.join(basePath, NAME))
                    // );
                    const buffer = Buffer.from(await res.arrayBuffer());
                    fs.writeFileSync(path.join(basePath, NAME), buffer);
                }
            } catch (error) {
                console.error('❌ Lỗi khi tải video:', error);
                sendMessageTD(`send_videoTD_failure_${dev_prefix}`, {
                    oaid: videoTDBody.oaid,
                    uid: videoTDBody.receiveId,
                    accountId: videoTDBody.accountId,
                    name: videoTDBody.name,
                });
                return;
            }

            // const resvideo = await downloadVideo(urlvideo, basePath, NAME);
            // console.log(11111, resvideo);

            try {
                const [fileChooser] = await Promise.all([
                    page.waitForEvent('filechooser'), // Playwright sẽ bắt sự kiện file chooser
                    // page.click('[aria-describedby="tippy-tooltip-11"]'), // click vào icon video để bật file chooser
                    await page
                        .locator('i.icon_bar.icon_video.on')
                        .locator('xpath=ancestor::div[@data-tooltipped]')
                        .click(),
                ]);
                // const videoBtn = page.locator('div.upload-container.is-media i.icon_video.on');
                // await videoBtn.first().click();

                // Gán video cần upload
                await fileChooser.setFiles(`${basePath}/${NAME}`);

                // Optional: chờ video upload xong, có thể bấm nút gửi nếu cần
                await page.waitForTimeout(3000); // đợi 3s upload hoàn tất
                await page.keyboard.press('Enter'); // gửi tin nhắn

                sendMessageTD(`send_videoTD_success_${dev_prefix}`, {
                    oaid: videoTDBody.oaid,
                    uid: videoTDBody.receiveId,
                    accountId: videoTDBody.accountId,
                    name: videoTDBody.name,
                });
            } catch (error) {
                sendMessageTD(`send_videoTD_failure_${dev_prefix}`, {
                    oaid: videoTDBody.oaid,
                    uid: videoTDBody.receiveId,
                    accountId: videoTDBody.accountId,
                    name: videoTDBody.name,
                });
                console.error(error);
            }
        });

        await new Promise(() => {});
    } catch (err) {
        console.error('❌ Playwright error:', err);
    }
})();
