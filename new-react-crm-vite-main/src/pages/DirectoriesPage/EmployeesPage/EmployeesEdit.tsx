import {useState, useEffect} from "react";
import cls from "@/pages/DirectoriesPage/EmployeesPage/EmployeesPage.module.scss";
import {Modal, Input, Checkbox, Button} from "antd";

import { useDeleteEmployeesMutation, usePatchEmployeesMutation } from "../../../store/services/directories/EmployeesApi";

export const EmployeesEdit = ({setIsModalOpenEdit, isModalOpenEdit, editRecord, initDataEdit, result, setInitDataEdit, refetch}) => {

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


    const [patch, res] = usePatchEmployeesMutation()
    const [deleteTrigger, r] = useDeleteEmployeesMutation() 

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
        await deleteTrigger(editRecord)
        refetch();
        setIsModalOpenEdit(false)
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
                    <Input value={copyData.currentData} onChange={(e) => onHandleChangeOnce(e, 'first_name')} placeholder="Имя"/>
                    <Input value={copyData.currentData} onChange={(e) => onHandleChangeOnce(e, 'surname')} placeholder="Фамилия"/>
                    <Input value={copyData.currentData} onChange={(e) => onHandleChangeOnce(e, 'middle_name')} placeholder="Отчество"/>
                    <Input value={copyData.currentData} onChange={(e) => onHandleChangeOnce(e, 'salary')} placeholder="Долг по зарплате"/>
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

