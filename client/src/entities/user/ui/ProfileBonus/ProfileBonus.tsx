import cls from "./ProfileBonus.module.scss"
import {Tag, Typography} from "antd";
import Scooter from "@assets/icons/scooter.svg"
import Bed from "@assets/icons/bed.svg"
import {Swiper, SwiperSlide} from "swiper/react";

export const ProfileBonus = () => {
    const list = [
        {
            icon: <Scooter/>,
            text: "Аренда самокатов 1",
            status: true
        },
        {
            icon: <Bed/>,
            text: "Скидки на аренду отелей 1",
            status: false
        },
        {
            icon: <Scooter/>,
            text: "Аренда самокатов 2",
            status: true
        },
        {
            icon: <Bed/>,
            text: "Скидки на аренду отелей 2",
            status: false
        },

    ]
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
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={30}
                className={cls.list}>
                {list.map((item, i) => (
                    <SwiperSlide className={cls.listItem} key={item.icon}>

                        {item.icon}
                        <Typography.Text className={cls.text}>
                            {item.text}
                        </Typography.Text>
                        <Typography.Text className={cls.tag}
                                         color="blue">{item.status ? "Получен" : "Получить"}</Typography.Text>
                    </SwiperSlide>
                ))}

            </Swiper>

        </div>
    );
};

