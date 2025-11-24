import { configureStore } from '@reduxjs/toolkit';
// import CommentBoxReducer from '@src/redux/slice/CommentBox';
// import ExamineReducer from '@src/redux/slice/Examine';
// import MedicationReducer from '@src/redux/slice/Medication';
// import MedicationsReducer from '@src/redux/slice/Medications';
// import CreateMedicationReducer from '@src/redux/slice/CreateMedication';
// import DoctorsReducer from '@src/redux/slice/Doctors';
// import VideoPlayBoxReducer from '@src/redux/slice/VideoPlayBox';
import { accountRTK } from './query/accountRTK';
import { myCustomerRTK } from './query/myCustomerRTK';
import { messageRTK } from './query/messageRTK';
// import { shoppingCartRTK } from './query/shoppingCartRTK';

export const store = configureStore({
    reducer: {
        dummy: (state = {}) => state,
        // CommentBoxSlice: CommentBoxReducer,
        // ExamineSlice: ExamineReducer,
        // MedicationSlice: MedicationReducer,
        // MedicationsSlice: MedicationsReducer,
        // CreateMedicationSlice: CreateMedicationReducer,
        // DoctorsSlice: DoctorsReducer,
        // VideoPlayBoxSlice: VideoPlayBoxReducer,
        [accountRTK.reducerPath]: accountRTK.reducer,
        [myCustomerRTK.reducerPath]: myCustomerRTK.reducer,
        [messageRTK.reducerPath]: messageRTK.reducer,
        // [shoppingCartRTK.reducerPath]: shoppingCartRTK.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(accountRTK.middleware, myCustomerRTK.middleware, messageRTK.middleware),
});

// Type hỗ trợ
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
