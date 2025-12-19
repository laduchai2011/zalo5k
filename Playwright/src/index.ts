import { chromium, Page } from 'playwright';
import { consumeMessageTD } from './messageQueue/Consumer';
import { sendMessageTD } from './messageQueue/Producer';
import { isVideoTDBodyField, VideoTDBodyField } from './dataStruct/video';
import { my_log } from './log';

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

const basePath = 'D:/zalo5k/backEnd/data/video/input';

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
                            await page.goto(`https://oa.zalo.me/chat?uid=${UID}&oaid=${OAID}`, { timeout: 0 });
                            await page.waitForTimeout(1000);

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

        consumeMessageTD(`send_videoTD_${dev_prefix}`, async (mes) => {
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
