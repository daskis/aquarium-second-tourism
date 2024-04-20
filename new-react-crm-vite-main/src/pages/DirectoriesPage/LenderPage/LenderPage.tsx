import {useState} from "react";
import cls from "@/pages/DirectoriesPage/EmployeesPage/EmployeesPage.module.scss";
import {Button, Input, Modal, Typography, Table} from "antd";
import {ILenderColumns} from "@/types";
import { ColumnsType } from "antd/es/table";
import { useGetLenderQuery, useLazyGetLenderQuery, usePostLenderMutation } from "../../../store/services/directories/LenderApi";
import { LenderEdit } from "./LenderEdit";

export const LenderPage = () => {
    const {data, refetch} = useGetLenderQuery(null)
    const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false)
    const [editRecord, setEditRecord] = useState<Object>()
    const [uuidDataTrigger, result, isLoading] = useLazyGetLenderQuery()
    const [initData, setInitData] = useState({
        loan_debt: "179123.00",
        first_name: "Кэш",
        surname: "Взаймов",
        middle_name: "Давалов"
        }
        )
    const [initDataEdit, setInitDataEdit] = useState({})
    const [postTrigger, res] = usePostLenderMutation()

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


    const items: ILenderColumns[] = [
        {
            first_name: "Вася",
            surname: "Пупкин",
            middle_name: "Бубкин",
            loan_debt: 'Задолженность'
        },
        {
            first_name: "Вася",
            surname: "Бебкен",
            middle_name: "Бубкин",
            loan_debt: 'Задолженность'
        },
        {
            first_name: "Вася",
            surname: "Дипкин",
            middle_name: "Бубкин",
            loan_debt: 'Задолженность'
        },
    ]

    const columns: ColumnsType<ILenderColumns> = [
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
            title: "Задолжности",
            dataIndex: "loan_debt",
            key: "loan_debt"
        },

    ]

    return (
        <div className={cls.wrapper}>
            <Modal title="Добавление новых займодателей" open={isModalOpen} onOk={handleOk}
                   onCancel={handleCancel}>
                <div className={cls.modalWrapper}>
                    <Input onChange={(e) => onHandleChangeOnce(e, 'first_name')} placeholder="Имя"/>
                    <Input onChange={(e) => onHandleChangeOnce(e, 'surname')} placeholder="Фамилия"/>
                    <Input onChange={(e) => onHandleChangeOnce(e, 'middle_name')} placeholder="Отчество"/>
                    <Input onChange={(e) => onHandleChangeOnce(e, 'loan_debt')} placeholder="Задолженность"/>
                </div>
            </Modal>
            <div className={cls.heading}>
                <Typography.Title>Займодатели</Typography.Title>
                <Button onClick={showModal} type="primary">Создать</Button>
            </div>
            <Table bordered dataSource={data} columns={columns} scroll={{x: 1000}}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                    })}
                />


            <LenderEdit
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
