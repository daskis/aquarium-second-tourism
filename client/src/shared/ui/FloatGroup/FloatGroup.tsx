import cls from "./FloatGroup.module.scss"
import {FloatButton} from "antd";
import {ArrowLeftOutlined, MenuOutlined, MoonOutlined, SunOutlined} from "@ant-design/icons";
import {Theme, useTheme} from "@shared/lib";

export const FloatGroup = () => {
    const {theme, toggleTheme} = useTheme()
    return (
        <FloatButton.Group
            icon={<MenuOutlined/>}
            className={cls.back}
            trigger="click"
        >

            <FloatButton icon={<ArrowLeftOutlined/>}/>
            <FloatButton onClick={() => {
                toggleTheme()
            }} icon={theme === Theme.LIGHT ? <SunOutlined/> : <MoonOutlined />}/>
        </FloatButton.Group>
    );
};

