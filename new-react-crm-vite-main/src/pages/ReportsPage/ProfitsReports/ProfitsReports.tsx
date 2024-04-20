import cls from "./ProfitsReports.module.scss"
import type {TabsProps} from 'antd';
import {DatePicker, Spin, Tabs, Typography} from "antd";
import {ProfitsButtonEnum} from "@/types";
import {formatDataForProfits, getLastDayOfMonth, getPreviousMonths} from "@/utils/hooks";
import {
    useGetProfitsReportsQuery,
    useLazyGetProfitsReportsQuery,
    useLazyGetSuitcaseReportsQuery
} from "@/store/services/ReportsApi.ts";
import {useEffect, useState} from "react";
import AccuralMethod from "./AccuralMethod/AccuralMethod.tsx";
import CashMethod from "./CashMethod/CashMethod.tsx";

import {LoadingOutlined} from '@ant-design/icons';
import {v4} from "uuid";
import dayjs from "dayjs";

const antIcon = <LoadingOutlined style={{fontSize: 52}} spin/>;


export interface DateItem {
    debt_amount: string
    cost_price: string
    gross_profit: string
    gross_profit_percent: string
    expenses: {
        salary: number,
        rent: number,
        gsm: number,
        advertisement: number
    }
    client_overpay: string
    discount: string
    net_profit: string
    net_profit_percent: string
}


export const ProfitsReports = () => {
    const [date, setDate] = useState<any>(dayjs().format('YYYY-MM'))
    const [months, setMonths] = useState([])
    const [trigger, data] = useLazyGetProfitsReportsQuery()

    const [currentTab, setCurrentTab] = useState<ProfitsButtonEnum>(ProfitsButtonEnum.GROSS)


    useEffect(() => {
        if (date) {
            const obj = {
                date_start: date + "-01",
                date_end: date + "-" + getLastDayOfMonth(date),
                profit_method: currentTab
            }
            setMonths(getPreviousMonths(date))
            trigger(obj)
            setDate(date)
        }
    }, [date]);
    const handleData = (_: any, timeString: string) => {
        if (timeString) {
            const obj = {
                date_start: timeString + "-01",
                date_end: timeString + "-" + getLastDayOfMonth(timeString),
                profit_method: currentTab
            }
            setMonths(getPreviousMonths(timeString))
            trigger(obj)
            setDate(timeString)
        }
    }

    useEffect(() => {
        if (data.data) {
            formatDataForProfits(data.data)
        }
    }, [data]);

    const onChange = (key: string) => {
        if (Number(key) === 1) {
            if (date) {
                const obj = {
                    date_start: date + "-01",
                    date_end: date + "-" + getLastDayOfMonth(date),
                    profit_method: ProfitsButtonEnum.GROSS
                }
                trigger(obj)
            }
            setCurrentTab(ProfitsButtonEnum.GROSS)
        } else if (Number(key) === 2) {
            if (date) {
                const obj = {
                    date_start: date + "-01",
                    date_end: date + "-" + getLastDayOfMonth(date),
                    profit_method: ProfitsButtonEnum.CASH
                }
                trigger(obj)
            }
            setCurrentTab(ProfitsButtonEnum.CASH)
        }
    };

    const items: TabsProps['items'] = [
        {
            key: 1,
            label: 'Метод начисления',
            children: <AccuralMethod months={months} data={data.data}/>,
        },
        {
            key: 2,
            label: 'Кассовый метод',
            children: <CashMethod months={months} data={data.data}/>,
        },
    ];

    if (data) {
        return (
            <div className={cls.wrapper}>
                <div className={cls.heading}>
                    <Typography.Title>Отчет о прибылях и убытках</Typography.Title>
                    <DatePicker
                        style={{width: '150px'}}
                        value={date ? dayjs(date) : dayjs()}
                        onChange={(date, dateString) => {
                            setDate(dateString)
                        }}
                        picker="month"
                        placeholder="Выберите дату"/>
                </div>
                <div>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
                </div>
            </div>
        );
    } else {
        return (
            <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Spin indicator={antIcon}/>
            </div>
        )
    }
};

