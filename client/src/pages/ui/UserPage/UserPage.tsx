import cls from "./UserPage.module.scss"
import Coin from "@assets/icons/coin.svg";
import {Modal, Progress, Typography} from "antd";
import {Link} from "react-router-dom";
import Notification from "@assets/icons/notification.svg"
import User from "@assets/img/user.jpg"
import Qr from "@assets/img/qr.png"
import {useState} from "react";
import {classNames} from "@shared/lib";
import interestingPlace from "@assets/img/interestingPlace.png";
import travelHistory from "@assets/img/travelHistory.png";
import buyHistory from "@assets/img/buyHistory.png";
import wishList from "@assets/img/wishList.png";
import Firstachievment from "@assets/img/firstAchieve.png";
import Secondachievment from "@assets/img/secondAchieve.png";
import Thirdachievment from "@assets/img/thirdAchieve.png";


export const UserPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const list = [
        {
            path: "",
            img: interestingPlace,
            name: "Подобрать интересное место",
            description: "Поможем спланировать идеальное путешествие!",
        },
        {
            path: "",
            img: travelHistory,
            name: "История путешествий",
            description: "Вспомните самые яркие моменты!",
        },
        {
            path: "",
            img: buyHistory,
            name: "История покупок",
            description: "Копите баллы и обменивайте их на товары!",
        },
        {
            path: "",
            img: wishList,
            name: "Список желаний",
            description: "Подберем для вас выгодные предложения для посещения любимых мест",
        },
    ]
    const achievements = [
        {
            icon: Firstachievment,
            name: "Гурман",
            percent: 40,
        },
        {
            icon: Secondachievment,
            name: "Легенда",
            percent: 20,
        },
        {
            icon: Thirdachievment,
            name: "Гастроном",
            percent: 80,
        },
    ]

    return (
        <div className={cls.wrapper}>
            <div className={cls.icons}>
                <Link to="/profile" className={cls.coins}>
                    <Coin/>
                    <Typography.Text>
                        40
                    </Typography.Text>
                </Link>
                <Notification/>
            </div>
            <div className={cls.userCard}>
                <div className={cls.info}>
                    <img src={User} alt=""/>
                    <div className={cls.infoMain}>
                        <Typography.Title className={cls.name} level={2}>Алина Иванова</Typography.Title>
                        <Typography.Text className={cls.statusText}>статус: <span className={cls.status}>новичок</span></Typography.Text>
                    </div>
                </div>
                <div className={cls.additional}>
                    <div className={cls.additionalWrapper}>
                        <Typography.Title
                            className={cls.additionalText}
                            level={3}>
                            15
                        </Typography.Title>
                        <Typography.Text className={cls.additionalText}>
                            Друзья
                        </Typography.Text>
                    </div>
                    <div className={cls.additionalWrapper}>
                        <Typography.Title
                            className={cls.additionalText}
                            level={3}>
                            100
                        </Typography.Title>
                        <Typography.Text className={cls.additionalText}>
                            Подписчики
                        </Typography.Text>
                    </div>
                    <img onClick={showModal} className={cls.qr} src={Qr} alt=""/>
                    <Typography.Text className={cls.button}>
                        Редактировать <br/> профиль
                    </Typography.Text>
                </div>
            </div>
            <Modal open={isModalOpen} footer={(<></>)} onOk={handleOk} onCancel={handleCancel}>
                <img
                    src="https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSh-wrQu254qFaRcoYktJ5QmUhmuUedlbeMaQeaozAVD4lh4ICsGdBNubZ8UlMvWjKC"
                    alt=""/>
            </Modal>

            <div className={cls.cardWrapper}>
                <div className={classNames(cls.card, {}, [cls.cardSecond])}>
                    <div className={cls.cardHeading}>
                        <Typography.Title
                            className={cls.cardTitle}
                            level={3}>
                            Любимый город
                        </Typography.Title>
                        <Typography.Text className={cls.cardTag}>
                            PRO
                        </Typography.Text>
                    </div>
                    <Typography.Text className={cls.cardText}>
                        Больше кешбэка и бонусов
                    </Typography.Text>
                    <Typography.Text className={cls.button}>
                        Подробнее
                    </Typography.Text>
                </div>
                <ul className={cls.cardList}>
                    {list.map((item) => (
                        <li className={cls.card}>
                            <Typography.Title
                                className={cls.cardTitle}
                                level={5}>
                                {item.name}
                            </Typography.Title>
                            <Typography.Text className={cls.cardText}>
                                {item.description}
                            </Typography.Text>
                            <img src={item.img} alt=""/>
                        </li>
                    ))}
                </ul>
            </div>
            <Typography.Title level={2} className={cls.achievmentTitle}>Достижения</Typography.Title>
            <ul className={cls.achievmentList}>
                {achievements.map((item, i) => (
                    <li className={cls.achievment} key={i}>
                        <img src={item.icon} alt=""/>
                        <Progress percent={item.percent} size="small"/>
                        <Typography.Text className={cls.achievmentName}>
                            {item.name}
                        </Typography.Text>
                    </li>
                ))}
            </ul>
        </div>
    );
};

