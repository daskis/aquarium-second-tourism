import {useState, useEffect} from "react";
import cls from "@/pages/DirectoriesPage/EmployeesPage/EmployeesPage.module.scss";
import {Modal, Input, Checkbox, Button} from "antd";

import { usePatchSellersMutation, useDeleteDealMutation } from "../../../store/services/directories/InvoiceApi";

export const InvoicePageEdit = ({setIsModalOpenEdit, isModalOpenEdit, editRecord, initDataEdit, result, setInitDataEdit, refetch}) => {

    const [copyData, setCopyData] = useState({
        currentData:{
            id: null,
            bill_phone: null,
            bill_card: null,
            bill_bank: null,
            bill_first_name: null,
            bill_middle_name: null,
            bill_is_active: null
    }}
    )
    useEffect(() => {
        setCopyData(result)
    }, [result])


    const [patch, res] = usePatchSellersMutation()
    const [deleteTrigger, r] = useDeleteDealMutation()
    

    const handleOk = async (e) => {
        await patch({ data: initDataEdit, uuid: editRecord });
        refetch();

        setIsModalOpenEdit(false);

        setInitDataEdit('')
    };
    
    
    const handleCancel = () => {
        setIsModalOpenEdit(false)
    }

    const handleDelete = () => {
        deleteTrigger(editRecord)
    }

    const onHandleChangeOnce = (e:any, type:string) => { 
        setCopyData(prev => ({
            ...prev,
            currentData: {
                ...prev.currentData,
                [type]: e.target.value
            }
        }))
         
        setInitDataEdit(prev => ({
            ...prev,
            [type]: e.target.value
        })

    )}
        if (copyData.currentData){
            return (
                <Modal title="Создание счата для оплаты" open={isModalOpenEdit} onOk={handleOk}
                onCancel={handleCancel}>
                <div className={cls.modalWrapper}>
                    <Input value={copyData.currentData.bill_phone} placeholder="Привязанный номер телефона" onChange={(e) => onHandleChangeOnce(e, 'bill_phone')}/>
                    <Input value={copyData.currentData.bill_card} placeholder="Номер карты" onChange={(e) => onHandleChangeOnce(e, 'bill_card')}/>
                    <Input value={copyData.currentData.bill_bank} placeholder="Банк" onChange={(e) => onHandleChangeOnce(e, 'bill_bank')}/>
                <div className={cls.group}>
                    <Input value={copyData.currentData.bill_first_name} placeholder="Имя" onChange={(e) => onHandleChangeOnce(e, 'bill_first_name')}/>
                    <Input value={copyData.currentData.bill_middle_name} placeholder="Фамилия" onChange={(e) => onHandleChangeOnce(e, 'bill_middle_name')}/>
                </div>
                <Checkbox>Активность статуса</Checkbox>
                </div>
                <Button style={{position: 'absolute', bottom:'20px'
                }} danger type="primary" 
                onClick={handleDelete}>Удалить</Button>
            </Modal>
            );
        } else {
            return(
                <p></p>
            )
        }
    
};
