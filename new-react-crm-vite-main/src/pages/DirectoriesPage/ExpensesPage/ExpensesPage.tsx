import {useState} from "react";
import cls from "@/pages/DirectoriesPage/EmployeesPage/EmployeesPage.module.scss";
import {Button, Input, Modal, Typography, Table} from "antd";
import { IExpensesColumns } from '@/types';
import { ColumnsType } from "antd/es/table";
import clsAll from '../Directories.module.scss';
import { useGetExpensesQuery, useDeleteExpensesMutation, useLazyGetExpensesQuery, usePostExpensesMutation, usePatchExpensesMutation } from "../../../store/services/directories/ExpensesApi";
import { ExpensesEdit } from "./ExpensesEdit";

export const ExpensesPage = () => {
    const {data, refetch} = useGetExpensesQuery(null)
    const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false)
    const [editRecord, setEditRecord] = useState<Object>()
    const [uuidDataTrigger, result, isLoading] = useLazyGetExpensesQuery()
    const [initData, setInitData] = useState({
        name: ''
    })
    const [initDataEdit, setInitDataEdit] = useState({})
    const [postTrigger, res] = usePostExpensesMutation()
    
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
            }))

        
    }

    const items: IExpensesColumns[] = [
        {
            name: "Вася",
        },
        {
            name: "Вася",
        },
        {
            name: "Вася",
        },
    ]

    const columns: ColumnsType<IExpensesColumns> = [
        {
            title: "Имя",
            dataIndex: "name",
            key: "name"
        },

    ]
    
    return (
        <div className={cls.wrapper}>
            <Modal title="Создание новых расходов" open={isModalOpen} onOk={handleOk}
                   onCancel={handleCancel}>
                <div className={cls.modalWrapper}>
                    <Input onChange={(e) => onHandleChangeOnce(e, 'name')} placeholder="Название"/>
                </div>
            </Modal>
            <div className={cls.heading}>
                <Typography.Title>Виды расходов</Typography.Title>
                <Button className={clsAll.btn} onClick={showModal} type="primary">Создать</Button>
            </div>
            <Table bordered dataSource={data} columns={columns} scroll={{x: 1000}}
                onRow={(record) => ({
                onClick: () => handleRowClick(record),
                })}
            />

            <ExpensesEdit
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

