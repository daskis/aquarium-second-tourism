import cls from "./OffersPage.module.scss"
import {Typography} from "antd";
import {ClockCircleOutlined} from "@ant-design/icons";
import tours from "@assets/img/tours.jpg"
import hotels from "@assets/img/hotels.jpg"
import events from "@assets/img/events.jpg"
import Offer from "@assets/img/offer.png"
import Coin from "@assets/icons/coin.svg";

export const OffersPage = () => {

    const list = [
        {
            name: "Туры",
            price: 2500,
            img: tours
        },
        {
            name: "Отели",
            price: 2100,
            img: hotels
        },
        {
            name: "Мероприятия",
            price: 2000,
            img: events
        }
    ]
    return (
        <div className={cls.wrapper}>
            <Typography.Title level={2}>Спецпредложение</Typography.Title>
            <div className={cls.main}>
                <img src={Offer} alt=""/>
                <Typography.Text className={cls.time}>
                    <ClockCircleOutlined/>
                    1 день 07:35:17
                </Typography.Text>
                <div className={cls.body}>
                    <Typography.Text className={cls.text}>
                        Закажите пиццу в ресторане “Сад и море” и получите кешбэк 15%
                    </Typography.Text>

                </div>
                <Typography.Text className={cls.tag}>
                    Подробнее
                </Typography.Text>
            </div>
            <Typography.Title level={2}>Купить за баллы</Typography.Title>
            <ul className={cls.list}>
                {list.map((item) => (
                    <li className={cls.listItem}>
                        <img className={cls.listImage} src={item.img} alt=""/>
                        <Typography.Title level={2}>{item.name}</Typography.Title>
                        <div className={cls.listItemPrice}>
                            <Typography.Text className={cls.listItemName}>
                                от {item.price} <Coin/>
                            </Typography.Text>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

    );
};

