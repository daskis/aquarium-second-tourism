import {DatePicker, DatePickerProps, Table, Typography} from "antd";
import {formatDataForTable} from "@/utils/hooks";
import {ColumnsType} from "antd/es/table";
import cls from "./SuitcaseReports.module.scss"
import {ReactNode, useEffect, useState} from "react";
import {DownloadOutlined} from '@ant-design/icons';
import {LoadingOutlined} from '@ant-design/icons';
import {Spin, Button} from 'antd';
import {useLazyGetSuitcaseReportsQuery} from "@/store/services/ReportsApi.ts";
import dayjs from "dayjs";

const antIcon = <LoadingOutlined style={{fontSize: 52}} spin/>;

interface DataItem {
    key: string;
    name: string;
    date: string | ReactNode;
    term: string;
    amount: string;
    dividends: number;
    withdrow_dividends: number;
    dividends_left: number;
    withdrow_investment: number;
    sum_investments: number;
}

export const SuitcaseReports = () => {
    const [data, setData] = useState<string | null>()
    const [date, setDate] = useState<any>(dayjs().format('YYYY-MM'))
    // const [data, setData] = useState<FormattedData>()
    const [trigger, initialData] = useLazyGetSuitcaseReportsQuery()
    const handleData: DatePickerProps['onChange'] = (date, dateString) => {
        trigger(dateString)
    }

    const columns: ColumnsType<DataItem> = [
        {title: 'ФИО инвестора', dataIndex: 'name', key: 'name', fixed: 'left'},
        {
            title: 'Дата инвестиций', dataIndex: 'date', key: 'date', align: 'center',
            render: (text) => {
                return (
                    <div className={"dateTd"}>
                        <span>{dayjs(text[0]).format('YYYY-MM-DD')}</span>
                        {dayjs(text[1]).format('YYYY-MM-DD') ? <span>{dayjs(text[1]).format('YYYY-MM-DD')}</span> : ""}
                    </div>
                )
            }
        }, // Центрирование по горизонтали
        {
            title: 'Срок инвестиций', dataIndex: 'term', key: 'term', align: 'center', render: (text) => {
                return (
                    <div className={"dateTd"}>
                        <span>{text[0]}</span>
                        {text[1] ? <span>{text[1]}</span> : ""}
                    </div>
                )
            }
        },
        {
            title: 'Сумма инвестиций', dataIndex: 'amount', key: 'amount', align: 'center', render: (text) => {
                return (
                    <div className={"dateTd"}>
                        <span>{text[0]}</span>
                        {text[1] ? <span>{text[1]}</span> : ""}
                    </div>
                )
            }
        },
        {title: 'Начисленные дивиденты', dataIndex: 'dividends', key: 'dividends', align: 'center'},
        {title: 'Выплаченные дивиденты', dataIndex: 'withdrow_dividends', key: 'withdrow_dividends', align: 'center'},
        {title: 'Остаток дивидендов', dataIndex: 'dividends_left', key: 'dividends_left', align: 'center'},
        {
            title: 'Сумма инкассации инвестиций',
            dataIndex: 'withdrow_investment',
            key: 'withdrow_investment',
            align: 'center'
        },
        {
            title: 'Капитал на конец',
            dataIndex: 'sum_investments',
            key: 'sum_investments',
            fixed: 'right',
            align: 'center'
        },
    ];
    useEffect(() => {
        trigger(date)
    }, [date]);
    useEffect(() => {
        if (initialData.isSuccess) {
            setData(formatDataForTable(initialData.data))
        }
    }, [initialData])

    if (!initialData.isLoading) {
        return (
            <div className={cls.wrapper}>
                <div className={cls.heading}>
                    <Typography.Title>Портфель инвестора</Typography.Title>

                    <div>
                        <Button style={{margin: '0 10px'}} type="primary" icon={<DownloadOutlined/>}>.xlsx</Button>
                        <DatePicker
                            value={date ? dayjs(date) : dayjs()}
                            onChange={(date, dateString) => {
                                setDate(dateString)
                            }}
                            style={{marginBottom: '15px'}}
                            placeholder="Выберите дату"/>
                    </div>
                </div>
                <Table
                    columns={columns}
                    scroll={{x: 1000}}
                    bordered={true}

                    dataSource={data}
                    pagination={false}
                />
            </div>
        );
    } else {
        return (
            <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Spin indicator={antIcon}/>
            </div>
        );
    }
};
