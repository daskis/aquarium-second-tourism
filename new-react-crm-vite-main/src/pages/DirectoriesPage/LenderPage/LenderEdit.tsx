import {useState, useEffect} from "react";
import cls from "@/pages/DirectoriesPage/EmployeesPage/EmployeesPage.module.scss";
import {Modal, Input, Checkbox, Button} from "antd";

import { useDeleteLenderMutation, usePatchLenderMutation } from "../../../store/services/directories/LenderApi";
import { loginApi } from "@/store/services/LoginApi";

export const LenderEdit = ({setIsModalOpenEdit, isModalOpenEdit, editRecord, initDataEdit, result, setInitDataEdit, refetch}) => {

    const [copyData, setCopyData] = useState({
        currentData:{
            loan_debt: null,
            first_name: null,
            surname: null,
            middle_name: null
    }}
    )
    useEffect(() => {
        setCopyData(result)
    }, [result])


    const [patch, res] = usePatchLenderMutation()
    const [deleteTrigger, r] = useDeleteLenderMutation()
    

    const handleOk = async (e) => {
        await patch({ data: initDataEdit, uuid: editRecord });
        refetch();

        setIsModalOpenEdit(false);

        setInitDataEdit('')
    };

    
    
    
    const handleCancel = () => {
        setIsModalOpenEdit(false)
    }

    const handleDelete = async () => {


        await Promise.all([
            deleteTrigger(editRecord),
            setIsModalOpenEdit(false),
            refetch()
        ]);
        

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
                    <Input value={copyData.currentData.first_name} onChange={(e) => onHandleChangeOnce(e, 'first_name')} placeholder="Имя"/>
                    <Input value={copyData.currentData.surname} onChange={(e) => onHandleChangeOnce(e, 'surname')} placeholder="Фамилия"/>
                    <Input value={copyData.currentData.middle_name} onChange={(e) => onHandleChangeOnce(e, 'middle_name')} placeholder="Отчество"/>
                    <Input value={copyData.currentData.loan_debt} onChange={(e) => onHandleChangeOnce(e, 'loan_debt')} placeholder="Задолженность"/>
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
