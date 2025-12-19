import { VIDEO_API } from '@src/const/api/video';
import { IMAGE_API } from '@src/const/api/image';
import axiosInstance from '@src/api/axiosInstance';
import { MyResponse } from '@src/dataStruct/response';
import { MessageField, SendVideoTdFailureBodyField, SendVideoTdSuccessBodyField } from '@src/dataStruct/message';

const CHUNK_SIZE = 2 * 1024 * 1024; // 2MB

export const uploadVideo = async (file: File, id: string) => {
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const uploadId = `${Date.now()}-${id}-${file.name}`;

    const filename = `${Date.now()}_${id}_${file.name}`;

    for (let index = 0; index < totalChunks; index++) {
        const start = index * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);

        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('index', index.toString());
        formData.append('uploadId', uploadId);
        formData.append('filename', filename);
        formData.append('totalChunks', totalChunks.toString());

        await fetch(VIDEO_API.UPLOAD_CHUNK, {
            method: 'POST',
            body: formData,
        });
    }

    await fetch(VIDEO_API.MERGE_CHUNK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uploadId, filename: filename }),
    });

    return { filename: filename };
};

export const uploadImage = async (file: File, id: string) => {
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const uploadId = `${Date.now()}-${id}-${file.name}`;

    const filename = `${Date.now()}_${id}_${file.name}`;

    for (let index = 0; index < totalChunks; index++) {
        const start = index * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);

        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('index', index.toString());
        formData.append('uploadId', uploadId);
        formData.append('filename', filename);
        formData.append('totalChunks', totalChunks.toString());

        await fetch(IMAGE_API.UPLOAD_CHUNK, {
            method: 'POST',
            body: formData,
        });
    }

    await fetch(IMAGE_API.MERGE_CHUNK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uploadId, filename: filename }),
    });

    return { filename: filename };
};

export const handleSendVideoTdFailure = async (sendVideoTdFailureBody: SendVideoTdFailureBodyField) => {
    try {
        const response = await axiosInstance.post<MyResponse<MessageField>, any, SendVideoTdFailureBodyField>(
            `/service_message/mutate/sendVideoTdFailure`,
            sendVideoTdFailureBody
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const handleSendVideoTdSuccess = async (sendVideoTdSuccessBody: SendVideoTdSuccessBodyField) => {
    try {
        const response = await axiosInstance.post<MyResponse<MessageField>, any, SendVideoTdSuccessBodyField>(
            `/service_message/mutate/sendVideoTdSuccess`,
            sendVideoTdSuccessBody
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};
