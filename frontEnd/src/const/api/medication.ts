import { BASE_URL } from './baseUrl';

const isProduct = process.env.NODE_ENV === 'production';
const apiString = isProduct ? '' : '/api';

export const MEDICATION_API = {
    GET_A_MEDICATION: `${BASE_URL}${apiString}/service_medication/query/getAMedication`,
    GET_MEDICATIONS: `${BASE_URL}${apiString}/service_medication/query/getMedications`,
    GET_A_MEDICATION_IMAGE: `${BASE_URL}${apiString}/service_medication/query/getAMedicationImage`,
    GET_A_MEDICATION_VIDEO: `${BASE_URL}${apiString}/service_medication/query/getAMedicationVideo`,
    GET_ALL_MEDICATION_IMAGES: `${BASE_URL}${apiString}/service_medication/query/getAllMedicationImages`,
    GET_ALL_MEDICATION_VIDEOS: `${BASE_URL}${apiString}/service_medication/query/getAllMedicationVideos`,
    GET_MEDICATION_COMMENTS: `${BASE_URL}${apiString}/service_medication/query/getMedicationComments`,
    CREATE_MEDICATION: `${BASE_URL}${apiString}/service_medication/mutate/createMedication`,
    CREATE_MEDICATION_COMMENT: `${BASE_URL}${apiString}/service_medication/mutate/createMedicationComment`,
};
