import cls from "./Navbar.module.scss"
import {Input, Typography} from "antd";
import {Outlet} from "react-router-dom";
import {CloseOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";
import Coin from "@assets/icons/coin.svg";

export const Navbar = () => {
    return (
        <>
            <div className={cls.wrapper}>
                <Input
                    placeholder="Поиск"
                    rootClassName={cls.input} size="large" prefix={<SearchOutlined/>} suffix={<CloseOutlined/>}/>
                <div className={cls.coins}>
                    <Coin/>
                    <Typography.Text>
                        23
                    </Typography.Text>
                </div>
                <div className={cls.avatar}>
                    <UserOutlined/>
                </div>
            </div>
        </>
    );
};

