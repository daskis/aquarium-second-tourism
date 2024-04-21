import cls from "./FavoritesPage.module.scss"
import {Typography} from "antd";
import Filters from "@assets/icons/filter.svg";
import {useGetPlaces} from "@entities/place/lib/hooks";
import {Favorite} from "@entities/favorite/ui";
import {Swiper, SwiperSlide} from "swiper/react";
import Museum from "@assets/img/museum.jpg"
import Parks from "@assets/img/parks.jpg"
import Kino from "@assets/img/kino.jpg"

export const FavoritesPage = () => {
    const list = [
        {
            img: Museum,
            name: "Музей"
        },
        {
            img: Parks,
            name: "Парки"
        },
        {
            img: Kino,
            name: "Кинотеатры"
        },

    ]
    const {data} = useGetPlaces()
    return (
        <div className={cls.wrapper}>
            <Typography.Title level={2} className={cls.title}>Категории</Typography.Title>
            <Swiper spaceBetween={20} slidesPerView={"auto"} className={cls.categories}>
                {list.map((item, i) => (
                    <SwiperSlide className={cls.category}>
                        <img src={item.img} alt=""/>
                        <Typography.Title level={4} className={cls.categoryTitle}>{item.name}</Typography.Title>
                    </SwiperSlide>
                ))}
            </Swiper>


            <div className={cls.heading}>
                <Typography.Title level={2} className={cls.title}>Вам понравилось</Typography.Title>
                <Filters/>
            </div>
            {data && data.map((item, index) => (
                <Favorite key={item.id} {...item}/>
            ))}
        </div>
    );
};

