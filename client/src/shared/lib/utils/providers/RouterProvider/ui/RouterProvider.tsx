import {createBrowserRouter} from 'react-router-dom';
import {Navbar, Toolbar} from "@widgets/ui";
import {LoginPage, MainPage, ProfilePage, RegisterPage} from "@pages/ui";

export const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                path: 'home',
                element: <>
                    <Navbar/>
                    <Toolbar/>
                </>,
                children: [
                    {
                        index: true,
                        element: <MainPage/>,
                    }
                ],
            },
            {
                path: "user",
                element: <Toolbar/>,
                children: [
                    {
                        index: true,
                        element: <ProfilePage/>
                    }
                ]
            },
            {
                path: "auth",
                children: [
                    {
                        path: "login",
                        element: <LoginPage/>
                    },
                    {
                        path: "register",
                        element: <RegisterPage/>
                    }
                ]
            }
        ]
    }
]);