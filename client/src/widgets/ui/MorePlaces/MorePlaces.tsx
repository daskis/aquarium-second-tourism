import cls from "./MorePlaces.module.scss";
import { IMorePlaces } from "@widgets/lib";
import InterestingPlaces from "@assets/img/interestingPlaces.png";
import Discounts from "@assets/img/discounts.png";
import Beaches from "@assets/img/beaches.png";
import Parks from "@assets/img/parks.png";
import { Typography } from "antd";

export const MorePlaces = () => {
    const list: IMorePlaces[] = [
        {
            link: "124ra",
            name: "Интересные места",
            img: InterestingPlaces,
            gridArea: "div1" // Назначаем первому элементу grid-area div1
        },
        {
            link: "124ra",
            name: "Парки",
            img: Parks,
            gridArea: "div2" // Назначаем второму элементу grid-area div2
        },
        {
            link: "124ra",
            name: "Ваши скидки",
            img: Discounts,
            gridArea: "div3" // Назначаем третьему элементу grid-area div3
        },
        {
            link: "124ra",
            name: "Пляжи",
            img: Beaches,
            gridArea: "div4" // Назначаем четвертому элементу grid-area div4
        },
    ];

    return (
        <div className={cls.wrapper}>
            <Typography.Title level={2} className={cls.title}>Что еще посмотреть?</Typography.Title>
            <ul className={cls.list}> {/* Обертка для grid layout */}
                {list.map((item, i) => (
                    <li key={item.name} className={`${cls.listItem} ${cls[item.gridArea]}`}>
                        {/* Добавляем класс grid-area в зависимости от значения gridArea */}
                        <img src={item.img} className={cls.image}/>
                        <Typography.Title level={4} className={cls.name}>{item.name}</Typography.Title>
                    </li>
                ))}
            </ul>
        </div>
    );
};
