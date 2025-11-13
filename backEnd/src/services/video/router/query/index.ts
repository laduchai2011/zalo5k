import express, { Router } from 'express';
import dotenv from 'dotenv';
import Handle_Watch from './handle/watch';

dotenv.config();
const router_get_video: Router = express.Router();

const handle_Watch = new Handle_Watch();

router_get_video.get('/watch', handle_Watch.main);

router_get_video.get('/*.m3u8', handle_Watch.main_playlist);

router_get_video.get('/*.ts', handle_Watch.main_segment);

// router_get_video.get(
//     '/*.m3u8',
//     (req: Request<Record<string, never>, unknown, unknown, parameter_options>, res: Response) => {
//         // const id = req.query.id;
//         // console.log(1111111, id, req.path);
//         // const filePath = path.join(root_path, 'data', 'video', 'output', id, req.path);
//         // res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
//         // res.sendFile(filePath);

//         try {
//             const id = req.query.id;
//             const filePath = path.join(root_path, 'data', 'video', 'output', id, req.path);
//             const stat = fs.statSync(filePath);
//             res.setHeader('Content-Type', 'video/MP2T');
//             res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
//             res.setHeader('Content-Length', stat.size);
//             fs.createReadStream(filePath).pipe(res);
//         } catch (err) {
//             res.status(404).send('Segment not found');
//         }
//     }
// );

// router_get_video.get(
//     '/*.ts',
//     (req: Request<Record<string, never>, unknown, unknown, parameter_options>, res: Response) => {
//         const id = req.query.id;
//         console.log(22222222222, id, req.path);
//         const filePath = path.join(root_path, 'data', 'video', 'output', id, req.path);
//         res.setHeader('Content-Type', 'video/MP2T');
//         res.sendFile(filePath);
//     }
// );

export default router_get_video;
