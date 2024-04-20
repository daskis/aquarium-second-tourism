import cls from "./ContractPage.module.scss"
import {Button, DatePicker, Input, Modal, Typography, Table, Select} from "antd";
import {useState} from "react";
import {IContractColumns} from "@/types";
import type { TabsProps } from 'antd';
import {ColumnsType} from "antd/es/table";
import clsAll from '../Directories.module.scss';
import { useGetSellersQuery, usePostFinanceMutation, useLazyGetSellersQuery } from "../../../store/services/directories/SellersApi";
import { ContractEdit } from "./ContactEdit";
import { Spiner } from "@/components/Spin/Spiner";



export const ContractPage = () => {
    const {data, refetch, isLoading} = useGetSellersQuery(null)
    const [uuidDataTrigger, result] = useLazyGetSellersQuery()
    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false)
    const [editRecord, setEditRecord] = useState<Object>()
    const [initData, setInitData] = useState({

        first_name: "Лео",
        surname: "Пушок",
        middle_name: "Тушок",
        birth_date: "1994-11-05",
        passport_serial: "1423",
        passport_number: "123456",
        passport_date: "1999-11-05",
        passport_given: "мвд РФ",
        address: "Гроустрит",
        office_address: "Гринстрит",
        number: "+79191112233",
        seller_create_date: "2000-04-12",

    })

    
    const [initDataEdit, setInitDataEdit] = useState({})
    const [postTrigger, res] = usePostFinanceMutation()


    const handleOk = async () => {
        try {
          await postTrigger(initData); // отправка POST-запроса
          console.log('Post created successfully!', initData);
          // дополнительная логика после успешного POST-запроса
        } catch (error) {
          console.error('Failed to create post:', error);
          // обработка ошибки
        }
        setIsModalOpen(false)

        refetch()
      };  

    const onHandleChangeOnce = (e:any, type:string) => {   
        setInitData(prev => ({
            ...prev,
            [type]: e.target.value
        })
    )}

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const items: IContractColumns[] = [
        {
            first_name: "Вася",
            surname: "Пупкин",
            middle_name: "Бубкин",
            password_serial: "4321",
            password_number: "412412",
            password_date: '29.24.1232'
        },
        {
            first_name: "Вася",
            surname: "Бебкен",
            middle_name: "Бубкин",
            password_serial: "4321",
            password_number: "412412",
            password_date: '29.24.1232'
        },
        {
            first_name: "Вася",
            surname: "Дипкин",
            middle_name: "Бубкин",
            password_serial: "4321",
            password_number: "412412",
            password_date: '29.24.1232'
        },
    ]

    const columns: ColumnsType<IContractColumns> = [
        {
            title: "Имя",
            dataIndex: "first_name",
            key: "first_name"
        }, {
            title: "Фамилия",
            dataIndex: "surname",
            key: "surname"
        }, {
            title: "Отчество",
            dataIndex: "middle_name",
            key: "middle_name"
        }, {
            title: "Серия паспорта",
            dataIndex: "passport_serial",
            key: "passport_serial"
        }, {
            title: "Номер паспорта",
            dataIndex: "passport_number",
            key: "passport_number"
        }, {
            title: "Дата паспорта",
            dataIndex: "passport_date",
            key: "passport_date"
        },

    ]
    
    const handleRowClick = async (record) => {

        await Promise.all([
            uuidDataTrigger(record.id),
        ]);
        setIsModalOpenEdit(true);
        setEditRecord(record.id)
    };
      


    if (isLoading) {
        return (
            <Spiner/>
        )
    } else {
        return (

            <div className={cls.wrapper}>
    
                <Modal title="Добавление данных для нового договора" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <div className={cls.modalWrapper}>
                        <div className={cls.group}>
                            <Input placeholder="Имя" onChange={(e) => onHandleChangeOnce(e, 'first_name')}/>
                            <Input placeholder="Фамилия" onChange={(e) => onHandleChangeOnce(e, 'surname')}/>
                            <Input placeholder="Отчество" onChange={(e) => onHandleChangeOnce(e, 'middle_name')}/>
                        </div>
                        <div className={cls.group}>
                            <DatePicker placeholder="Дата рождения"/>
                            <Input placeholder="Номер телефона" onChange={(e) => onHandleChangeOnce(e, 'number')}/>
                        </div>
                        <div className={cls.group}>
                            <Input placeholder="Номер паспорта" onChange={(e) => onHandleChangeOnce(e, 'passport_number')}/>
                            <Input placeholder="Серия паспорта" onChange={(e) => onHandleChangeOnce(e, 'passport_serial')}/>
                            <DatePicker placeholder="Дата выдачи"/>
                        </div>
                        <Input placeholder="Кем выдан" onChange={(e) => onHandleChangeOnce(e, 'passport_given')}/>
                        <Input placeholder="Адрес регистрации" onChange={(e) => onHandleChangeOnce(e, 'address')}/>
                        <Input placeholder="Адрес офиса" onChange={(e) => onHandleChangeOnce(e, 'office_address')}/>
                    </div>
                </Modal>
    
                <div className={cls.heading}>
                    <Typography.Title>Данные для договора</Typography.Title>
                    <Button className={clsAll.btn} onClick={showModal} type="primary">Создать</Button>
                </div>
                
                <Table 
                bordered 
                dataSource={data} 
                columns={columns} 
                scroll={{x: 1000}} 
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                  })}
                />
    
                <ContractEdit 
                setIsModalOpenEdit={setIsModalOpenEdit} 
                isModalOpenEdit={isModalOpenEdit} 
                editRecord={editRecord} 
                result={result} 
                setInitDataEdit={setInitDataEdit} 
                initDataEdit={initDataEdit} 
                refetch={refetch}/>
    
            </div>
        );
    }
};

