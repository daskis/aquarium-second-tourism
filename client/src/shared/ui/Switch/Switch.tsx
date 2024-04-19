import cls from "./Switch.module.scss"
import {classNames, ISwitch} from "@shared/lib";
import {Typography} from "antd";
import {useState} from "react";

export const Switch = ({firstValue, secondValue}: ISwitch) => {
    const [activeValue, setActiveValue] = useState<string>(firstValue);
    return (
        <div className={cls.wrapper}>
            <Typography.Text
                onClick={() => setActiveValue(firstValue)}
                className={classNames(cls.value, {
                    [cls.active]: activeValue === firstValue
                }, [])}
            >
                {firstValue}</Typography.Text>
            <Typography.Text
                onClick={() => setActiveValue(secondValue)}
                className={classNames(cls.value, {
                    [cls.active]: activeValue === secondValue
                }, [])}
            >
                {secondValue}</Typography.Text>
        </div>
    );
};

