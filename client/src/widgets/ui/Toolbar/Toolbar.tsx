import cls from "./Toolbar.module.scss"
import {CloseCircleOutlined, CommentOutlined, HomeOutlined, UserOutlined} from "@ant-design/icons";
import {useMemo, useState} from "react";
import {Tooltip} from "antd";
import {Link, Outlet} from "react-router-dom";
import {FloatGroup} from "@shared/ui";

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
            text: "Home",
            path: "/home",
            icon: <HomeOutlined/>
        },
        {
            text: "Home",
            path: "/map",
            icon: <CloseCircleOutlined/>
        },
        {
            text: "Тиндер ебучий",
            path: "/tinder",
            icon: <CommentOutlined/>
        },
        {
            text: "Home",
            path: "/user",
            icon: <UserOutlined/>
        }
    ]

    return (
        <>
            <Outlet/>
            <FloatGroup/>
            <div className={cls.wrapper}>
                <ul className={cls.list}>
                    {list.map((item, index) => (
                        <li key={item.path}>
                            <Tooltip placement="topLeft" title={item.text} arrow={mergedArrow}>
                                <Link to={item.path}>
                                    {item.icon}
                                </Link>
                            </Tooltip>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

