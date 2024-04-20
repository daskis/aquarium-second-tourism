import {createBrowserRouter} from 'react-router-dom';
import {Navbar, Toolbar} from "@widgets/ui";
import {HotelsPage, LoginPage, MainPage, PlacePage, ProfilePage, RegisterPage, ToursPage} from "@pages/ui";

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
                path: 'places',
                element: <>
                    <Navbar/>
                    <Toolbar/>
                </>,
                children: [
                    {
                        index: true,
                        element: <PlacePage/>,
                    }
                ],
            },
            {
                path: "hotels",
                element: <>
                    <Navbar/>
                    <Toolbar/>
                </>,
                children: [
                    {
                        index: true,
                        element: <HotelsPage/>,
                    }
                ],
            },
            {
                path: "tours",
                element: <>
                    <Navbar/>
                    <Toolbar/>
                </>,
                children: [
                    {
                        index: true,
                        element: <ToursPage/>,
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