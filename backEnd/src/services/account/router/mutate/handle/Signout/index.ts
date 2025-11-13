import { Request, Response } from 'express';
import ServiceRedis from '@src/cache/cacheRedis';

let secure_cookie = false;
if (process.env.NODE_ENV !== 'development') {
    secure_cookie = true;
}

const sameSite = process.env.NODE_ENV === 'development' ? 'lax' : 'none';

class Handle_Signout {
    async main(req: Request, res: Response) {
        try {
            const id = req.cookies?.id;
            if (id) {
                // Xóa dữ liệu token trong Redis
                const serviceRedis = ServiceRedis.getInstance();
                await serviceRedis.init();

                const keyServiceRedis = `token-storeAuthToken-${id}`;
                await serviceRedis.deleteData(keyServiceRedis);
            }

            const cookieOptions = {
                httpOnly: true,
                secure: secure_cookie,
                sameSite: sameSite as 'lax' | 'none' | 'strict',
                domain: process.env.NODE_ENV === 'development' ? undefined : '.shopm.com',
            };

            // Xóa cookie
            res.clearCookie('id', cookieOptions);
            res.clearCookie('accessToken', cookieOptions);
            res.clearCookie('refreshToken', cookieOptions);

            res.json({
                isSuccess: true,
                message: 'Đăng xuất thành công và cookie đã được xóa.',
            });
        } catch (error) {
            res.status(500).json({
                isSuccess: false,
                message: 'Đăng xuất thất bại!',
                err: error,
            });
        }
    }
}

export default Handle_Signout;
