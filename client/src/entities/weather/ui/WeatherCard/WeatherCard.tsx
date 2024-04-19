import cls from "./WeatherCard.module.scss"
import Weather from "@assets/img/weather.png"
import {Typography} from "antd";

export const WeatherCard = () => {
    return (
        <div className={cls.wrapper}>
            <img src={Weather} alt=""/>
            <Typography.Text className={cls.time}>Пятница, 19 апреля</Typography.Text>
            <Typography.Title className={cls.title}>25°</Typography.Title>
            <Typography.Text className={cls.feels}>Облачно, ощущается как 21°</Typography.Text>
        </div>
    );
};

