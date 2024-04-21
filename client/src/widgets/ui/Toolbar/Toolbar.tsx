import cls from "./Toolbar.module.scss"
import {useMemo, useState} from "react";
import {Tooltip, Typography} from "antd";
import {Link, Outlet, useLocation} from "react-router-dom";
import {FloatGroup} from "@shared/ui";
import Home from "@assets/icons/home.svg"
import Places from "@assets/icons/places.svg"
import Notification from "@assets/icons/notification.svg"
import Favourites from "@assets/icons/favourites.svg"
import {WechatOutlined, WechatWorkOutlined} from "@ant-design/icons";
import {classNames} from "@shared/lib";

export const Toolbar = () => {
    const [arrow, setArrow] = useState('Show');
    const {pathname} = useLocation()
    console.log(pathname)
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
            text: "Чат",
            path: import.meta.env.VITE_CHAT_URL,
            icon: <WechatOutlined/>
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
                        <li className={classNames(cls.listItem, {
                            [cls.active]: pathname === item.path
                        }, [])} key={item.path}>
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

