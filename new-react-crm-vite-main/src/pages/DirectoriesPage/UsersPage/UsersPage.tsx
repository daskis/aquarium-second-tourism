import {useState} from "react";
import cls from "@/pages/DirectoriesPage/EmployeesPage/EmployeesPage.module.scss";
import {Button, Checkbox, Input, Modal, Typography,Table} from "antd";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {IUsersColumns} from "@/types";
import {IUsersAdd} from "@/types";
import { ColumnsType } from "antd/es/table";
import clsPassword from './userspage.module.scss'
import { useGetUsersQuery, useLazyGetUsersQuery, usePostUsersMutation } from "../../../store/services/directories/UsersApi";
import { UsersEdit } from "./UsersEdit";

export const UsersPage = () => {
    const [isModalPasswordOpen, setIsModalPasswordOpen] = useState<boolean>(false)

    const {data, refetch} = useGetUsersQuery(null)
    const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false)
    const [editRecord, setEditRecord] = useState<Object>()
    const [uuidDataTrigger, result, isLoading] = useLazyGetUsersQuery()
    const [initData, setInitData] = useState({
        staff: "Менеджер",
        company: 1,
        telephone: "+79281119854",
        username: null
        }
        )
    const [initDataEdit, setInitDataEdit] = useState({})
    const [postTrigger, res] = usePostUsersMutation()

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
    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const handleRowClick = async (record) => {
console.log(record);

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

    const closeChangePassword = () => {
        setIsModalPasswordOpen(false)
        setIndexUserPassword('')
    }

    const items: IUsersColumns[] = [
        {
            id: 1,
            username: "Вася",
            first_name: "Пупкин",
            last_name: "Бубкин",
            staff: "4321",
            is_active: "412412",
            date_joinded: '29.24.1232',
            last_login: '14.10.2023',
        },
        {
            id: 2,
            username: "Петя",
            first_name: "Пупкин",
            last_name: "Бубкин",
            staff: "4321",
            is_active: "412412",
            date_joinded: '29.24.1232',
            last_login: '14.10.2023',
        },
        {
            id: 3,
            username: "Дима",
            first_name: "Пупкин",
            last_name: "Бубкин",
            staff: "4321",
            is_active: "412412",
            date_joinded: '29.24.1232',
            last_login: '14.10.2023',
        },


    ]

    const columns: ColumnsType<IUsersColumns> = [
        {
            title: "username",
            dataIndex: "username",
            key: "username"
        }, {
            title: "Имя",
            dataIndex: "first_name",
            key: "first_name"
        }, {
            title: "Фамилия",
            dataIndex: "last_name",
            key: "last_name"
        }, {
            title: "Отдел",
            dataIndex: "staff",
            key: "staff"
        }, {
            title: "Активный",
            dataIndex: "is_active",
            key: "is_active"
        }, {
            title: "Дата создания",
            dataIndex: "date_joinded",
            key: "date_joinded"
        }, {
            title: "Последний сеанс",
            dataIndex: "last_login",
            key: "last_login"
        },
        {
            title: <div className={cls.svg}>Пароль</div>,
            key: 'changePassword',
            render: (_, records) => (
                <a onClick={(record) => changePassword(records)} style={{fontSize:'13px'}}>
                    Изменить пароль
                </a>
            ),
          },
    ]
    const changePassword = (e) => {
        setIsModalPasswordOpen(true)
        setIndexUserPassword(e.username)
    }
    return (
        <div className={cls.wrapper}>
            <Modal title="Добавление новых займодателей" open={isModalOpen} onOk={handleOk}
                   onCancel={handleCancel}>
                <div className={cls.modalWrapper}>
                    <div className={cls.group}>
                        <Input onChange={(e) => onHandleChangeOnce(e, 'username')} placeholder="Username"/>
                        <Input onChange={(e) => onHandleChangeOnce(e, 'first_name')} placeholder="Имя"/>
                        <Input onChange={(e) => onHandleChangeOnce(e, 'middle_name')} placeholder="Фамилия"/>
                    </div>
                    <div className={cls.group}>
                        <Input onChange={(e) => onHandleChangeOnce(e, 'staff')} placeholder="Отдел"/>
                        <Input onChange={(e) => onHandleChangeOnce(e, 'telephone')} placeholder="Номер телефона"/>
                        <Input onChange={(e) => onHandleChangeOnce(e, 'password')} placeholder="Пароль"/>
                    </div>
                    <Checkbox onChange={onChange}>Активный</Checkbox>
                </div>
            </Modal>
            <div className={cls.heading}>
                <Typography.Title>Пользователи</Typography.Title>
                <Button onClick={showModal} type="primary">Создать</Button>
            </div>
            <Table bordered dataSource={data} columns={columns} scroll={{x: 1000}}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                    })}
            />


            <UsersEdit
                setIsModalOpenEdit={setIsModalOpenEdit} 
                isModalOpenEdit={isModalOpenEdit} 
                editRecord={editRecord} 
                result={result} 
                setInitDataEdit={setInitDataEdit} 
                initDataEdit={initDataEdit} 
                refetch={refetch}
             />

            <Modal title='Изменить пароль для' open={isModalPasswordOpen} onCancel={closeChangePassword} onOk={closeChangePassword} okText='Сохранить' cancelText='Закрыть'>
                <div className={clsPassword.wrapperPassword}>
                    <span>Старый пароль</span>
                    <Input placeholder="Введите старый пароль"/>

                    <span>Новый пароль</span>
                    <Input placeholder="Введите новый пароль"/>

                    <span>Повтор нового пароля</span>
                    <Input placeholder="Введите повторно новый пароль"/>
                </div>
            </Modal>
        </div>

        
    );
};

