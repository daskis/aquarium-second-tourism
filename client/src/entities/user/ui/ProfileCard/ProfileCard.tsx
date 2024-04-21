import cls from "./ProfileCard.module.scss"
import {Progress, Typography} from "antd";
import UserIcon from "@assets/icons/userIcon.svg"
import {InfoCircleOutlined} from "@ant-design/icons";
export const ProfileCard = () => {
    return (
        <div className={cls.wrapper}>
            <div className={cls.level}>
                <Typography.Title level={2}>
                    Новичок
                </Typography.Title>
                <div className={cls.avatar}>
                    <UserIcon/>
                </div>
                <div className={cls.progressWrapper}>
                    <div className={cls.scope}>
                        <Typography.Title level={2}>
                            <InfoCircleOutlined/> 40
                        </Typography.Title>
                        <Typography.Title level={2}>
                            <InfoCircleOutlined/> 100
                        </Typography.Title>
                    </div>
                    <div className={cls.text}>
                        <Typography.Text>
                            Текущий баланс
                        </Typography.Text>
                        <Typography.Text>
                            Следующий уровень
                        </Typography.Text>
                    </div>
                    <Progress className={cls.progress} trailColor={"#fff"} strokeColor={"var(--progress)"}
                              percent={30}
                              size="small"/>
                </div>

            </div>
        </div>
    );
};

