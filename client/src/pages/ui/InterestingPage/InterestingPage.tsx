import cls from "./InterestingPage.module.scss"
import {Typography} from "antd";
import Filters from "@assets/icons/filter.svg"
import {InterestingPlace} from "@entities/interesting/ui";
import {useGetInteresting} from "@entities/interesting/lib";
import {Loading} from "@shared/ui";

export const InterestingPage = () => {

    const {data} = useGetInteresting()
    if (data) {
        return (
            <div className={cls.wrapper}>
                <div className={cls.heading}>
                    <Typography.Title className={cls.title}>Интересные места</Typography.Title>
                    <Filters/>
                </div>
                {data && data.map((item, index) => (
                    <InterestingPlace key={item.id} {...item}/>
                ))}
            </div>
        );
    } else {
        return <Loading/>
    }
};

