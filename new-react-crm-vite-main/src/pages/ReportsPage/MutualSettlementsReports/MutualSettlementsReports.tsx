import {ColumnsType} from "antd/es/table";
import {ISettlementsReports, SettlementsTypeEnum} from "@/types";
import {
    useLazyGetSettlementsReportsQuery

} from "@/store/services/ReportsApi.ts";
import {DatePicker, Table, Tabs, TabsProps, Typography, Button, Empty, Spin} from "antd";
import cls from "./MutualSettlementsReports.module.scss"
import dayjs from "dayjs";
import {DownloadOutlined} from '@ant-design/icons';
import {useEffect, useState} from "react";
import moment from "moment";


export const MutualSettlementsReports = () => {
    const [currentTab, setCurrentTab] = useState<number>(1)
    const [trigger, data, loading, ] = useLazyGetSettlementsReportsQuery()
    const [date, setDate] = useState<string[]>([])
    const [status, setStatus] = useState<any>([
        {
            isLoading: undefined,
            isSuccess: undefined
        },
        {
            isLoading: undefined,
            isSuccess: undefined
        },
        {
            isLoading: undefined,
            isSuccess: undefined
        },
    ])
    const columns: ColumnsType<ISettlementsReports> = [
        {
            title: "Наименование",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Задолженность на начало",
            dataIndex: "date_before",
            key: "date_before"
        },
        {
            title: "Выплачено",
            dataIndex: "debt_increase",
            key: "debt_increase"
        },
        {
            title: "Начислено",
            dataIndex: "debt_decrease",
            key: "debt_decrease"
        },
        {
            title: "Задолженность на конец",
            dataIndex: "date_after",
            key: "date_after"
        },
    ]
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Зарплата',
        },
        {
            key: '2',
            label: 'Партнеры',
        },
        {
            key: '3',
            label: 'Прочее',
        }
        ,
    ]
    const handleData = (date: any, dateString: string[]) => {
        setDate(dateString)
        switch (currentTab) {
            case 1:
                trigger({type: SettlementsTypeEnum.SALARY, date: dateString})
                break
            case 2:
                trigger({type: SettlementsTypeEnum.PARTNERS, date: dateString})
                break
            case 3:
                trigger({type: SettlementsTypeEnum.SUPPLIERS, date: dateString})
                break
            default:
                break
        }
    }
    const disabledDate = (current) => {
        return current && current > moment().endOf('day')
    };
    const onChange = (key: string) => {
        setCurrentTab(Number(key))
        switch (Number(key)) {
            case 1:
                trigger({type: SettlementsTypeEnum.SALARY, date: date})
                break
            case 2:
                trigger({type: SettlementsTypeEnum.PARTNERS, date: date})
                break
            case 3:
                trigger({type: SettlementsTypeEnum.SUPPLIERS, date: date})
                break
            default:
                break
        }
    }
    return (
        <div className={cls.wrapper}>
            <div className={cls.heading}>
                <div className={cls.optionsWrapper}>
                    <Typography.Title>Отчет о взаиморасчетах</Typography.Title>
                </div>
                <div>
                    <Button style={{margin: '0 10px'}} type="primary" icon={<DownloadOutlined/>}>.xlsx</Button>
                    <DatePicker.RangePicker
                        defaultValue={[null, dayjs()]}
                        disabled={[false, false]}
                        disabledDate={disabledDate}
                        onChange={handleData}
                        placeholder={["Дата начала", "Дата конца"]}
                    />
                </div>
            </div>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
            <Table scroll={{x: 800}} dataSource={data.data} columns={columns}/>
            {/*{status[0]?.isSuccess !== undefined && <Table scroll={{x: 800}} dataSource={data.data} columns={columns}/>}*/}
            {/*{status[1].isSuccess && <Table scroll={{x: 800}} dataSource={data.data} columns={columns}/>}*/}
            {/*{status[2].isSuccess && <Table scroll={{x: 800}} dataSource={data.data} columns={columns}/>}*/}
            {/*{!data.isLoading ? <Table scroll={{x: 800}} dataSource={data.data} columns={columns}/> : <Table scroll={{x: 800}} dataSource={null} columns={columns}/>}*/}
        </div>
    );
};

