// import { Request, Response } from 'express';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import { MyResponse } from '@src/dataStruct/response';

// const uploadsDir = path.join(process.cwd(), 'data', 'video', 'uploads');

// class Handle_UploadChunk {
//     constructor() {}

//     upload = (): multer.Multer => {
//         const upload = multer({ dest: 'temp/' });

//         return upload;
//     };

//     main = (req: Request, res: Response) => {
//         const myResponse: MyResponse<unknown> = {
//             isSuccess: false,
//             message: 'Khởi tạo upload chunk !',
//         };

//         const { index, uploadId } = req.body;

//         const chunkDir = path.join(uploadsDir, uploadId);
//         if (!fs.existsSync(chunkDir)) {
//             fs.mkdirSync(chunkDir, { recursive: true });
//         }

//         try {
//             if (!req.file) {
//                 res.status(400).json({ error: 'No chunk uploaded' });
//                 return;
//             }
//             const filePath = path.join(chunkDir, index);
//             // fs.renameSync(req.file.path, filePath);
//             fs.copyFileSync(req.file.path, filePath);
//             fs.unlinkSync(req.file.path);

//             myResponse.message = 'Đăng tải những mẩu thước phim thành công !';
//             myResponse.isSuccess = true;
//             res.json(myResponse);
//             return;
//         } catch (error: any) {
//             console.error(error.response?.data || error);
//             res.status(500).json(error.response?.data || error);
//             return;
//         }
//     };
// }

// export default Handle_UploadChunk;

import { Request, Response } from 'express';
import multer from 'multer';
import { MinioService } from '@src/connect/minio/minio.service';
import { MyResponse } from '@src/dataStruct/response';
import { Readable } from 'stream';

const CHUNK_SIZE = 2 * 1024 * 1024;
class Handle_UploadChunk {
    constructor() {}

    upload = (): multer.Multer => {
        // const upload = multer({ dest: 'temp/' });
        const storage = multer.memoryStorage(); // hoặc diskStorage
        const upload = multer({
            storage,
            limits: { fileSize: CHUNK_SIZE }, // giới hạn size
        });

        return upload;
    };

    main = async (req: Request, res: Response) => {
        const { fileId, chunkIndex } = req.body;

        const myResponse: MyResponse<unknown> = {
            isSuccess: false,
            message: 'Khởi tạo upload chunk !',
        };

        if (!req.file || !fileId || chunkIndex === undefined) {
            res.status(400).json({ message: 'Missing params' });
            return;
        }

        try {
            const objectName = `chunks/${fileId}/${chunkIndex}`;

            // ✅ Buffer → Stream
            const stream = Readable.from(req.file.buffer);

            await MinioService.uploadStream(objectName, stream, req.file.size, req.file.mimetype);

            myResponse.isSuccess = true;
            myResponse.message = 'Đăng tải những mẩu thước phim thành công !';
            res.json(myResponse);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: 'Upload chunk failed' });
        }
    };
}

export default Handle_UploadChunk;
