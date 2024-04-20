import cls from "./HotelsPage.module.scss"
import {IHotelCard} from "@entities/hotel/lib";
import {Hotel} from "@entities/hotel/ui";
import {Typography} from "antd";
import Filters from "@assets/icons/filter.svg"

export const HotelsPage = () => {
    const list: IHotelCard[] = [
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
            <div className={cls.heading}>
                <Typography.Title className={cls.title}>Отели</Typography.Title>
                <Filters/>
            </div>
            {list.map((item, index) => (
                <Hotel key={item.id} img={item.img} rating={item.rating} type={item.type}
                       reviews={item.reviews} id={item.id} title={item.title}/>
            ))}
        </div>
    );
};

