import cls from "./ProfileBonus.module.scss"
import {DribbbleSquareOutlined, RightOutlined} from "@ant-design/icons";
import {Tag, Typography} from "antd";

export const ProfileBonus = () => {
    return (
        <div className={cls.wrapper}>
            <div className={cls.heading}>
                <Typography.Title level={3} style={{color: "#eee"}}>
                    Бонусы
                </Typography.Title>
                <button className={cls.moreBonuses}>
                    <Typography.Text style={{color: "#eee"}}>
                        Все бонусы
                    </Typography.Text>
                </button>
            </div>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    <DribbbleSquareOutlined/>
                    <Typography.Text>
                        Бонус
                    </Typography.Text>
                    <Typography.Text className={cls.tag} color="blue">Получен</Typography.Text>
                </li>
            </ul>
        </div>
    );
};

