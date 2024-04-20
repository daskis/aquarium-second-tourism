import {useState} from "react";
import cls from "@/pages/DirectoriesPage/EmployeesPage/EmployeesPage.module.scss";
import {Button, Input, Modal, Typography, Table} from "antd";
import clsAll from '../Directories.module.scss';
import {ColumnsType} from "antd/es/table";
import {IInvestorColumns} from "@/types";
import { useGetInvestorQuery, useLazyGetInvestorQuery, usePostInvestorMutation } from "../../../store/services/directories/InvestorsApi";
import { InverstorsEdit } from "./InvestorsEdit";


export const InvestorsPage = () => {
    const {data, refetch} = useGetInvestorQuery(null)
    const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false)
    const [editRecord, setEditRecord] = useState<Object>()
    const [uuidDataTrigger, result, isLoading] = useLazyGetInvestorQuery()
    const [initData, setInitData] = useState({
        id: 3,
        invests: "-152500.00",
        first_name: "Капуста",
        surname: "Заносит",
        middle_name: "Лопатович"
    })
    const [initDataEdit, setInitDataEdit] = useState({})
    const [postTrigger, res] = usePostInvestorMutation()
    
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

        console.log(record.id);
        
        setEditRecord(record.id)
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

    const items: IInvestorColumns[] = [
        {
            first_name: "Вася",
            surname: "Пупкин",
            middle_name: "Бубкин",
            invests: 'Инвестор'
        },
        {
            first_name: "Вася",
            surname: "Бебкен",
            middle_name: "Бубкин",
            invests: 'Инвестор'

        },
        {
            first_name: "Вася",
            surname: "Дипкин",
            middle_name: "Бубкин",
            invests: 'Инвестор'
        },
    ]

    const columns: ColumnsType<IInvestorColumns> = [
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
            title: "Остаток инвестиций",
            dataIndex: "invests",
            key: "invests"
        },

    ]

    return (
        <div className={cls.wrapper}>

            <Modal title="Добавление новых инветоров" open={isModalOpen} onOk={handleOk}
                   onCancel={handleCancel}>
                <div className={cls.modalWrapper}>
                    <Input onChange={(e) => onHandleChangeOnce(e, 'first_name')} placeholder="Имя"/>
                    <Input onChange={(e) => onHandleChangeOnce(e, 'middle_name')} placeholder="Фамилия"/>
                    <Input onChange={(e) => onHandleChangeOnce(e, 'surname')} placeholder="Отчество"/>
                    <Input onChange={(e) => onHandleChangeOnce(e, 'invests')} placeholder="Остаток инвестиций"/>
                </div>
            </Modal>

            <div className={cls.heading}>
                <Typography.Title>Инвестора</Typography.Title>
                <Button onClick={showModal} type="primary">Создать</Button>
            </div>

            <Table bordered 
            dataSource={data}
             columns={columns} 
             scroll={{x: 1000}}
             onRow={(record) => ({
                onClick: () => handleRowClick(record),
              })}
             />

             <InverstorsEdit
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
