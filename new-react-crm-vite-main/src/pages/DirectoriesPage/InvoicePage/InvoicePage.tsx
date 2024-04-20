import {useState} from "react";
import cls from "@/pages/DirectoriesPage/EmployeesPage/EmployeesPage.module.scss";
import {Button, Checkbox, Input, Modal, Typography, Table} from "antd";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {IInvoiceColumns} from "@/types";
import { ColumnsType } from "antd/es/table";
import { useGetInvoiceQuery, usePatchSellersMutation, usePostFinanceMutation, useLazyGetInvoiceQuery } from "../../../store/services/directories/InvoiceApi";
import { InvoicePageEdit } from "./InvoiceEdit";

export const InvoicePage = () => {
    const {data, refetch} = useGetInvoiceQuery(null)
    const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false)
    const [editRecord, setEditRecord] = useState<Object>()
    const [uuidDataTrigger, result, isLoading] = useLazyGetInvoiceQuery()
    const [initData, setInitData] = useState({
            id: 2,
            bill_phone: "+79385545632",
            bill_card: "2202542265668700",
            bill_bank: "Сбербанк",
            bill_first_name: "Джордж",
            bill_middle_name: "Соррос",
            bill_is_active: true
        }
        )
    const [initDataEdit, setInitDataEdit] = useState({})
    const [postTrigger, res] = usePostFinanceMutation()

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
    

    const items: IInvoiceColumns[] = [
        {
            bill_phone: "+79124141242",
            bill_card: "1424 1234 5425 1532",
            bill_bank: 'Сбербанк',
            bill_first_name: "Вамя",
            bill_middle_name: "Пупуин",
            bill_is_active: 'Активен'
        },
        {
            bill_phone: "+79124141242",
            bill_card: "1424 1234 5425 1532",
            bill_bank: 'Сбербанк',
            bill_first_name: "Вамя",
            bill_middle_name: "Пупуин",
            bill_is_active: 'Активен'
        },
        {
            bill_phone: "+79124141242",
            bill_card: "1424 1234 5425 1532",
            bill_bank: 'Сбербанк',
            bill_first_name: "Вамя",
            bill_middle_name: "Пупуин",
            bill_is_active: 'Активен'
        },
        {
            bill_phone: "+79124141242",
            bill_card: "1424 1234 5425 1532",
            bill_bank: 'Сбербанк',
            bill_first_name: "Вамя",
            bill_middle_name: "Пупуин",
            bill_is_active: 'Активен'
        },
    ]

    const columns: ColumnsType<IInvoiceColumns> = [
        {
            title: "Номер телефона",
            dataIndex: "bill_phone",
            key: "bill_phone"
        },
        {
            title: "Номер карты",
            dataIndex: "bill_card",
            key: "bill_card"
        },
        {
            title: "Банк",
            dataIndex: "bill_bank",
            key: "bill_bank"
        },
        {
            title: "Имя",
            dataIndex: "bill_first_name",
            key: "bill_first_name"
        },
        {
            title: "Фамилия",
            dataIndex: "bill_middle_name",
            key: "bill_middle_name"
        },
        {
            title: "Статус",
            dataIndex: "bill_is_active",
            key: "bill_is_active"
        },
    ]
    return (
        <div className={cls.wrapper}>
            <Modal title="Создание счата для оплаты" open={isModalOpen} onOk={handleOk}
                   onCancel={handleCancel}>
                <div className={cls.modalWrapper}>
                    <Input placeholder="Привязанный номер телефона" onChange={(e) => onHandleChangeOnce(e, 'bill_phone')}/>
                    <Input placeholder="Номер карты" onChange={(e) => onHandleChangeOnce(e, 'bill_card')}/>
                    <Input placeholder="Банк" onChange={(e) => onHandleChangeOnce(e, 'bill_bank')}/>
                    <div className={cls.group}>
                        <Input placeholder="Имя" onChange={(e) => onHandleChangeOnce(e, 'bill_first_name')}/>
                        <Input placeholder="Фамилия" onChange={(e) => onHandleChangeOnce(e, 'bill_middle_name')}/>
                    </div>
                    <Checkbox onChange={onChange}>Активность статуса</Checkbox>
                </div>
            </Modal>
            <div className={cls.heading}>
                <Typography.Title>Счет для оплаты</Typography.Title>
                <Button onClick={showModal} type="primary">Создать</Button>
            </div>
            <Table bordered dataSource={data} columns={columns} scroll={{x: 1000}}
            onRow={(record) => ({
                onClick: () => handleRowClick(record),
              })}/>
                {isLoading ? (
              <InvoicePageEdit setIsModalOpenEdit={setIsModalOpenEdit} isModalOpenEdit={isModalOpenEdit} editRecord={editRecord} result={result} setInitDataEdit={setInitDataEdit} initDataEdit={initDataEdit} refetch={refetch}/>
                ) : (
                    <p>ждем</p>
                )}
        </div>
    );
};
