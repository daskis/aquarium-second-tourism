import cls from "./BonusCard.module.scss"
import {Typography} from "antd";
import {IBonusCard} from "@entities/bonus/lib";
import {classNames} from "@shared/lib";


export const BonusCard = ({img, title, price, text, color}: IBonusCard) => {
    return (
        <div style={{backgroundColor: color}} className={cls.wrapper}>
            <img src={img} alt=""/>
            <Typography.Text className={cls.title}>{title}</Typography.Text>
            <Typography.Text className={cls.text}>{text}°</Typography.Text>
            <Typography.Text className={cls.price}>{price}</Typography.Text>
        </div>
    );
};

