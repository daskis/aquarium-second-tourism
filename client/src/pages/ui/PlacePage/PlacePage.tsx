import cls from "./PlacePage.module.scss"
import {IPlace} from "@entities/place/lib";
import TinderCard from 'react-tinder-card'
import {PlaceItem} from "@entities/place/ui";
import {Typography} from "antd";
import {useGetPlaces} from "@entities/place/lib/hooks";
import {Loading} from "@shared/ui";

export const PlacePage = () => {

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }
    const list: IPlace[] = [
        {
            name: "Золотой пляж",
            img: ["https://i.pinimg.com/236x/97/6f/cd/976fcda0a602301fe9792180afaba6c4.jpg", "https://i.pinimg.com/236x/97/6f/cd/976fcda0a602301fe9792180afaba6c4.jpg", "https://i.pinimg.com/236x/97/6f/cd/976fcda0a602301fe9792180afaba6c4.jpg"],
            place: "Анапа",
            rating: 4.5,
            description: "Аквапарк «Золотой пляж» — в один из самых больших в Анапе развлекательных комплексов под открытым небом, который расположился на берегу Черного моря."
        },
        {
            name: "Золотой пляж 1",
            img: ["https://i.pinimg.com/236x/97/6f/cd/976fcda0a602301fe9792180afaba6c4.jpg", "https://i.pinimg.com/236x/97/6f/cd/976fcda0a602301fe9792180afaba6c4.jpg", "https://i.pinimg.com/236x/97/6f/cd/976fcda0a602301fe9792180afaba6c4.jpg", "https://i.pinimg.com/236x/97/6f/cd/976fcda0a602301fe9792180afaba6c4.jpg",],
            place: "Анапа",
            rating: 4.2,
            description: "Аквапарк «Золотой пляж» — в один из самых больших в Анапе развлекательных комплексов под открытым небом, который расположился на берегу Черного моря."
        },
        {
            name: "Золотой пляж 24",
            img: ["https://i.pinimg.com/236x/97/6f/cd/976fcda0a602301fe9792180afaba6c4.jpg", "https://i.pinimg.com/236x/97/6f/cd/976fcda0a602301fe9792180afaba6c4.jpg", "https://i.pinimg.com/236x/97/6f/cd/976fcda0a602301fe9792180afaba6c4.jpg", "https://i.pinimg.com/236x/97/6f/cd/976fcda0a602301fe9792180afaba6c4.jpg", "https://i.pinimg.com/236x/97/6f/cd/976fcda0a602301fe9792180afaba6c4.jpg",],
            place: "Анапа",
            rating: 4.5,
            description: "Аквапарк «Золотой пляж» — в один из самых больших в Анапе развлекательных комплексов под открытым небом, который расположился на берегу Черного моря."
        },
    ]
    const {data} = useGetPlaces()
    if (data) {
        return (
            <div className={cls.wrapper}>
                {data && data.map((item, i) => (
                    <TinderCard className={cls.swipe} key={item.name} onSwipe={(dir) => swiped(dir, item.name)}
                                onCardLeftScreen={() => outOfFrame(item.name)}>
                        <PlaceItem {...item}/>
                    </TinderCard>
                ))}
                <div className={cls.done}>
                    <Typography.Title level={4}>
                        Вы посмотрели весь контент
                    </Typography.Title>
                </div>
                <button className={cls.button}>
                    <Typography.Text>Добавить в свой маршрут</Typography.Text>
                </button>
            </div>
        );
    } else {
        return <Loading/>
    }
};

