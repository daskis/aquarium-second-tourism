import cls from "./ToursPage.module.scss"
import {IHotelCard} from "@entities/hotel/lib";
import {Hotel} from "@entities/hotel/ui";
import {Typography} from "antd";
import Filters from "@assets/icons/filter.svg"
import {useGetTours} from "@entities/tour/lib";
import {Loading} from "@shared/ui";
import {Tour} from "@entities/tour/ui";

export const ToursPage = () => {
    const {data} = useGetTours()

    if (data) {
        return (
            <div className={cls.wrapper}>
                <div className={cls.heading}>
                    <Typography.Title className={cls.title}>Туры</Typography.Title>
                    <Filters/>
                </div>
                {data && data.map((item, index) => (
                    <Tour key={item.id} {...item}/>
                ))}
            </div>
        )
    } else {
        return <Loading/>
    }
};

