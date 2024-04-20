import cls from "./LoginPage.module.scss"
import {Button, Input, Typography} from "antd";
import YandexLogo from "@assets/icons/yandex.svg"
import VkLogo from "@assets/icons/vk.svg"
import {Link} from "react-router-dom";
import {useState} from "react";
import {ILoginRequest, useLogin} from "@features/auth/lib";

export const LoginPage = () => {
    const [data, setData] = useState<ILoginRequest>({
        username: "",
        password: ""
    })
    const {trigger} = useLogin()
    const submit = () => {
        trigger(data)
    }
    return (
        <div className={cls.wrapper}>
            <div className={cls.body}>
                <form className={cls.form}>
                    <Typography.Title level={2}>
                        Авторизация
                    </Typography.Title>
                    <div className={cls.inputs}>
                        <Input
                            onChange={(e) => {
                                setData(prevState => ({
                                    ...prevState,
                                    username: e.target.value
                                }))
                            }}

                            value={data.username} placeholder="Логин" type="text" size="large"/>
                        <Input
                            onChange={(e) => {
                                setData(prevState => ({
                                    ...prevState,
                                    password: e.target.value
                                }))
                            }}

                            value={data.password} placeholder="Пароль" type="password" size="large"/>
                    </div>
                    <Button
                        onClick={submit}
                        className={cls.button}
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

