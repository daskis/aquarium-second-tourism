import cls from "./ProfileTasks.module.scss"
import {Tag, Typography} from "antd";
import {BehanceSquareOutlined, ClockCircleOutlined, RightOutlined} from "@ant-design/icons";
import kotik from "@assets/img/kotik_b.jpg"
import Coin from "@assets/icons/coin.svg"

export const ProfileTasks = () => {
    return (
        <div className={cls.wrapper}>
            <div className={cls.heading}>
                <Typography.Title level={3} style={{color: "#eee", fontWeight: 700}}>
                    Задания
                </Typography.Title>
                <button className={cls.moreTasks}>
                    <Typography.Text style={{color: "#eee"}}>
                        Все задания
                    </Typography.Text>
                </button>
            </div>
            <div className={cls.task}>
                <img src={kotik} alt=""/>
                <div className={cls.taskInfo}>
                    <div className={cls.coins}>
                        <Coin/>
                        <Typography.Text>
                            23
                        </Typography.Text>
                    </div>
                    <div className={cls.time}>
                        <ClockCircleOutlined/>
                        <Typography.Text>
                            1 день 05:17:37
                        </Typography.Text>
                    </div>
                </div>
                <Typography.Title className={cls.name} level={4}>
                    Котик умер(
                </Typography.Title>
            </div>
        </div>
    );
};
