import cls from "./HotelsPage.module.scss"
import {IHotelCard, useGetHotels} from "@entities/hotel/lib";
import {Hotel} from "@entities/hotel/ui";
import {Typography} from "antd";
import Filters from "@assets/icons/filter.svg"
import {Loading} from "@shared/ui";

export const HotelsPage = () => {
    const {data} = useGetHotels()
    if (data) {
        return (
            <div className={cls.wrapper}>
                <div className={cls.heading}>
                    <Typography.Title className={cls.title}>Отели</Typography.Title>
                    <Filters/>
                </div>
                {data && data.map((item, index) => (
                    <Hotel key={item.id} {...item}/>
                ))}
            </div>
        );
    } else {
        return <Loading/>
    }
};

