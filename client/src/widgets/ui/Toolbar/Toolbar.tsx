import cls from "./Toolbar.module.scss"
import {useMemo, useState} from "react";
import {Tooltip, Typography} from "antd";
import {Link, Outlet} from "react-router-dom";
import {FloatGroup} from "@shared/ui";
import Home from "@assets/icons/home.svg"
import Places from "@assets/icons/places.svg"
import Notification from "@assets/icons/notification.svg"
import Favourites from "@assets/icons/favourites.svg"

export const Toolbar = () => {
    const [arrow, setArrow] = useState('Show');

    const mergedArrow = useMemo(() => {
        if (arrow === 'Hide') {
            return false;
        }

        if (arrow === 'Show') {
            return true;
        }

        return {
            pointAtCenter: true,
        };
    }, [arrow]);
    const list = [
        {
            text: "Избранное",
            path: "/favourites",
            icon: <Favourites/>
        },
        {
            text: "Уведомления",
            path: "/notifications",
            icon: <Notification/>
        },
        {
            text: "Места",
            path: "/places",
            icon: <Places/>
        },
        {
            text: "Главная",
            path: "/home",
            icon: <Home/>
        },
    ]

    return (
        <>
            <Outlet/>
            <FloatGroup/>
            <div className={cls.wrapper}>
                <ul className={cls.list}>
                    {list.map((item, index) => (
                        <li key={item.path}>
                            <Link to={item.path}>
                                {item.icon}
                            </Link>
                            <Typography.Text className={cls.text}>{item.text}</Typography.Text>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

