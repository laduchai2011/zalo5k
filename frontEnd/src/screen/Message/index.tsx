import { useRef, useState, useEffect, useCallback, useId } from 'react';
import { useParams } from 'react-router-dom';
import style from './style.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@src/redux';
import YourMessage from './components/YourMessage';
import MyMessage from './components/MyMessage';
import { MESSAGE } from '@src/const/text';
import { MessageField } from '@src/dataStruct/message';
import { IoMdSend } from 'react-icons/io';
import { useCreateMessageMutation } from '@src/redux/query/messageRTK';
import io from 'socket.io-client';
import { SocketType } from '@src/dataStruct/socketIO';
import { SOCKET_URL } from '@src/const/api/socketUrl';
import { FaImage } from 'react-icons/fa';
import MyToastMessage from './components/MyToastMessage';
import MyImageInput from './components/MyImageInput';
import MyVideoInput from './components/MyVideoInput';
import axiosInstance from '@src/api/axiosInstance';
import { IMAGE_API } from '@src/const/api/image';
import { VIDEO_API } from '@src/const/api/video';
import { setData_toastMessage } from '@src/redux/slice/Message';
import { messageType_enum as toastMessageType_enum } from '@src/component/ToastMessage/type';
import { AImageFileField, AVideoFileField } from '@src/dataStruct/photo';
import { MyResponse } from '@src/dataStruct/response';
import { BASE_URL, isProduct } from '@src/const/api/baseUrl';
import {
    MessageImageField,
    // MessageImagesField,
    MessageImageUrlField,
    MessageTextField,
    HookDataField,
    ZaloMessage,
} from '@src/dataStruct/hookData';
import { zalo_event_name_enum, MessageZaloField, ZaloCustomerField } from '@src/dataStruct/hookData';
import {
    sender_enum,
    CreateMessageBodyField,
    messageStatus_enum,
    messageType_enum,
    messageType_type,
} from '@src/dataStruct/message';
import { useGetMessagesQuery } from '@src/redux/query/messageRTK';
import { useGetInforCustomerOnZaloQuery } from '@src/redux/query/myCustomerRTK';

let socket: SocketType;

const apiString = isProduct ? '' : '/api';

