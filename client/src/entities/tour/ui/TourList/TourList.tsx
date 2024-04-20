import cls from "./TourList.module.scss"
import {Typography} from "antd";
import {Swiper, SwiperSlide} from "swiper/react";
import {TourCard} from "@entities/tour/ui";
import {ITourCard} from "@entities/tour/lib";
import {Link} from "react-router-dom";

export const TourList = () => {
    const list: ITourCard[] = [
        {
            id: 1,
            img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/0d/34/bd/hotel-presidente-4s.jpg?w=1200&h=-1&s=1",
            rating: 4.5,
            reviews: 1000,
            type: "Отель",
            title: "Городская кухня"
        },
        {
            id: 2,
            img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/1a/ea/54/hotel-presidente-4s.jpg?w=1200&h=-1&s=1",
            rating: 4.4,
            reviews: 200,
            type: "Гостиница",
            title: "Городская столовая"
        }
    ]
    return (
        <div className={cls.wrapper}>
            <div className={cls.info}>
                <Typography.Title level={2} className={cls.title}>Туры</Typography.Title>
                <Link to={"/tours"}>
                    <Typography.Link className={cls.link}>
                        Все
                    </Typography.Link>
                </Link>
            </div>
            <Swiper
                slidesPerView="auto"
                spaceBetween={25}
            >
                {list.map((item, i) => (
                    <SwiperSlide key={item.img}>
                        <TourCard title={item.title} rating={item.rating} reviews={item.reviews} type={item.type}
                                  img={item.img}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

