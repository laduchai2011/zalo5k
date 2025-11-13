import express, { Router } from 'express';
import dotenv from 'dotenv';
import Handle_Upload from './handle/upload';
import Handle_UploadMultipleVideos from './handle/UploadMultipleVideos';

dotenv.config();
const router_mutate_video: Router = express.Router();

const handle_Upload = new Handle_Upload();
const handle_uploadMultipleVideos = new Handle_UploadMultipleVideos();

router_mutate_video.post(
    '/upload',
    handle_Upload.middle_upload,
    handle_Upload.middle_encode_video_to_HLS,
    handle_Upload.main
);

router_mutate_video.post(
    '/uploadMultipleVideos',
    handle_uploadMultipleVideos.upload().array('videos', 10),
    handle_uploadMultipleVideos.middle_upload,
    handle_uploadMultipleVideos.main
);

export default router_mutate_video;
