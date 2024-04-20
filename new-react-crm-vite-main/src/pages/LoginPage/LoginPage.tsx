import React, {useEffect, useState} from 'react';

import authManSvg from "@/assets/images/auth/auth.png";
import styles from './LoginPage.module.scss';
import {useGetLoginMutation} from "@/store/services/LoginApi.ts";
import { useNavigate } from 'react-router-dom';


export const LoginPage: React.FC = () => {
        const [info, setInfo] = useState({
            username: "",
            password: ""
        })
        const [mutate, {data, isError}] = useGetLoginMutation()
        const handleSubmit = (e: { preventDefault: () => void; }) => {
            e.preventDefault()
            mutate(info)
        }
        const navigate = useNavigate()
        useEffect(() => {
            if (data) {
               localStorage.setItem("token", data.auth_token)
                navigate("/")
            }
        }, [data, isError])


// --- Скрытие / Открытие просмотра пароля
        const [passwordShow, setPasswordShow] = React.useState<boolean>(true);
        const togglePassword = (): void => {
            setPasswordShow(!passwordShow);
        };


        return (
            <div className={styles.auth}>
                <div className={styles.auth__authLeftBlock}>
                    <div className={styles.auth__wrp}>
                        <h1 className={styles.authLeftBlock__title}>Sign In</h1>
                        <form onSubmit={handleSubmit} className={styles.authLeftBlock__form}>
                            <div className={styles.inputwrp}>
                                <input
                                    onChange={(e) => setInfo(prevState => ({
                                        ...prevState,
                                        username: e.target.value
                                    }))}
                                    value={info.username}
                                    className={styles.form__input} type="text" placeholder='username'/>
                            </div>
                            <div className={styles.passwords}>

                                <input
                                    onChange={(e) => setInfo(prevState => ({
                                        ...prevState,
                                        password: e.target.value
                                    }))}
                                    value={info.password}
                                    className={styles.form__input} type={passwordShow ? 'password' : 'text'}
                                    placeholder='password'
                                />
                                <input type='button' onMouseDown={togglePassword} className={styles.passwords__toggle}/>
                            </div>

                            <label htmlFor="title" className={styles.form__saveAccessText}> Keep me logged in
                                <input type="checkbox" id="title" className={styles.form__saveAccessCheckbox}/>
                            </label>

                            <button type='submit' className={styles.form__button}>Sing in</button>
                        </form>

                        <p className='moveRegister__text'>Keep me logged in <span className={styles.moveRegister__button}>Sing Up</span>
                        </p>

                    </div>

                </div>

                <div className={styles.auth__rightBlock}>
                    <div className={styles.rightBlock__wrp}>
                        <img src={authManSvg} className={styles.rightBlock__photo} alt=""/>
                        <h1 className={styles.rightBlock__title}>Manage everything in one place</h1>
                        <span className={styles.rightBlock__text}>Accusam noluisse mel et. Ius duis menandri ne, rebum exerci ad his. Quo at tollit veniam assueverit.</span>
                    </div>
                </div>

            </div>


        );
    }
;

