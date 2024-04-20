import {useState} from "react";
import cls from "@/pages/DirectoriesPage/EmployeesPage/EmployeesPage.module.scss";
import {Button, Input, Modal, Typography, Table} from "antd";
import {ISuppliersColumns} from "@/types";
import { ColumnsType } from "antd/es/table";
import { useGetSuppliersQuery, usePostSuppliersMutation, useLazyGetSuppliersQuery } from "../../../store/services/directories/SuppliersApi";
import { SuppliersEdit } from "./SuppliersEdit";

export const SuppliersPage = () => {
    const {data, refetch} = useGetSuppliersQuery(null)
    const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false)
    const [editRecord, setEditRecord] = useState<Object>()
    const [uuidDataTrigger, result, isLoading] = useLazyGetSuppliersQuery()
    const [initData, setInitData] = useState({
        expenses: "-60000.00",
        expense_type: "Реклама",
        name: "Ракурс"
    })
    const [initDataEdit, setInitDataEdit] = useState({})
    const [postTrigger, res] = usePostSuppliersMutation()
    
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
            setEditRecord(record.id)
        ]);
        setIsModalOpenEdit(true);
        
        
    };

      const onHandleChangeOnce = (e:any, type:string) => {   
        if (type === 'invests'){
            setInitData(prev => ({
                ...prev,
                [type]: Number(e.target.value)
            }))

        } else {
            setInitData(prev => ({
                ...prev,
                [type]: e.target.value
            }))
        }
        
    }
    const items: ISuppliersColumns[] = [
        {
            name: "Вася",
            expense_type: 'Вид расходов',
            expenses: 'Задолженность',
        }, 
        {
            name: "Вася",
            expense_type: 'Вид расходов',
            expenses: 'Задолженность',
        }, 
        {
            name: "Вася",
            expense_type: 'Вид расходов',
            expenses: 'Задолженность',
        }, 
    ]

    const columns: ColumnsType<ISuppliersColumns> = [
        {
            title: "Имя",
            dataIndex: "name",
            key: "name"
        }, {
            title: "Вид расходов",
            dataIndex: "expense_type",
            key: "expense_type"
        }, {
            title: "Задолженность",
            dataIndex: "expenses",
            key: "expenses"
        }, 

    ]

    return (
        <div className={cls.wrapper}>
            <Modal title="Добавление новых поставщиков" open={isModalOpen} onOk={handleOk}
                   onCancel={handleCancel}>
                <div className={cls.modalWrapper}>
                    <Input onChange={(e) => onHandleChangeOnce(e, 'name')} placeholder="Имя"/>
                    <Input onChange={(e) => onHandleChangeOnce(e, 'expense_type')} placeholder="Вид расходов"/>
                    <Input onChange={(e) => onHandleChangeOnce(e, 'expenses')} placeholder="Задолженность"/>
                </div>
            </Modal>
            <div className={cls.heading}>
                <Typography.Title>Поставщики</Typography.Title>
                <Button onClick={showModal} type="primary">Создать</Button>
            </div>
            <SuppliersEdit
                setIsModalOpenEdit={setIsModalOpenEdit} 
                isModalOpenEdit={isModalOpenEdit} 
                editRecord={editRecord} 
                result={result} 
                setInitDataEdit={setInitDataEdit} 
                initDataEdit={initDataEdit} 
                refetch={refetch}
            />
            <Table
                onRow={(record) => ({
                onClick: () => handleRowClick(record),
                })}
                style={{width: '100%',
                }} bordered dataSource={data} columns={columns}/>

        </div>
    );
};

