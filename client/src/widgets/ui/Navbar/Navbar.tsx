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
                <div className={cls.coins}>
                    <Coin/>
                    <Typography.Text>
                        23
                    </Typography.Text>
                </div>
                <Link to="/user" className={cls.avatar}>
                    <UserOutlined/>
                </Link>
            </div>
        </>
    );
};

