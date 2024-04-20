import {FC, useState} from "react";
import cls from './chat.module.scss'
import {Message} from "./message/message";
import {Button} from 'antd';
import TextArea from "antd/es/input/TextArea";


const Chat: FC = () => {


    const messeges = [
        {
            status: 'to',
            userName: 'Вася Пупкин',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, iusto! Iusto maiores architecto vitae sed.'
        },
        {
            status: 'from',
            userName: 'Вася Дупкин',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, iusto! Iusto maiores architecto vitae sed.'
        },
        {
            status: 'to',
            userName: 'Вася Дупкин',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, iusto! Iusto maiores architecto vitae sed.'
        },
        {
            status: 'to',
            userName: 'Вася Пупкин',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, iusto! Iusto maiores architecto vitae sed.'
        },
        {
            status: 'from',
            userName: 'Вася Дупкин',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, iusto! Iusto maiores architecto vitae sed.'
        },
        {
            status: 'to',
            userName: 'Вася Дупкин',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, iusto! Iusto maiores architecto vitae sed.'
        },
        {
            status: 'to',
            userName: 'Вася Пупкин',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, iusto! Iusto maiores architecto vitae sed.'
        },
        {
            status: 'from',
            userName: 'Вася Дупкин',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, iusto! Iusto maiores architecto vitae sed.'
        },
        {
            status: 'to',
            userName: 'Вася Дупкин',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, iusto! Iusto maiores architecto vitae sed.'
        },
        {
            status: 'from',
            userName: 'Вася Дупкин',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, iusto! Iusto maiores architecto vitae sed.'
        },
    ]


    return (
        <div style={{
            width: '66%',
            height: "95%"
        }}>
            <div className={cls.wrapper}>
                <div className={cls.chat}>

                    {messeges.map((el,key) => {
                        if (el.status === 'from') {
                            return (
                                <Message 
                                key={key}
                                message={{
                                    background: '#99CCFF',
                                    userName: el.userName,
                                    text: el.text,
                                    alignSelf: 'start'
                                }}/>
                            )
                        } else {
                            return (
                                <Message
                                key={key}
                                 message={{
                                    background: '#ccc',
                                    userName: el.userName,
                                    text: el.text,
                                    alignSelf: 'end'
                                }}/>
                            )
                        }

                    })}
                    {/* <Message message={{background:'#99CCFF', userName:'Вася Пупкин', text:'loremlorem', alignSelf: 'start'}} />
                <Message message={{background:'#ccc', userName:'Вася Пупкин', text:'loremloremloremloremloremloremloremloremlorememloremloremloremlorememloremloremloremlorememloremloremloremlorememloremloremloremlorememloremloremloremlorem',  alignSelf: 'end'}}/>
                <Message message={{background:'#99CCFF', userName:'Вася Пупкин', text:'loremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremloremloremloremlloremloremlorem', alignSelf: 'start'}} />
                <Message message={{background:'#ccc', userName:'Вася Пупкин', text:'loremloremloremloremloremloremloremloremlorememloremloremloremlorememloremloremloremlorememloremloremloremlorememloremloremloremlorememloremloremloremloremloremloremloremloremloremloremloremloremlorememloremloremloremlorememloremloremloremlorememloremloremloremlorememloremloremloremlorememloremloremloremlorem',  alignSelf: 'end'}}/> */}

                </div>

            </div>
            <form className={cls.form}>
                <TextArea className={cls.input} autoSize={{minRows: 2, maxRows: 2}} placeholder="Введите текст"/>
                <Button type="primary">Отправить</Button>
            </form>
        </div>
    );
};

export {Chat};


