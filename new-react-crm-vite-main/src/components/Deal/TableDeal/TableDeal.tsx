import {SearchOutlined} from "@ant-design/icons";
import {useRef, useState} from "react";
import cls from '../../../pages/DealPage/DealPage.module.scss'
import React from "react";
import type {InputRef} from "antd";
import {Button, Input, Space, Table, Tag, Modal, Typography, Dropdown, Menu, MenuProps, Spin} from "antd";
import type {ColumnType, ColumnsType} from "antd/es/table";
import type {FilterConfirmProps} from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import {IValue, DealStatusEnum} from "@/types";
import { CreateDealPatch } from "../CreateDeal/CreateDealPatch";
import { Chat } from "@/components/chat/chat";
import {UnorderedListOutlined} from "@ant-design/icons"
import { LoadingOutlined } from '@ant-design/icons';
import {usePatchDealMutation, useLazyGetDealuuidQuery, useDeleteDealMutation, useLazyDownloadDealQuery } from "@/store/services/DealApi";
import moment from "moment";
import { Spiner } from "@/components/Spin/Spiner";

type DataIndex = keyof IValue;


export const TableDeal = () => {
    const [initData, setInitData] = useState([
        {
            key: '1',
            debt_num: '001',
            debt_term: '2022-01-01',
            debt_date: '2022-01-31',
            status: 'Paid',
            partner_name: 'Product A',
        },
        {
            key: '2',
            debt_num: '002',
            debt_term: '2022-02-15',
            debt_date: '2022-03-15',
            status: 'Pending',
            partner_name: 'Service B',
        },
    ])
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoadingSpin, setIsLoadingSpin] = useState<boolean>(false)

    const onClose = () => {
        setIsModalOpen(false);
    };


    const columns: ColumnsType = [
        {
            title: "№",
            dataIndex: "debt_num",
            key: "debt_num",
        }, {
            title: "Дата начала",
            dataIndex: "debt_term",
            key: "debt_term",
        }, 
        {
            title: "Дата окончания",
            dataIndex: "debt_date",
            key: "debt_date",           
        },
        {
            title: "Статус",
            dataIndex: "status",
            key: "status",
        },
         {
            title: "услуги/товары",
            dataIndex: "partner_name",
            key: "partner_name",
        },
    ];
    return (
        <Table
            columns={columns}
            dataSource={initData}
            scroll={{ x: 1000 }}
            style={{ maxWidth: '100%' }}
            pagination={{
              defaultPageSize: 50,
            }}
          />
        )
        
        // <div>
        
        //     <Modal

        //             title={(
        //                 <div className={cls.modalHeading}>
        //                     <Typography.Title level={4}>
        //                         Добавить сделку
        //                     </Typography.Title>
        //                 </div>
        //             )}
        //                     styles={{
        //                         body: {}
        //                     }}
        //                     style={{
        //                         marginTop: '-80px',
        //                     }} width={'100%'}
        //                     open={isModalOpen}
        //                     onCancel={onClose}
        //                     footer={[
        //                         <div className={cls.modalFooter}>
        //                             {/* <Button onClick={(e) => handleOk(e)} type="primary">Редактировать</Button> */}
        //                             <Button onClick={onClose}>Закрыть</Button>
        //                             {/* <Button onClick={handleDelete} danger type="primary">Удалить</Button> */}
        //                         </div>
        //                     ]}
        //             >

        //         <div style={{display: 'flex', gap: '25px', height: "75vh"}}>
        //             {/* <CreateDealPatch 
        //                 data={result.data}
        //                  isLoading={result.isLoading} 
        //                  setIsLoadingSpin={setIsLoadingSpin}
        //                  initData={initData} 
        //                  setInitData={setInitData} 
        //                  updateData={updateData} 
        //                  setUdateData={setUdateData} 
        //                  setRowClickLoading={setRowClickLoading} 
        //                  rowClickLoading={rowClickLoading} 
        //                  uuid={handleUUID}/>
        //             <Chat/> */}
        //         </div>

        //     </Modal>

        // </div>

    

        
        

    

};

