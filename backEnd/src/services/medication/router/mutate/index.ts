import express, { Router } from 'express';
import dotenv from 'dotenv';
import authentication from '@src/auth';
import Handle_CreateMedication from './handle/CreateMedication';
import Handle_CreateMedicationComment from './handle/CreateMedicationComment';

dotenv.config();

const router_mutate_medication: Router = express.Router();
const handle_createMedication = new Handle_CreateMedication();
const handle_createMedicationComment = new Handle_CreateMedicationComment();

router_mutate_medication.post(
    '/createMedication',
    authentication,
    handle_createMedication.setup,
    handle_createMedication.main
);

router_mutate_medication.post(
    '/createMedicationComment',
    authentication,
    handle_createMedicationComment.setup,
    handle_createMedicationComment.main
);

export default router_mutate_medication;
