import cls from "./PlaceItem.module.scss"
import {IPlace} from "@entities/place/lib";
import {Typography} from "antd"
import {DislikeOutlined, LikeOutlined} from "@ant-design/icons";
import Bookmark from "@assets/icons/bookmark.svg"
import Location from "@assets/icons/location.svg"
import Star from "@assets/icons/star.svg"

export const PlaceItem = ({img, place, name, rating, description}: IPlace) => {

    return (
        <div className={cls.wrapper}>
            <img className={cls.image} src={img} alt=""/>
            <div className={cls.info}>
                <div className={cls.heading}>
                    <div className={cls.headingInfo}>
                        <Typography.Title level={4} className={cls.title}>{name}</Typography.Title>
                        <LikeOutlined/>
                        <DislikeOutlined/>
                        <Bookmark/>
                    </div>
                    <div className={cls.place}>
                        <Location/>
                        <Typography.Text className={cls.placeName}>{place}</Typography.Text>
                    </div>
                </div>
                <div className={cls.rating}>
                    <Star/>
                    <Typography.Text className={cls.ratingText}>{rating}</Typography.Text>
                </div>
                <Typography.Text className={cls.description}>{description}</Typography.Text>


                <div className={cls.panorama}>
                    <img src={img} className={cls.panorama} alt=""/>
                    <Typography.Title level={4} className={cls.panoramaTitle}>Панорама</Typography.Title>
                </div>
            </div>
        </div>
    );
};

