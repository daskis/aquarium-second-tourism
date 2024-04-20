import { FC, useState } from "react";
import cls from './message.module.scss'


interface ButtonProps {
    message: {
        background:string,
        userName:string,
        text:string,
        alignSelf: string
    }
  }
const Message: FC<ButtonProps> = ({message}) => {

    return (


            <div className={cls.message} style={{background: message.background, 
                alignSelf: message.alignSelf,
            }}>
                <span className={cls.userName}>{message.userName}</span>
                <p className={cls.text}>{message.text}</p>
            </div>


    );
};

export { Message };


