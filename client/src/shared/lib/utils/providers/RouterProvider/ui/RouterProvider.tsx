import {createBrowserRouter} from 'react-router-dom';
import {Navbar, Toolbar} from "@widgets/ui";
import {
    BeachesPage, FavoritesPage,
    HotelsPage,
    InterestingPage,
    LoginPage,
    MainPage, OffersPage, ParksPage,
    PlacePage,
    ProfilePage,
    RegisterPage,
    ToursPage, UserPage
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
                path: 'favourites',
                element: <>
                    <Navbar/>
                    <Toolbar/>
                </>,
                children: [
                    {
                        index: true,
                        element: <FavoritesPage/>,
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
                path: "offers",
                element: <>
                    <Navbar/>
                    <Toolbar/>
                </>,
                children: [
                    {
                        index: true,
                        element: <OffersPage/>,
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
                path: "profile",
                element: <Toolbar/>,
                children: [
                    {
                        index: true,
                        element: <ProfilePage/>
                    }
                ]
            },
            {
                path: "user",
                element: <Toolbar/>,
                children: [
                    {
                        index: true,
                        element: <UserPage/>
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