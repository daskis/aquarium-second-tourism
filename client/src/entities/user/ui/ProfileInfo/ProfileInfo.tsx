import cls from "./ProfileInfo.module.scss"
import {RightOutlined} from "@ant-design/icons";
import {Typography} from "antd";

export const ProfileInfo = () => {
    return (
        <div className={cls.wrapper}>
            <div className={cls.avatar}>
            </div>
            <Typography.Title className={cls.name} level={3}>Ромчик</Typography.Title>
            <div className={cls.button}>
                <Typography.Title level={5}>Ваши данные</Typography.Title>
                <RightOutlined/>
            </div>
        </div>
    );
};

