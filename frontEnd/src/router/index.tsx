import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from '@src/screen/Signup';
import Signin from '@src/screen/Signin';
import Signout from '@src/screen/Signout';
import Home from '@src/screen/Home';
import Message from '@src/screen/Message';
import Members from '@src/screen/Members';
import Note from '@src/screen/Note';
import Profile from '@src/screen/Profile';
import MemberReceiveMessage from '@src/screen/MemberReceiveMessage';
import ManageMembers from '@src/screen/ManageMembers';
import NotFoundPage from '@src/screen/NotFoundPage';
import Oa from '@src/screen/Oa';
import OaSetting from '@src/screen/OaSetting';
import { route_enum } from './type';

const router = createBrowserRouter(
    [
        { path: route_enum.SIGNUP, element: <Signup /> },
        { path: route_enum.SIGNIN, element: <Signin /> },
        { path: route_enum.SIGNOUT, element: <Signout /> },
        { path: route_enum.HOME, element: <Home /> },
        { path: route_enum.MESSAGE + '/:id', element: <Message /> },
        { path: route_enum.MEMBERS, element: <Members /> },
        { path: route_enum.NOTE, element: <Note /> },
        { path: route_enum.PROFILE, element: <Profile /> },
        { path: route_enum.MEMBER_RECEIVE_MESSAGE, element: <MemberReceiveMessage /> },
        { path: route_enum.MANAGE_MEMBERS, element: <ManageMembers /> },
        { path: route_enum.OA, element: <Oa /> },
        { path: route_enum.OA_SETTING, element: <OaSetting /> },
        { path: '*', element: <NotFoundPage /> }, // Trang 404
    ],
    {
        future: { v7_startTransition: true } as any,
    }
);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
