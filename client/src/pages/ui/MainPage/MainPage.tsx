import cls from "./MainPage.module.scss"
import {WeatherCard} from "@entities/weather/ui";
import {IBonusCard} from "@entities/bonus/lib";
import {BonusCard} from "@entities/bonus/ui";


import Pizza from "@assets/img/pizza.png"
import Interesting from "@assets/img/interesting.png"
import Surprise from "@assets/img/surprise.png"
import {Switch} from "@shared/ui";
import {useState} from "react";


export const MainPage = () => {
    const [active, setActive] = useState<string>("")
    const list: IBonusCard[] = [
        {
            img: Pizza,
            title: "Спецапедложение",
            text: "Закажите пиццу в ресторане у моря",
            price: "Cashback 15%",
        },
        {
            img: Interesting,
            title: "Интересные события",
            text: "Зарядись впечатлениями и получи бонусы!",
        },
        {
            img: Surprise,
            title: "Сюрприз дня",
            text: "Успей получить до 23:59!!",
            color: "#DEF7FF"
        },
    ]


    const handleChange = (value: string) => {
        setActive(value)
    }
    return (
        <div className={cls.wrapper}>
            <div className={cls.actions}>
                <WeatherCard/>
                {list.map((item, i) => (
                    <BonusCard img={item.img} title={item.title} price={item.price} text={item.text}/>
                ))}
            </div>
            <Switch firstValue={"Вы знаете где остановиться? "} secondValue={"Впервые в городе? "}
                    onChange={handleChange}/>
        </div>
    );
};

