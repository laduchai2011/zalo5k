import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from '@src/screen/Signup';
import Signin from '@src/screen/Signin';
import Signout from '@src/screen/Signout';
import Home from '@src/screen/Home';
import Message from '@src/screen/Message';
import NotFoundPage from '@src/screen/NotFoundPage';
import { route_enum } from './type';

const router = createBrowserRouter(
    [
        { path: route_enum.SIGNUP, element: <Signup /> },
        { path: route_enum.SIGNIN, element: <Signin /> },
        { path: route_enum.SIGNOUT, element: <Signout /> },
        { path: route_enum.HOME, element: <Home /> },
        { path: route_enum.MESSAGE, element: <Message /> },
        { path: '*', element: <NotFoundPage /> }, // Trang 404
    ],
    {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        future: { v7_startTransition: true } as any,
    }
);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
