import cls from "./Favorite.module.scss"
import {IHotelCard} from "@entities/hotel/lib";
import {Rate, Typography} from "antd";
import {HeartOutlined} from "@ant-design/icons";

export const Favorite = ({img, rating, type, reviews, id, name}: IHotelCard) => {
    return (
        <div className={cls.wrapper}>
            <img className={cls.image} src={`${import.meta.env.VITE_SERVER_URL}${img[0]}`} alt=""/>
            <div className={cls.info}>
                <div className={cls.heading}>
                    <Typography.Title className={cls.title} level={3}>{name}</Typography.Title>
                    <HeartOutlined/>
                </div>
                <Typography.Text className={cls.place}>
                    Геленджик, Дивноморское
                </Typography.Text>
                <div className={cls.rating}>
                    <Rate allowHalf disabled defaultValue={rating}/>
                    <Typography.Text className={cls.ratingText}>{rating}</Typography.Text>
                </div>
                <div className={cls.button}>
                    <button className={cls.buttonMore}>
                        <Typography.Text>
                            Подробнее
                        </Typography.Text>
                    </button>
                    <button className={cls.buttonSimilar}>
                        <Typography.Text>
                            Найти похожие
                        </Typography.Text>
                    </button>
                </div>
            </div>
        </div>
    );
};

