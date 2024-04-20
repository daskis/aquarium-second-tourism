import {Spin} from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import cls from './Spiner.module.scss'

export const Spiner = () => {
    return (
        <div className={cls.spinModal}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 64 }} spin />} />;
            </div>
    );
};

