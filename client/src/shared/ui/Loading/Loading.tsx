import cls from "./Loading.module.scss"
import {LoadingOutlined} from "@ant-design/icons";

export const Loading = () => {
    return (
        <div className={cls.loading}>
            <LoadingOutlined/>
        </div>
    );
};

