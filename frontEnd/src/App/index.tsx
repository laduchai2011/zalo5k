import { useEffect } from 'react';
import AppRouter from '@src/router';
import axiosInstance from '@src/api/axiosInstance';
import { MyResponse } from '@src/dataStruct/response';

const App = () => {
    useEffect(() => {
        const myId = sessionStorage.getItem('myId');

        if (myId === null) {
            const fetchCheckSignin = async () => {
                try {
                    const response = await axiosInstance.get<MyResponse<number>>(`/service_account/query/isSignin`);
                    const resData = response.data;
                    if (resData.isSuccess) {
                        if (resData.data) {
                            sessionStorage.setItem('myId', `${resData.data}`);
                        } else {
                            sessionStorage.removeItem('myId');
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            };

            fetchCheckSignin();
        }
    }, []);

    return (
        <div>
            <AppRouter />
        </div>
    );
};

export default App;
