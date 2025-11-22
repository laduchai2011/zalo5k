import express, { Router } from 'express';
import dotenv from 'dotenv';
// import Handle_GetAMedication from './handle/GetAMedication';
import Handle_GetMyCustoms from './handle/GetMyCustoms';
// import Handle_GetAMedicationImage from './handle/GetAMedicationImage';
// import Handle_GetAMedicationVideo from './handle/GetAMedicationVideo';
// import Handle_GetAllMedicationImages from './handle/GetAllMedicationImages';
// import Handle_GetAllMedicationVideos from './handle/GetAllMedicationVideos';
// import Handle_GetMedicationComments from './handle/GetMedicationComments';

dotenv.config();
const router_query_myCustom: Router = express.Router();

// const handle_getAMedication = new Handle_GetAMedication();
const handle_getMyCustoms = new Handle_GetMyCustoms();
// const handle_getAMedicationImage = new Handle_GetAMedicationImage();
// const handle_getAMedicationVideo = new Handle_GetAMedicationVideo();
// const handle_getAllMedicationImages = new Handle_GetAllMedicationImages();
// const handle_getAllMedicationVideos = new Handle_GetAllMedicationVideos();
// const handle_getMedicationComments = new Handle_GetMedicationComments();

// router_query_medication.post('/getAMedication', handle_getAMedication.main);

router_query_myCustom.post('/getMyCustoms', handle_getMyCustoms.main);

// router_query_medication.post('/getAMedicationImage', handle_getAMedicationImage.main);

// router_query_medication.post('/getAMedicationVideo', handle_getAMedicationVideo.main);

// router_query_medication.post('/getAllMedicationImages', handle_getAllMedicationImages.main);

// router_query_medication.post('/getAllMedicationVideos', handle_getAllMedicationVideos.main);

// router_query_medication.post('/getMedicationComments', handle_getMedicationComments.main);

export default router_query_myCustom;
