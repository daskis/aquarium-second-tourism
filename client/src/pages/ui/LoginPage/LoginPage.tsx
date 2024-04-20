import cls from "./LoginPage.module.scss"
import {Button, Input, Typography} from "antd";
import YandexLogo from "@assets/icons/yandex.svg"
import VkLogo from "@assets/icons/vk.svg"
import {Link} from "react-router-dom";

export const LoginPage = () => {
    return (
        <div className={cls.wrapper}>
            <div className={cls.body}>
                <form className={cls.form}>
                    <Typography.Title level={2}>
                        Авторизация
                    </Typography.Title>
                    <div className={cls.inputs}>
                        <Input placeholder="Логин" size="large"/>
                        <Input placeholder="Пароль" size="large"/>
                    </div>
                    <Button
                        type="primary"
                        color="primary"
                        size="large">Отправить
                    </Button>
                    <Typography.Text className={cls.more}>
                        <hr/>
                        Или <hr/>
                    </Typography.Text>
                    <Button
                        className={cls.buttonYandex}
                        icon={<YandexLogo/>}
                        type="primary"
                        size="large">Yandex ID
                    </Button>
                    <Button
                        className={cls.buttonVk}
                        icon={<VkLogo/>}
                        type="primary"
                        size="large">VK ID
                    </Button>
                    <Typography.Text className={cls.register}>
                        Нет аккаунта?&nbsp;<Link to="/auth/register"><Typography.Link>Создать</Typography.Link>
                    </Link>
                    </Typography.Text>
                </form>
            </div>
        </div>
    );
};

