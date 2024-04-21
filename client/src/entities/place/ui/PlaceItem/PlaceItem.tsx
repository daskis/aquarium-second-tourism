import cls from "./PlaceItem.module.scss"
import {IPlace} from "@entities/place/lib";
import {Typography} from "antd"
import {DislikeOutlined, LikeOutlined} from "@ant-design/icons";
import Bookmark from "@assets/icons/bookmark.svg"
import Location from "@assets/icons/location.svg"
import Star from "@assets/icons/star.svg"
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper/modules";

export const PlaceItem = ({img, place, name, rating, description}: IPlace) => {

    return (
        <div className={cls.wrapper}>
            <Swiper
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[
                    Pagination,
                    Navigation,
                    Autoplay
                ]}
                slidesPerView={1}
                className={cls.swiper}>
                {img.map((item, i) => (
                    <SwiperSlide className={cls.swiperSlide} key={item}>
                        <img className={cls.image} src={`${import.meta.env.VITE_SERVER_URL}${item}`} alt=""/>
                    </SwiperSlide>
                ))}
            </Swiper>
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
                    <img src={`${import.meta.env.VITE_SERVER_URL}${img[0]}`} className={cls.panorama} alt=""/>
                    <Typography.Title level={4} className={cls.panoramaTitle}>Панорама</Typography.Title>
                </div>
            </div>
        </div>
    );
};

