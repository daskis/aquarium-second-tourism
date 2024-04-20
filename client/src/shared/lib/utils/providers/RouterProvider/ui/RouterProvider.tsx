import {createBrowserRouter} from 'react-router-dom';
import {Navbar, Toolbar} from "@widgets/ui";
import {
    BeachesPage,
    HotelsPage,
    InterestingPage,
    LoginPage,
    MainPage, ParksPage,
    PlacePage,
    ProfilePage,
    RegisterPage,
    ToursPage
} from "@pages/ui";

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
                path: "beaches",
                element: <>
                    <Navbar/>
                    <Toolbar/>
                </>,
                children: [
                    {
                        index: true,
                        element: <BeachesPage/>,
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
                path: "interesting",
                element: <>
                    <Navbar/>
                    <Toolbar/>
                </>,
                children: [
                    {
                        index: true,
                        element: <InterestingPage/>,
                    }
                ],
            },
            {
                path: "parks",
                element: <>
                    <Navbar/>
                    <Toolbar/>
                </>,
                children: [
                    {
                        index: true,
                        element: <ParksPage/>,
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