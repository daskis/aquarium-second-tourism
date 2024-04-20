import {useState} from "react";
import cls from "@/pages/DirectoriesPage/EmployeesPage/EmployeesPage.module.scss";
import {Button, Input, Modal, Typography, Table} from "antd";
import {IPartnerColumns} from "@/types";
import { ColumnsType } from "antd/es/table";
import { usePostPartnersMutation, useLazyGetPartnersQuery, useGetPartnersQuery } from "../../../store/services/directories/PartnersApi";
import { PartnersEdit } from "./PartnersEdit";

export const PartnersPage = () => {
    const {data, refetch} = useGetPartnersQuery(null)
    const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false)
    const [editRecord, setEditRecord] = useState<Object>()
    const [uuidDataTrigger, result, isLoading] = useLazyGetPartnersQuery()
    const [initData, setInitData] = useState({
        id: 3,
        partner_debt: "2495790.00",
        name: "Полотенчик",
        bill_phone: "+79635421186",
        bill_card: "",
        bill_first_name: "Винни",
        email: "towel@mail.ru"
    }
        )
    const [initDataEdit, setInitDataEdit] = useState({})
    const [postTrigger, res] = usePostPartnersMutation()

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const showModal = () => {
        setIsModalOpen(true);
    };


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

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleRowClick = async (record) => {

        await Promise.all([
            uuidDataTrigger(record.id),
        ]);
        setIsModalOpenEdit(true);

        
        setEditRecord(record.id)
    };
      
    const onHandleChangeOnce = (e:any, type:string) => {   
        setInitData(prev => ({
            ...prev,
            [type]: e.target.value
        })
    )}
    

    const items: IPartnerColumns[] = [
        {
            name: "Вася",
            bill_phone: "Пупкин",
            bill_card: 'asd',
            bill_first_name: 'asd',
            email: 'asd',
            partner_debt: 'Долг партнеру'
        }, {
            name: "Вася",
            bill_phone: "Пупкин",
            bill_card: 'asd',
            bill_first_name: 'asd',
            email: 'asd',
            partner_debt: 'Долг партнеру'
        },
        {
            name: "Вася",
            bill_phone: "Пупкин",
            bill_card: 'asd',
            bill_first_name: 'asd',
            email: 'asd',
            partner_debt: 'Долг партнеру'
        },
    ]

    const columns: ColumnsType<IPartnerColumns> = [
        {
            title: "Название",
            dataIndex: "name",
            key: "name"
        }, {
            title: "Привязанный номер телефона",
            dataIndex: "bill_phone",
            key: "bill_phone"
        }, {
            title: "Номер карты",
            dataIndex: "bill_card",
            key: "bill_card"
        }, {
            title: "Имя",
            dataIndex: "bill_first_name",
            key: "bill_first_name"
        }, {
            title: "Почта",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Долг партнеру",
            dataIndex: "partner_debt",
            key: "partner_debt"
        },

    ]
    return (
        <div className={cls.wrapper}>
            <Modal title="Добавление нового партнера" open={isModalOpen} onOk={handleOk}
                   onCancel={handleCancel}>
                <div className={cls.modalWrapper}>
                    <div className={cls.group}>
                        <Input placeholder="Название" onChange={(e) => onHandleChangeOnce(e, 'name')}/>
                        <Input placeholder="Имя" onChange={(e) => onHandleChangeOnce(e, 'bill_first_name')}/>
                    </div>
                    <div className={cls.group}>
                        <Input placeholder="Привязанный номер телефона" onChange={(e) => onHandleChangeOnce(e, 'bill_phone')}/>
                        <Input placeholder="Почта" onChange={(e) => onHandleChangeOnce(e, 'email')}/>
                    </div>
                    <Input placeholder="Номер карты" onChange={(e) => onHandleChangeOnce(e, 'bill_card')}/>
                    <Input placeholder="Долг партнеру" onChange={(e) => onHandleChangeOnce(e, 'partner_debt')}/>
                </div>
            </Modal>
            <div className={cls.heading}>
                <Typography.Title>Партнеры</Typography.Title>
                <Button onClick={showModal} type="primary">Создать</Button>
            </div>


            <PartnersEdit
                setIsModalOpenEdit={setIsModalOpenEdit} 
                isModalOpenEdit={isModalOpenEdit} 
                editRecord={editRecord} 
                result={result} 
                setInitDataEdit={setInitDataEdit} 
                initDataEdit={initDataEdit} 
                refetch={refetch}
            />



            <Table bordered dataSource={data} columns={columns} scroll={{x: 1000}}
             onRow={(record) => ({
                onClick: () => handleRowClick(record),
              })}

              
            />

        </div>
    );
};