const Message = () => {
    const dispatch = useDispatch<AppDispatch>();
    const myId = sessionStorage.getItem('myId');
    const { id } = useParams<{ id: string }>();
    const [hasMore, setHasMore] = useState(true);
    const contentContainer_element = useRef<HTMLDivElement | null>(null);
    const [data, setData] = useState<MessageField[]>([]);
    const [messages, setMessages] = useState<MessageField[]>([]);
    const [index_mes, set_index_mes] = useState<number>(6);
    const [newMessage, setNewMessage] = useState<string>('');
    const [localImages, setLocalImages] = useState<File[]>([]);
    const [localVideos, setLocalVideos] = useState<File[]>([]);
    const id_folderInput = useId();
    const input_element = useRef<HTMLInputElement | null>(null);

    const [createMessage] = useCreateMessageMutation();

    const [zaloCustomer, setZaloCustomer] = useState<ZaloCustomerField | undefined>(undefined);
    const {
        data: data_zaloInforCustomer,
        // isFetching,
        isLoading: isLoading_zaloInforCustomer,
        isError: isError_zaloInforCustomer,
        error: error_zaloInforCustomer,
    } = useGetInforCustomerOnZaloQuery({ customerId: id || '' }, { skip: id === undefined });
    useEffect(() => {
        if (isError_zaloInforCustomer && error_zaloInforCustomer) {
            console.error(error_zaloInforCustomer);
            // dispatch(
            //     setData_toastMessage({
            //         type: messageType_enum.SUCCESS,
            //         message: 'Lấy dữ liệu KHÔNG thành công !',
            //     })
            // );
        }
    }, [isError_zaloInforCustomer, error_zaloInforCustomer]);
    useEffect(() => {
        // setIsLoading(isLoading_medication);
    }, [isLoading_zaloInforCustomer]);
    useEffect(() => {
        const resData = data_zaloInforCustomer;
        if (resData?.isSuccess && resData.data && resData.data.error === 0) {
            setZaloCustomer(resData.data);
        }
    }, [data_zaloInforCustomer]);

    const {
        data: data_messages,
        // isFetching,
        isLoading: isLoading_messages,
        isError: isError_messages,
        error: error_messages,
    } = useGetMessagesQuery(
        { page: 1, size: 1000, receiveId: id || '', accountId: Number(myId) },
        { skip: myId === null || id === undefined }
    );
    useEffect(() => {
        if (isError_messages && error_messages) {
            console.error(error_messages);
            // dispatch(
            //     setData_toastMessage({
            //         type: messageType_enum.SUCCESS,
            //         message: 'Lấy dữ liệu KHÔNG thành công !',
            //     })
            // );
        }
    }, [isError_messages, error_messages]);
    useEffect(() => {
        // setIsLoading(isLoading_medication);
    }, [isLoading_messages]);
    useEffect(() => {
        const resData = data_messages;
        if (resData?.isSuccess && resData.data) {
            const mes = resData.data.items;
            setMessages((prev) => mes.concat(prev));
        }
    }, [data_messages]);

    useEffect(() => {
        // loadMore();
    }, []);

    useEffect(() => {
        if (!myId) return;
        if (!id) return;
        const myRoom = myId + id;

        // Kết nối server
        socket = io(SOCKET_URL || '');
        // socket = io('wss://socketapp.5kaquarium.com', {
        //     path: '/socket.io/',
        // });

        socket.on('connect', () => {
            console.log('Connected:', socket.id);
        });

        // Nhận message từ server
        socket.on('roomMessage', (message: any) => {
            // setMessages((prev) => [...prev, data]);
            const mes = JSON.parse(message) as MessageZaloField;
            const data = mes.data as HookDataField;
            const event_name = data.event_name;
            switch (event_name) {
                case zalo_event_name_enum.user_send_text: {
                    const hookData: HookDataField<ZaloMessage> = {
                        app_id: '',
                        user_id_by_app: '',
                        event_name: zalo_event_name_enum.user_send_text,
                        sender: {
                            id: myId,
                        },
                        recipient: {
                            id: id,
                        },
                        message: data.message,
                        timestamp: '',
                    };
                    const newMessage: MessageField = {
                        id: -1,
                        eventName: zalo_event_name_enum.user_send_text,
                        sender: sender_enum.CUSTOMER,
                        receiveId: myId,
                        message: JSON.stringify(hookData),
                        type: messageType_enum.TEXT,
                        timestamp: data.timestamp,
                        messageStatus: messageStatus_enum.SENT,
                        status: 'normal',
                        accountId: Number(myId),
                        updateTime: '',
                        createTime: '',
                    };
                    setMessages((prev) => [newMessage, ...prev]);
                    break;
                }
                case zalo_event_name_enum.user_send_image: {
                    const hookData: HookDataField<ZaloMessage> = {
                        app_id: '',
                        user_id_by_app: '',
                        event_name: zalo_event_name_enum.user_send_image,
                        sender: {
                            id: myId,
                        },
                        recipient: {
                            id: id,
                        },
                        message: data.message,
                        timestamp: '',
                    };
                    const newMessage: MessageField = {
                        id: -1,
                        eventName: zalo_event_name_enum.user_send_image,
                        sender: sender_enum.CUSTOMER,
                        receiveId: myId,
                        message: JSON.stringify(hookData),
                        type: messageType_enum.IMAGES,
                        timestamp: data.timestamp,
                        messageStatus: messageStatus_enum.SENT,
                        status: 'normal',
                        accountId: Number(myId),
                        updateTime: '',
                        createTime: '',
                    };
                    setMessages((prev) => [newMessage, ...prev]);
                    break;
                }
                case zalo_event_name_enum.user_send_video: {
                    const hookData: HookDataField<ZaloMessage> = {
                        app_id: '',
                        user_id_by_app: '',
                        event_name: zalo_event_name_enum.user_send_video,
                        sender: {
                            id: myId,
                        },
                        recipient: {
                            id: id,
                        },
                        message: data.message,
                        timestamp: '',
                    };
                    const newMessage: MessageField = {
                        id: -1,
                        eventName: zalo_event_name_enum.user_send_video,
                        sender: sender_enum.CUSTOMER,
                        receiveId: myId,
                        message: JSON.stringify(hookData),
                        type: messageType_enum.VIDEOS,
                        timestamp: data.timestamp,
                        messageStatus: messageStatus_enum.SENT,
                        status: 'normal',
                        accountId: Number(myId),
                        updateTime: '',
                        createTime: '',
                    };
                    setMessages((prev) => [newMessage, ...prev]);
                    break;
                }
                default: {
                    //statements;
                    break;
                }
            }
        });

        console.log('myRoom', myRoom);
        socket.emit('joinRoom', myRoom);

        // socket.emit('roomMessage', { roomName: myId, message: 'client hello' });

        return () => {
            socket.emit('leaveRoom', myId);
            socket.disconnect();
        };
    }, [myId, id]);

    const handleScroll = () => {
        const contentContainerElement = contentContainer_element.current;
        if (!contentContainerElement) return;

        const scrollTop = contentContainerElement.scrollTop;
        const scrollHeight = contentContainerElement.scrollHeight;
        const clientHeight = contentContainerElement.clientHeight;

        if (-1 * scrollTop + clientHeight > scrollHeight - 200) {
            // loadMore();
        }
    };

    const loadMore = async () => {
        if (!hasMore) return;

        const contentContainerElement = contentContainer_element.current;
        const oldScrollHeight = contentContainerElement?.scrollHeight ?? 0;

        // setData((prev) => [index_mes + 1, ...prev]);
        set_index_mes((prev) => prev + 1);

        // GIỮ NGUYÊN CHỖ ĐANG ĐỌC SAU KHI THÊM TIN
        requestAnimationFrame(() => {
            if (contentContainerElement) {
                const newScrollHeight = contentContainerElement.scrollHeight;
                contentContainerElement.scrollTop = newScrollHeight - oldScrollHeight;
            }
        });
    };

    const handleNewMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewMessage(value);
    };

    const handleSend = async () => {
        const imageUrls: MessageImageUrlField[] | undefined = await handlePreImages();
        if (imageUrls) {
            for (let i: number = 0; i < imageUrls.length; i++) {
                const imageUrls1 = [imageUrls[i]];
                const messageImages: MessageImageField | undefined = imageUrls
                    ? {
                          text: '',
                          attachment: {
                              type: 'template',
                              payload: {
                                  template_type: 'media',
                                  elements: imageUrls1,
                              },
                          },
                      }
                    : undefined;
                handleSendCommon(messageImages, messageType_enum.IMAGES);
            }
        }

        const resPreVideos = await handlePreVideos();
        if (resPreVideos) {
            for (let i: number = 0; i < resPreVideos.videoUrls.length; i++) {
                const videoUrls = [resPreVideos.videoUrls[i]];
                const pathUrls = [resPreVideos.pathUrls[i]];
                const messageVideos: MessageImageField | undefined = resPreVideos
                    ? {
                          text: pathUrls[0],
                          attachment: {
                              type: 'template',
                              payload: {
                                  template_type: 'media',
                                  elements: videoUrls,
                              },
                          },
                      }
                    : undefined;
                handleSendCommon(messageVideos, messageType_enum.IMAGES);
            }
        }

        const newMes = newMessage.trim();
        if (newMes.length !== 0) {
            const messageText: MessageTextField = {
                text: newMes,
                msg_id: '',
            };
            handleSendCommon(messageText, messageType_enum.TEXT);
        }
    };

    const handleSendCommon = (message: ZaloMessage | undefined, messageType: messageType_type) => {
        if (!myId) return;
        if (!id) return;
        const myRoom = myId + id;
        const newMes = newMessage.trim();
        if (messageType === messageType_enum.TEXT && newMes.length === 0) return;
        if (message === undefined) return;
        const hookData: HookDataField<ZaloMessage> = {
            app_id: '',
            user_id_by_app: '',
            event_name: zalo_event_name_enum.member_sending,
            sender: {
                id: myId,
            },
            recipient: {
                id: id,
            },
            message: message,
            timestamp: '',
        };
        const createMessageBody: CreateMessageBodyField = {
            eventName: zalo_event_name_enum.member_sending,
            sender: sender_enum.MEMBER,
            senderId: myId,
            receiveId: id,
            type: messageType,
            message: JSON.stringify(hookData),
            timestamp: '',
            messageStatus: messageStatus_enum.SENDING,
            accountId: -1,
        };
        // console.log('handleSendCommon', createMessageBody);
        createMessage(createMessageBody)
            .then((res) => {
                const resData = res.data;
                console.log('createMessage', resData);
                if (resData?.isSuccess && resData.data) {
                    const newData: MessageField = resData.data;
                    setMessages((prev) => [...prev, newData]);
                    socket.emit('roomMessage', { roomName: myRoom, message: JSON.stringify(resData.data) });
                }
            })
            .catch((err) => console.error(err));
    };

    const handleIconClick = () => {
        input_element.current?.click();
    };

    const handleFolderChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const files = event.target.files;

            if (files) {
                const images: File[] = [];
                const videos: File[] = [];
                Array.from(files).forEach((file) => {
                    if (file.type.startsWith('image/')) {
                        images.push(file);
                    } else if (file.type.startsWith('video/')) {
                        videos.push(file);
                    }
                });

                setLocalImages(images);
                setLocalVideos(videos);
            }
        },
        [setLocalImages, setLocalVideos]
    );

    const handleUploadMultipleImages = async (files: File[]): Promise<MyResponse<AImageFileField[]> | null> => {
        if (!files || files.length === 0) return null;

        const formData = new FormData();
        files.forEach((file) => {
            formData.append('images', file); // 👈 key này phải trùng với backend
        });

        try {
            const res = await axiosInstance.post<MyResponse<AImageFileField[]>>(
                IMAGE_API.UPLOAD_MULTIPLE_IMAGE, // hoặc vẫn là UPLOAD_AIMAGE nếu backend tự detect
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
                        console.log(`Đang tải lên: ${percent}%`);
                    },
                }
            );
            // console.log('handleUploadMultipleImages', res.data);
            return res.data;
        } catch (error) {
            console.error('Upload thất bại:', error);
            dispatch(
                setData_toastMessage({
                    type: toastMessageType_enum.ERROR,
                    message: 'Đăng tải hình ảnh thất bại !',
                })
            );
            return null;
        }
    };

    const handleUploadMultipleVideos = async (files: File[]): Promise<MyResponse<AVideoFileField[]> | null> => {
        if (!files || files.length === 0) return null;

        const formData = new FormData();
        files.forEach((file) => {
            formData.append('videos', file); // 👈 key này phải trùng với backend
        });

        try {
            const res = await axiosInstance.post<MyResponse<AVideoFileField[]>>(VIDEO_API.UPLOAD_MUL_VIDEOS, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
                    console.log(`Đang tải lên: ${percent}%`);
                },
            });
            return res.data;
        } catch (error) {
            console.error('Upload thất bại:', error);
            // dispatch(
            //     setData_toastMessage({
            //         type: messageType_enum.ERROR,
            //         message: 'Đăng tải hình ảnh thất bại !',
            //     })
            // );
            return null;
        }
    };

    const handlePreImages = async () => {
        const resData_images = await handleUploadMultipleImages(localImages);
        if (resData_images === null) return;
        const imageFiles = resData_images.data;
        if (!imageFiles) {
            dispatch(
                setData_toastMessage({
                    type: toastMessageType_enum.ERROR,
                    message: 'Đăng tải những hình ảnh thất bại !',
                })
            );
            return;
        }
        const imageUrls: MessageImageUrlField[] = [];
        for (let i: number = 0; i < imageFiles.length; i++) {
            const url = `${BASE_URL}${apiString}/service_image/store/${imageFiles[i].filename}`;
            const aImage: MessageImageUrlField = {
                media_type: 'image',
                url: url,
            };
            imageUrls.push(aImage);
        }

        return imageUrls;
    };

    const handlePreVideos = async () => {
        const resData_videos = await handleUploadMultipleVideos(localVideos);
        if (resData_videos === null) return;
        const videoFiles = resData_videos.data;
        if (!videoFiles) {
            dispatch(
                setData_toastMessage({
                    type: toastMessageType_enum.ERROR,
                    message: 'Đăng tải những thước phim thất bại !',
                })
            );
            return;
        }
        const videoUrls: MessageImageUrlField[] = [];
        const pathUrls: string[] = [];
        for (let i: number = 0; i < videoFiles.length; i++) {
            const imageUrl = `${BASE_URL}${apiString}/service_image/store/${videoFiles[i].savedName}.jpg`;
            const url = `${BASE_URL}${apiString}/service_video/query/streamVideo?id=${videoFiles[i].savedName}`;
            const aImage: MessageImageUrlField = {
                media_type: 'image',
                url: imageUrl,
            };
            videoUrls.push(aImage);
            pathUrls.push(url);
        }

        return { videoUrls: videoUrls, pathUrls: pathUrls };
    };

    const handleDeleteImage = (data: File) => {
        const newImages = localImages.filter((image) => image !== data);
        setLocalImages(newImages);
    };

    const handleDeleteVideo = (data: File) => {
        const newVideos = localVideos.filter((video) => video !== data);
        setLocalVideos(newVideos);
    };

    const list_image = localImages.map((data, index) => {
        return <MyImageInput key={index} index={index} data={data} onClose={() => handleDeleteImage(data)} />;
    });

    const list_video = localVideos.map((data, index) => {
        return <MyVideoInput key={index} index={index} data={data} onClose={() => handleDeleteVideo(data)} />;
    });

    const list_mes = messages.map((item, index) => {
        const sender = item.sender;
        if (sender === sender_enum.MEMBER) {
            return <MyMessage key={index} data={item} />;
        }
        if (sender === sender_enum.CUSTOMER) {
            return <YourMessage key={index} data={item} />;
        }
    });

    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.header}>{`${MESSAGE} - ${zaloCustomer?.data.display_name}`}</div>
                <div className={style.contentContainer} ref={contentContainer_element} onScroll={handleScroll}>
                    {list_mes}
                </div>
                <div className={style.iconContainer}>
                    <FaImage id={id_folderInput} onClick={handleIconClick} />
                    <input ref={input_element} onChange={handleFolderChange} type="file" id={id_folderInput} multiple />
                </div>
                <div className={style.photoContainer}>
                    <div>{list_image}</div>
                    <div>{list_video}</div>
                </div>
                <div className={style.inputContainer}>
                    <input value={newMessage} onChange={(e) => handleNewMessageChange(e)} placeholder="Viết tin nhắn" />
                    <IoMdSend onClick={() => handleSend()} size={30} color="blue" />
                </div>
                <div>
                    <MyToastMessage />
                </div>
            </div>
        </div>
    );
};

export default Message;
