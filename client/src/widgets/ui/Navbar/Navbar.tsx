import cls from "./Navbar.module.scss"
import {Input, Typography} from "antd";
import {CloseOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";
import Coin from "@assets/icons/coin.svg";
import {Link} from "react-router-dom";

export const Navbar = () => {
    return (
        <>
            <div className={cls.wrapper}>
                <Input
                    placeholder="Поиск"
                    rootClassName={cls.input} size="large" prefix={<SearchOutlined/>} suffix={<CloseOutlined/>}/>
                <Link to="/profile" className={cls.coins}>
                    <Coin/>
                    <Typography.Text>
                        40
                    </Typography.Text>
                </Link>
                <Link to="/user" className={cls.avatar}>
                    <UserOutlined/>
                </Link>
            </div>
        </>
    );
};

