import cls from "./TourCard.module.scss"
import {Typography} from "antd";
import {ITourCard} from "@entities/tour/lib";

export const TourCard = ({img, rating, reviews, type, title, id}: ITourCard) => {
    return (
        <div className={cls.wrapper}>
            <img src={img} className={cls.image} alt=""/>
            <Typography.Title level={4} className={cls.title}>{title}</Typography.Title>
            <div className={cls.info}>
                <Typography.Text className={cls.rating}> {rating}</Typography.Text>
                <Typography.Text className={cls.reviews}>{reviews} · </Typography.Text>
                <Typography.Text className={cls.type}>{type}</Typography.Text>
            </div>
        </div>
    );
};

