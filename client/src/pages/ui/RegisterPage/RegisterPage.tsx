import cls from "./RegisterPage.module.scss"
import {Button, Input, Typography} from "antd";
import YandexLogo from "@assets/icons/yandex.svg"
import VkLogo from "@assets/icons/vk.svg"
import {Link} from "react-router-dom";
import {useState} from "react";
import {IAuthRequest, IRegisterRequest, useRegister} from "@features/auth/lib";

export const RegisterPage = () => {
    const [data, setData] = useState<IRegisterRequest>({
        username: "",
        email: "",
        password: "",
        repeatPassword: ""
    })
    const {trigger} = useRegister()
    const submit = () => {
        trigger(data)
    }
    return (
        <div className={cls.wrapper}>
            <div className={cls.body}>
                <form className={cls.form}>
                    <Typography.Title level={2}>
                        Регистрация
                    </Typography.Title>
                    <div className={cls.inputs}>
                        <Input
                            onChange={(e) => {
                                setData(prevState => ({
                                    ...prevState,
                                    username: e.target.value
                                }))
                            }
                            }
                            value={data.username} placeholder="Логин" type="text" size="large"/>
                        <Input
                            onChange={(e) => {
                                setData(prevState => ({
                                    ...prevState,
                                    email: e.target.value
                                }))
                            }
                            }
                            value={data.email} placeholder="Почта" type="email" size="large"/>
                        <Input
                            onChange={(e) => {
                                setData(prevState => ({
                                    ...prevState,
                                    password: e.target.value
                                }))
                            }}
                            value={data.password} placeholder="Пароль" type="password" size="large"/>
                        <Input
                            onChange={(e) => {
                                setData(prevState => ({
                                    ...prevState,
                                    repeatPassword: e.target.value
                                }))
                            }}
                            value={data.repeatPassword} placeholder="Повторите пароль" type="password" size="large"/>
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
                        Есть аккаунт?&nbsp;<Link to="/auth/login"><Typography.Link>Войти</Typography.Link>
                    </Link>
                    </Typography.Text>
                </form>
            </div>
        </div>
    );
};

