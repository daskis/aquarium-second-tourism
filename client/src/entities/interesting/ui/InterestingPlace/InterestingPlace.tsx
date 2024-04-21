import cls from "./InterestingPlace.module.scss"
import {IHotelCard} from "@entities/hotel/lib";
import {Rate, Typography} from "antd";
import {HeartOutlined} from "@ant-design/icons";

export const InterestingPlace = ({img_url, rating, type, reviews, id, name}: IHotelCard) => {
    return (
        <div className={cls.wrapper}>
            <img className={cls.image} src={`${import.meta.env.VITE_SERVER_URL}${img_url[0]}`} alt=""/>
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
                <ul className={cls.tags}>
                    <li className={cls.tagsItem}>
                        <Typography.Text>{type}</Typography.Text>
                    </li>
                </ul>
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

