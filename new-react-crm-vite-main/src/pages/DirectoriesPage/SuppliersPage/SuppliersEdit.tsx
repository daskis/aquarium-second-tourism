import {useState, useEffect} from "react";
import cls from "@/pages/DirectoriesPage/EmployeesPage/EmployeesPage.module.scss";
import {Modal, Input, Button} from "antd";

import { usePatchInvestorMutation, useDeleteInvestorMutation } from "../../../store/services/directories/InvestorsApi";

export const SuppliersEdit = ({setIsModalOpenEdit, isModalOpenEdit, editRecord, initDataEdit, result, setInitDataEdit, refetch}) => {

    const [copyData, setCopyData] = useState({
        currentData:{
            expenses: null,
            expense_type: null,
            name: null
    }}
    )
    useEffect(() => {
        setCopyData(result)
    }, [result])


    const [patch, res] = usePatchInvestorMutation()
    const [deleteTrigger, r] = useDeleteInvestorMutation()
    

    const handleOk = async (e) => {
        await patch({ data: initDataEdit, uuid: editRecord });
        refetch();

        setIsModalOpenEdit(false);

        setInitDataEdit('')
    };
    console.log(res);
    
    
    
    const handleCancel = () => {
        setIsModalOpenEdit(false)
    }

    const handleDelete = () => {
        deleteTrigger(editRecord)
        setInitDataEdit(false)
        refetch()
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
            <Modal title="Добавление новых поставщиков" open={isModalOpenEdit} onOk={handleOk} onCancel={handleCancel}>
                <div className={cls.modalWrapper}>
                    <Input value={copyData.currentData.name} onChange={(e) => onHandleChangeOnce(e, 'name')} placeholder="Имя"/>
                    <Input value={copyData.currentData.expense_type} onChange={(e) => onHandleChangeOnce(e, 'expense_type')} placeholder="Вид расходов"/>
                    <Input value={copyData.currentData.expenses} onChange={(e) => onHandleChangeOnce(e, 'expenses')} placeholder="Задолженность"/>
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




