import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
// import { MyRequest } from '../../type';
import { MyResponse } from '@src/dataStruct/response';
import { AVideoFileField } from '@src/dataStruct/photo';
import { exec } from 'child_process';

const videoPath = path.join(process.cwd(), 'data', 'video', 'input');
const imagePath = path.join(process.cwd(), 'data', 'image');

class Handle_UploadMulVideos {
    constructor() {}

    upload = (): multer.Multer => {
        if (!fs.existsSync(videoPath)) {
            fs.mkdirSync(videoPath, { recursive: true });
        }

        const storage = multer.diskStorage({
            destination: (_req, _file, cb) => cb(null, videoPath),
            filename: (_req, file, cb) => {
                const ext = path.extname(file.originalname);
                const name = path.basename(file.originalname, ext);
                cb(null, `${name}-${Date.now()}${ext}`);
            },
        });

        const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
            if (file.mimetype.startsWith('video/')) cb(null, true);
            else cb(new Error('Chỉ cho phép file video!'));
        };

        const uploadVideos = multer({
            storage,
            fileFilter,
            limits: { fileSize: 500 * 1024 * 1024 }, // 500MB mỗi file
        });

        return uploadVideos;
    };

    middle_upload = (req: Request, res: Response, next: NextFunction) => {
        const myResponse: MyResponse<unknown> = {
            isSuccess: false,
        };

        if (!req.files) {
            myResponse.message = 'Không có file nào được tải lên';
            res.status(400).json(myResponse);
            return;
        }

        const files = (req.files as Express.Multer.File[]).map((file) => ({
            originalName: file.originalname,
            savedName: file.filename,
            size: file.size,
            path: file.path,
        }));

        for (let i: number = 0; i < files.length; i++) {
            const input = path.join(videoPath, files[i].savedName);
            const output = path.join(imagePath, `${files[i].savedName}.jpg`);
            this.captureFrame(input, output, 1);
        }

        res.locals.files = files;

        next();
    };

    captureFrame = (input: string, output: string, second: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            const cmd = `ffmpeg -ss ${second} -i "${input}" -vframes 1 "${output}" -y`;

            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        });
    };

    main = (_: Request, res: Response) => {
        const files: AVideoFileField[] = res.locals.files;

        const myResponse: MyResponse<AVideoFileField[]> = {
            message: 'Đăng tải những thước phim thành công !',
            isSuccess: true,
            data: files,
        };

        res.json(myResponse);
    };
}

export default Handle_UploadMulVideos;
