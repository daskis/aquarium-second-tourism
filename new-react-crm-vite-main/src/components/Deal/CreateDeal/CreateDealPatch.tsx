import React from "react";
import { Button, Flex, Form, Input, Space, Tabs, DatePicker, DatePickerProps } from "antd";
import { FC, useEffect, useState } from "react";
import {IValue} from "@/types";
import cls from './CreateDeal.module.scss'
import type { TabsProps } from 'antd';
import moment from "moment";



const CreateDealPatch: FC = ({data, initData, setInitData, updateData, setIsLoadingSpin, setUdateData}) => {

    useEffect(() => {
        setInitData(data)
        
    }, [data])




    const handleInputChange = (name: string, value: string | number) => {
        if (name.startsWith("borrower.")) {
            // Если имя поля начинается с "borrower.", обновляем вложенное свойство borrower
            const borrowerField = name.split(".")[1];
            setFormData((prevData) => ({
                ...prevData,
                borrower: {
                    ...prevData.borrower,
                    [borrowerField]: value,
                },
            }));
        } else if (name.startsWith("product.")) {
            const productField = name.split(".")[1];
            setFormData((prevData) => ({
                ...prevData,
                product: {
                    ...prevData.product,
                    [productField]: value,
                },
            }));
        } else if (name.startsWith("guarantors.")) {
            const guarantorsField = name.split(".")[1];
            setFormData((prevData) => ({
                ...prevData,
                guarantors: {
                    ...prevData.guarantors,
                    [guarantorsField]: value,
                },
            }));
        } else {
            // Для полей верхнего уровня
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = () => {
        // Преобразовываем состояние формы (formData) в JSON объект
        const jsonFormData = JSON.stringify(formData, null, 2);
        console.log(jsonFormData);
    };

    const onHandleChange = (e:any, type:string, category:any) => {   

        setInitData(prev => ({
            ...prev,
            [type]: e.target.value
        }))

        setUdateData(prev => ({
            ...prev,
            [type]: e.target.value
        }))
    } 
    console.log(updateData);
    

    const onHandleChangeDouble= (e:any, type:string, category:any) => {   

        setInitData(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [type]: e.target.value
            }
        })
    )

    setUdateData(prev => ({
        ...prev,
        [type]: e.target.value
    }))
    } 

    const onHandleChangeDoubleGuarant = (e: any, type: string) => {
        setInitData(prev => ({
          ...prev,
          guarantors: [
            {
              ...prev.guarantors[0],
              [type]: e.target.value
            },
          ]
        }))

        setUdateData(prev => ({
            ...prev,
            guarantors: [
                {
                    ...prev.guarantors,
                    [type]: e.target.value
                }
            ],
            
        }))


      }


    const borrowerInputs = (    
        <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
            <div className={cls.title}>
                <div className={cls.together}>
                    <input className={cls.input} value={initData.borrower.first_name} onChange={(e) => onHandleChangeDouble(e, 'first_name', 'borrower')} type="text" placeholder="Имя"/>
                    <input className={cls.input} type="text" placeholder="Фамилия" value={initData.borrower.surname} onChange={(e) => onHandleChangeDouble(e, 'surname', 'borrower')}/>
                    <input className={cls.input} type="text" placeholder="Отчество" value={initData.borrower.middle_name} onChange={(e) => onHandleChangeDouble(e, 'middle_name', 'borrower')}/>
                </div>
                <div className={cls.together}>
                    <input className={cls.input} type="text" placeholder="Номер телефона" value={initData.borrower.phone_number} onChange={(e) => onHandleChangeDouble(e, 'phone_number', 'borrower')}/>
                    <DatePicker placeholder="Введите дату рождения" style={{marginBottom: '30px',width: '100%'}}/>
                </div>

                {/* <div className={cls.together}>
                    <input className={cls.input} type="text" placeholder="Серия паспорта"  value={initData.borrower.passport_serial} onChange={(e) => onHandleChangeDouble(e, 'passport_serial', 'borrower')}/>
                    <input className={cls.input} type="text" placeholder="Номер паспорта" value={initData.borrower.passport_number} onChange={(e) => onHandleChangeDouble(e, 'passport_number', 'borrower')}/>
                    <DatePicker  placeholder="Дата выдачи паспорта" style={{marginBottom: '30px',width: '100%'}}/>

                </div> */}

                {/* <input className={cls.input} type="text" placeholder="Адрес" value={initData.borrower.address} onChange={(e) => onHandleChangeDouble(e, 'address', 'borrower')}/>
                <input className={cls.input} type="text" placeholder="Место работы" value={initData.borrower.work_place} onChange={(e) => onHandleChangeDouble(e, 'work_place', 'borrower')}/> */}
            </div>
        </Space>
    );

    const productInputs = (
        <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
            <div className={cls.title}>
                <input className={cls.input} value={initData.debt_type} onChange={(e) => onHandleChange(e, 'debt_type')} type="text" placeholder="Название программы"/>
                <input className={cls.input} value={initData.debt_amount} onChange={(e) => onHandleChange(e, 'debt_amount')} type="text" placeholder="Сумма рассрочки"/>
                <input className={cls.input} type="text" placeholder="Цена"/>
                {/* <input className={cls.input} value={initData.initial_fee} onChange={(e) => onHandleChange(e, 'initial_fee')} type="text" placeholder="Первоначальный взнос"/>
                <input className={cls.input} value={initData.debt_term} onChange={(e) => onHandleChange(e, 'debt_term')} type="text" placeholder="Срок рассрочки"/> */}
                {/* <input className={cls.input} type="text" placeholder="Способ оплаты первого взноса"/>
                <input className={cls.input} type="text" placeholder="Ежемесячый взнос"/> */}
                {/* <div className={cls.together}>
                    <DatePicker placeholder="Дата рассрочки" style={{marginBottom: '30px',width: '100%'}}/>
                    <DatePicker placeholder="Дата платежа" style={{marginBottom: '30px',width: '100%'}}/>
                </div> */}
                {/* <input className={cls.input} type="text" placeholder="Платежные реквизиты"/>
                <input className={cls.input} type="text" placeholder="Партнер"/>
                <input className={cls.input} type="text" placeholder="Сотруник СБ"/> */}
            </div>
        </Space>
    );

    const guarantorsInputs = (
        <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
            <div className={cls.title}>
            <div className={cls.together}>
                <input className={cls.input} type="text" placeholder="Имя" value={initData.guarantors[0]?.first_name} onChange={(e) => onHandleChangeDoubleGuarant(e, 'first_name')}/>
                <input className={cls.input} type="text" placeholder="Фамилия" value={initData.guarantors[0]?.surname} onChange={(e) => onHandleChangeDoubleGuarant(e, 'surname')}/>
                <input className={cls.input} type="text" placeholder="Отчество" value={initData.guarantors[0]?.middle_name} onChange={(e) => onHandleChangeDoubleGuarant(e, 'middle_name')}/>
            </div>
            <div className={cls.together}>
                <DatePicker placeholder="Дата рождения" style={{marginBottom: '30px',width: '100%'}}/>
                <input className={cls.input} type="text" placeholder="Номер телефона" value={initData.guarantors[0]?.phone_number} onChange={(e) => onHandleChangeDoubleGuarant(e, 'phone_number')}/>
             </div>
            {/*<div className={cls.together}>
                <input className={cls.input} type="text" placeholder="Серия паспорта" value={initData.guarantors[0]?.passport_serial} onChange={(e) => onHandleChangeDoubleGuarant(e, 'passport_serial')}/>
                <input className={cls.input} type="text" placeholder="Номер паспорта" value={initData.guarantors[0]?.passport_number} onChange={(e) => onHandleChangeDoubleGuarant(e, 'passport_number')}/>
                <input className={cls.input} type="text" placeholder="Дата выдачи" value={initData.guarantors[0]?.passport_date} onChange={(e) => onHandleChangeDoubleGuarant(e, 'passport_date')}/>
            </div>*/}
            </div> 
        </Space>
    );

    const items: TabsProps['items'] = [
        // {
        //     key: '1',
        //     label: "Заказчик",
        //     children: borrowerInputs,
        // },
        {
            key: '2',
            label: "Продукт",
            children: productInputs,
        },
        // {
        //     key: '3',
        //     label: "Поручитель",
        //     children: guarantorsInputs,
        // },
    ];



    if (data !== undefined){
    return (
        
        <form className={cls.createDeal} onSubmit={handleSubmit}>
            <Tabs defaultActiveKey="2"  items={items}/>
        </form>

    );
    } else {
        return (
            <div className="">загрузка</div>
        )
    }
};

export { CreateDealPatch };