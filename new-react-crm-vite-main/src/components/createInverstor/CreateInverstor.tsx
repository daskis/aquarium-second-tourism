import {useState} from 'react';
import {Checkbox, Button, Space, DatePicker, Modal, Select} from 'antd';
import { Drawer } from 'antd';


import cls from './createInverstor.module.scss'

type prop = {
    openCreateInvestor: Boolean,
    setOpenCreateInvestor: React.Dispatch<React.SetStateAction<Boolean>>,

}

export const CreateInvestor = ({openCreateInvestor, setOpenCreateInvestor}):prop => {

    const handleCancel = () => {
        setOpenCreateInvestor(false)
        
    }
    

    return (

        <Modal zIndex={100000} title="Создать инвестора" open={openCreateInvestor} onCancel={handleCancel}  okText={'Создать'} cancelText={'Закрыть'} >
            <div className={cls.grid}>

                <span className={cls.subtitle}>Имя</span>
                <input className={cls.input} type="number" placeholder="Имя"/>

                <span className={cls.subtitle}>Фамилия</span>
                <input className={cls.input} placeholder="Фамилия"/>

                <span className={cls.subtitle}>Отчество</span>
                <input className={cls.input} placeholder="Отчество"/>

                <span className={cls.subtitle}>Дата рождения</span>
                <DatePicker placeholder="Дата рождения" style={{width: '100%', border: '1px solid #babfc4', color: '#babfc4'}}/>

                <span className={cls.subtitle}>Серия паспорта</span>
                <input className={cls.input} placeholder="Серия паспорта"/>

            </div>
        </Modal>

    );
};

