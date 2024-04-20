import React from "react";
import cls from "./ContractPage.module.scss"
import {Button, DatePicker, Input, Modal, Typography, Table, Select} from "antd";
import {useState} from "react";
import {IContractColumns} from "@/types";
import type { TabsProps } from 'antd';
import {ColumnsType} from "antd/es/table";
import clsAll from '../Directories.module.scss';
import { useGetSellersQuery, usePatchSellersMutation, useDeletePartnersMutation } from "../../../store/services/directories/SellersApi";


export const ContractEdit = ({isModalOpenEdit, setIsModalOpenEdit, editRecord, initDataEdit ,setInitDataEdit, refetch, result}) => {

    const [patch, res] = usePatchSellersMutation()
    const [deleteTrigger, r] = useDeletePartnersMutation() 


    const [copyData, setCopyData] = useState([{

            first_name: null,
            surname: null,
            middle_name: null,
            birth_date: null,
            passport_serial: null,
            passport_number: null,
            passport_date: null,
            passport_given: null,
            address: null,
            office_address: null,
            number: null,
            seller_create_date: null,
        }]
    )
    React.useEffect(() => {
        setCopyData(result)
    }, [result])
    

    
    

    const handleOk = async (e) => {
        await patch({ data: initDataEdit, uuid: editRecord });
        refetch();

        setIsModalOpenEdit(false);

        setInitDataEdit('')
    };

    
    
    
    const handleCancel = () => {
        setIsModalOpenEdit(false)
    }

    const handleDelete = async () => {
        await deleteTrigger(editRecord)
        refetch();
        setIsModalOpenEdit(false)
        console.log(r);
        
    }

    const onHandleChangeOnce = (e, type) => { 
        setCopyData(prev => ({
            ...prev,
            currentData: prev.currentData.map(item => {
                return {
                    ...item,
                    [type]: e.target.value
                };
            })
        }));

        setInitDataEdit(prev => ({
            ...prev,
            [type]: e.target.value
        }))
    }


    

    if (copyData.currentData !== undefined){
        
        return (
            <Modal title="Редактирование данных договора" open={isModalOpenEdit} onOk={handleOk} onCancel={handleCancel} okText={'Редактировать'} cancelText={'Закрыть'}>
                <div className={cls.modalWrapper}>
                    <div className={cls.group}>
                        <Input placeholder="Имя" value={copyData.currentData[0].first_name} onChange={(e) => onHandleChangeOnce(e, 'first_name')}/>
                        <Input placeholder="Фамилия" value={copyData.currentData[0].surname}  onChange={(e) => onHandleChangeOnce(e, 'surname')}/>
                        <Input placeholder="Отчество" value={copyData.currentData[0].middle_name}  onChange={(e) => onHandleChangeOnce(e, 'middle_name')}/>
                    </div>
                    <div className={cls.group}>
                        <DatePicker placeholder="Дата рождения"/>
                        <Input placeholder="Номер телефона" value={copyData.currentData[0].number} onChange={(e) => onHandleChangeOnce(e, 'number')}/>
                    </div>
                    <div className={cls.group}>
                        <Input placeholder="Номер паспорта" value={copyData.currentData[0].passport_number} onChange={(e) => onHandleChangeOnce(e, 'passport_number')}/>
                        <Input placeholder="Серия паспорта" value={copyData.currentData[0].passport_serial} onChange={(e) => onHandleChangeOnce(e, 'passport_serial')}/>
                        <DatePicker placeholder="Дата выдачи"/>
                    </div>
                    <Input placeholder="Кем выдан" value={copyData.currentData[0].passport_given} onChange={(e) => onHandleChangeOnce(e, 'passport_given')}/>
                    <Input placeholder="Адрес регистрации" value={copyData.currentData[0].address} onChange={(e) => onHandleChangeOnce(e, 'address')}/>
                    <Input placeholder="Адрес офиса" value={copyData.currentData[0].office_address} onChange={(e) => onHandleChangeOnce(e, 'office_address')}/>
                </div>

                <Button style={{position: 'absolute', bottom:'20px'
                }} danger type="primary" 
                onClick={handleDelete}>Удалить</Button>
            </Modal>
        )
    } else {
        return(
            <p></p>
        )
    }



};

