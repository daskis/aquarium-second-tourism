import {useState, useEffect} from "react";
import cls from "@/pages/DirectoriesPage/EmployeesPage/EmployeesPage.module.scss";
import {Modal, Input, Checkbox, Button} from "antd";

import { useDeleteUsersMutation, usePatchUsersMutation } from "../../../store/services/directories/UsersApi";
import { loginApi } from "@/store/services/LoginApi";

export const UsersEdit = ({setIsModalOpenEdit, isModalOpenEdit, editRecord, initDataEdit, result, setInitDataEdit, refetch}) => {

    const [copyData, setCopyData] = useState({
        currentData:{
            
        staff: null,
        company:null ,
        telephon: null,
        username:null,
        first_name: null,
        middle_name:null
            
    }}
    )
    useEffect(() => {
        setCopyData(result)
    }, [result])
console.log(initDataEdit);


    const [patch, res] = usePatchUsersMutation()
    const [deleteTrigger, r] = useDeleteUsersMutation()
    

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
    console.log(editRecord);
    
        if (copyData.currentData){
            return (
                <Modal title="Создание счата для оплаты" open={isModalOpenEdit} onOk={handleOk}
                onCancel={handleCancel}>
                <div className={cls.modalWrapper}>
                    <div className={cls.group}>
                        <Input value={copyData.currentData.username} onChange={(e) => onHandleChangeOnce(e, 'username')} placeholder="Username"/>
                        <Input value={copyData.currentData.first_name} onChange={(e) => onHandleChangeOnce(e, 'first_name')} placeholder="Имя"/>
                        <Input value={copyData.currentData.middle_name} onChange={(e) => onHandleChangeOnce(e, 'middle_name')} placeholder="Фамилия"/>
                    </div>
                    <div className={cls.group}>
                        <Input value={copyData.currentData.staff} onChange={(e) => onHandleChangeOnce(e, 'staff')} placeholder="Отдел"/>
                        <Input value={copyData.currentData.telephone} onChange={(e) => onHandleChangeOnce(e, 'telephone')} placeholder="Номер телефона"/>
                    </div>
                    <Checkbox>Активный</Checkbox>
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
