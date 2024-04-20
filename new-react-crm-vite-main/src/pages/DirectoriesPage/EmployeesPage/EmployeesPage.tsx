import cls from "./EmployeesPage.module.scss";
import {Button, Input, Modal, Typography, Table} from "antd";
import {useState} from "react";
import {ColumnsType} from "antd/es/table";
import {IEmployeesColumns} from "@/types";
import clsAll from '../Directories.module.scss';
import { useGetEmployeesQuery, usePostEmployeesMutation, useLazyGetEmployeesQuery } from "../../../store/services/directories/EmployeesApi";
import { EmployeesEdit } from "./EmployeesEdit";


export const EmployeesPage = () => {
    const {data, refetch} = useGetEmployeesQuery(null)
    const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false)
    const [editRecord, setEditRecord] = useState<Object>()
    const [uuidDataTrigger, result, isLoading] = useLazyGetEmployeesQuery()
    const [initData, setInitData] = useState({
        salary: "-80000.00",
        first_name: "Заза",
        surname: "Лаптев",
        middle_name: "Машиканян"
    }
        )
    const [initDataEdit, setInitDataEdit] = useState({})
    const [postTrigger, res] = usePostEmployeesMutation()

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    console.log(result);
    
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

    const items: IEmployeesColumns[] = [
        {
            first_name: "Вася",
            surname: "Пупкин",
            middle_name: "Бубкин",
            salary: 'Долг по зарплате'
        },
        {
            first_name: "Вася",
            surname: "Бебкен",
            middle_name: "Бубкин",
            salary: 'Долг по зарплате'
        },
        {
            first_name: "Вася",
            surname: "Дипкин",
            middle_name: "Бубкин",
            salary: 'Долг по зарплате'
        },
    ]

    const columns: ColumnsType<IEmployeesColumns> = [
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
            title: "Долг по зарплате",
            dataIndex: "salary",
            key: "salary"
        },

    ]

    return (
        <div className={cls.wrapper}>
            <Modal title="Добавление данных для нового договора" open={isModalOpen} onOk={handleOk}
                   onCancel={handleCancel}>
                <div className={cls.modalWrapper}>
                    <Input onChange={(e) => onHandleChangeOnce(e, 'first_name')} placeholder="Имя"/>
                    <Input onChange={(e) => onHandleChangeOnce(e, 'surname')} placeholder="Фамилия"/>
                    <Input onChange={(e) => onHandleChangeOnce(e, 'middle_name')} placeholder="Отчество"/>
                    <Input onChange={(e) => onHandleChangeOnce(e, 'salary')} placeholder="Долг по зарплате"/>
                </div>
            </Modal>

            <div className={cls.heading}>
                <Typography.Title>Сотрудники</Typography.Title>
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

            <EmployeesEdit
                setIsModalOpenEdit={setIsModalOpenEdit} 
                isModalOpenEdit={isModalOpenEdit} 
                editRecord={editRecord} 
                result={result} 
                setInitDataEdit={setInitDataEdit} 
                initDataEdit={initDataEdit} 
                refetch={refetch}
             />

        </div>
    );
};

