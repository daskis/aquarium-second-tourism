import {useState, useEffect} from "react";
import cls from "@/pages/DirectoriesPage/EmployeesPage/EmployeesPage.module.scss";
import {Modal, Input, Checkbox, Button} from "antd";

import { useDeletePartnersMutation, usePatchPartnersMutation } from "../../../store/services/directories/PartnersApi";

export const PartnersEdit = ({setIsModalOpenEdit, isModalOpenEdit, editRecord, initDataEdit, result, setInitDataEdit, refetch}) => {

    const [copyData, setCopyData] = useState({
        currentData:{
            partner_debt: null,
            name: null,
            bill_phone: null,
            bill_card: null,
            bill_first_name: null,
            email: null,
        }}
    )
    useEffect(() => {
        setCopyData(result)
    }, [result])


    const [patch, res] = usePatchPartnersMutation()
    const [deleteTrigger, r] = useDeletePartnersMutation()
    

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
                <Modal title="Добавление нового партнера" open={isModalOpenEdit} onOk={handleOk}
                onCancel={handleCancel}>
                    <div className={cls.modalWrapper}>
                        <div className={cls.group}>
                            <Input placeholder="Название" value={copyData.currentData.name} onChange={(e) => onHandleChangeOnce(e, 'name')}/>
                            <Input placeholder="Имя" value={copyData.currentData.bill_first_name}  onChange={(e) => onHandleChangeOnce(e, 'bill_first_name')}/>
                        </div>
                        <div className={cls.group}>
                            <Input placeholder="Привязанный номер телефона" value={copyData.currentData.bill_phone}  onChange={(e) => onHandleChangeOnce(e, 'bill_phone')}/>
                            <Input placeholder="Почта" value={copyData.currentData.email}  onChange={(e) => onHandleChangeOnce(e, 'email')}/>
                        </div>
                    <Input placeholder="Номер карты" value={copyData.currentData.bill_card}  onChange={(e) => onHandleChangeOnce(e, 'bill_card')}/>
                    <Input placeholder="Долг партнеру" value={copyData.currentData.partner_debt}  onChange={(e) => onHandleChangeOnce(e, 'partner_debt')}/>
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

