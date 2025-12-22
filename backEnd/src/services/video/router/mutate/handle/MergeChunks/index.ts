// import { Request, Response } from 'express';
// import { exec } from 'child_process';
// import path from 'path';
// import fs from 'fs';
// import { MyResponse } from '@src/dataStruct/response';
// import sharp from 'sharp';
// import { pipeline } from 'stream/promises';

// const uploadsDir = path.join(process.cwd(), 'data', 'video', 'uploads');
// const videoPath = path.join(process.cwd(), 'data', 'video', 'input');
// const imagePath = path.join(process.cwd(), 'data', 'image');
// const folderInputPath = path.join(imagePath, 'input');
// const folderOutputPath = path.join(imagePath, 'output');

// class Handle_MergeChunks {
//     constructor() {}

//     main = async (req: Request, res: Response) => {
//         const myResponse: MyResponse<unknown> = {
//             isSuccess: false,
//             message: 'Khởi tạo Merge Chunks !',
//         };

//         const { uploadId, filename } = req.body;

//         const chunkDir = path.join(uploadsDir, uploadId);
//         const files = fs.readdirSync(chunkDir);
//         const sorted = files.sort((a, b) => Number(a) - Number(b));

//         const inputVideoPath = path.join(videoPath, filename);
//         const writeStream = fs.createWriteStream(inputVideoPath);

//         for (const chunk of sorted) {
//             const chunkPath = path.join(chunkDir, chunk);
//             // const data = fs.readFileSync(chunkPath);
//             // // await writeStream.write(data);
//             // if (!writeStream.write(data)) {
//             //     await new Promise<void>((resolve) => {
//             //         writeStream.once('drain', () => resolve());
//             //     });
//             // }

//             await pipeline(
//                 fs.createReadStream(chunkPath),
//                 writeStream,
//                 { end: false } // rất quan trọng
//             );

//             // XÓA CHUNK NGAY → giải phóng inode + RAM
//             fs.unlinkSync(chunkPath);
//         }

//         // await writeStream.end();
//         await new Promise<void>((resolve, reject) => {
//             writeStream.end(() => resolve());
//             writeStream.on('error', reject);
//         });

//         fs.rmSync(chunkDir, { recursive: true, force: true });

//         const inputImagePath = path.join(folderInputPath, `${filename}.jpg`);
//         const outputImagePath = path.join(folderOutputPath, `${filename}.jpg`);
//         this.captureFrame(inputVideoPath, inputImagePath, 1)
//             .then(async () => {
//                 await compressImageFromUrl(inputImagePath, outputImagePath);
//                 myResponse.message = 'Đăng tải thước phim thành công !';
//                 myResponse.isSuccess = true;
//                 myResponse.data = { filename: filename };
//                 res.json(myResponse);
//                 return;
//             })
//             .catch((e: any) => {
//                 console.error(e.response?.data || e);
//                 res.status(500).json(e.response?.data || e);
//                 return;
//             });
//     };

//     captureFrame = (input: string, output: string, second: number): Promise<void> => {
//         return new Promise((resolve, reject) => {
//             const cmd = `ffmpeg -ss ${second} -i "${input}" -vframes 1 "${output}" -y`;

//             exec(cmd, (error, stdout, stderr) => {
//                 if (error) {
//                     reject(error);
//                     return;
//                 }
//                 resolve();
//             });
//         });
//     };
// }

// async function compressImageFromUrl(inputPath: string, outputPath: string) {
//     // Resize và nén ảnh
//     await sharp(inputPath)
//         .resize({ width: 1024 }) // thay đổi chiều rộng nếu muốn
//         .jpeg({ quality: 80 }) // giảm chất lượng jpeg
//         .toFile(outputPath);

//     // console.log('Ảnh đã nén xong (UploadMulVideos):', outputPath);
// }

// export default Handle_MergeChunks;

import { Request, Response } from 'express';
// import { exec } from 'child_process';
// import path from 'path';
// import fs from 'fs';
import { MyResponse } from '@src/dataStruct/response';
// import sharp from 'sharp';
// import { pipeline } from 'stream/promises';
import { MinioService } from '@src/connect/minio/minio.service';
import { PassThrough } from 'stream';

// const uploadsDir = path.join(process.cwd(), 'data', 'video', 'uploads');
// const videoPath = path.join(process.cwd(), 'data', 'video', 'input');
// const imagePath = path.join(process.cwd(), 'data', 'image');
// const folderInputPath = path.join(imagePath, 'input');
// const folderOutputPath = path.join(imagePath, 'output');

class Handle_MergeChunks {
    constructor() {}

    main = async (req: Request, res: Response) => {
        const myResponse: MyResponse<unknown> = {
            isSuccess: false,
            message: 'Khởi tạo Merge Chunks !',
        };

        const { fileId, totalChunks, finalFileName } = req.body;
        if (!fileId || !totalChunks || !finalFileName) {
            res.status(400).json({ message: 'Missing params' });
            return;
        }

        try {
            const finalObjectName = `videos/${finalFileName}`;
            const mergedStream = new PassThrough();
            const uploadPromise = MinioService.uploadStream(finalObjectName, mergedStream);

            // Ghép từng chunk
            for (let i = 0; i < totalChunks; i++) {
                const chunkStream = await MinioService.getStream(`chunks/${fileId}/${i}`);
                await new Promise<void>((resolve, reject) => {
                    chunkStream.pipe(mergedStream, { end: false });
                    chunkStream.on('end', resolve);
                    chunkStream.on('error', reject);
                });
            }

            mergedStream.end(); // báo hết dữ liệu
            await uploadPromise;

            // Xóa chunk tạm
            for (let i = 0; i < totalChunks; i++) {
                await MinioService.remove(`chunks/${fileId}/${i}`);
            }

            myResponse.message = 'Đăng tải thước phim thành công !';
            myResponse.isSuccess = true;
            myResponse.data = finalObjectName;
            res.json(myResponse);

            return;
        } catch (error: any) {
            console.error(error.response?.data || error);
            res.status(500).json(error.response?.data || error);
            return;
        }
    };
}

export default Handle_MergeChunks;
