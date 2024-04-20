import {useState, useEffect} from "react";
import cls from "@/pages/DirectoriesPage/EmployeesPage/EmployeesPage.module.scss";
import {Modal, Input, Button} from "antd";

import { useDeleteExpensesMutation, usePatchExpensesMutation } from "../../../store/services/directories/ExpensesApi";

export const ExpensesEdit = ({setIsModalOpenEdit, isModalOpenEdit, editRecord, initDataEdit, result, setInitDataEdit, refetch}) => {

    const [copyData, setCopyData] = useState({
        currentData:{
            name:''
    }})
    useEffect(() => {
        setCopyData(result)
    }, [result])


    const [patch, res] = usePatchExpensesMutation()
    const [deleteTrigger, r] = useDeleteExpensesMutation()
    

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
                <Modal title="Создание новых расходов" open={isModalOpenEdit} onOk={handleOk}
                onCancel={handleCancel}>
                    <div className={cls.modalWrapper}>
                        <Input value={copyData.currentData.name} onChange={(e) => onHandleChangeOnce(e, 'name')} placeholder="Название"/>
                    </div>
                    <Button style={{position: 'absolute', bottom:'20px'}} danger type="primary" 
                onClick={handleDelete}>Удалить</Button>

                </Modal>

            );
        } else {
            return(
                <p></p>
            )
        }
    
};




