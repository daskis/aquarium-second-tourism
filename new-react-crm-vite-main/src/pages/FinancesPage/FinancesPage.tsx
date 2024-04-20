import cls from "./FinancesPage.module.scss"
import {
    Button,
    Input,
    DatePicker,
    Dropdown,
    Menu,
    MenuProps,
    Modal,
    Select,
    Table,
    Typography, Upload,
    UploadProps, Drawer, Space, Checkbox
} from "antd";
import {ColumnsType} from "antd/es/table";
import {FinancesSendType, IFinancesColumns} from "@/types";
import {useEffect, useState} from "react";
import {Filters} from "@/components";
import {DownloadOutlined} from '@ant-design/icons';

import {
    useGetEmployeeQuery, useGetExpencesQuery,
    useGetFinancesQuery, useGetInvesotrsQuery, useGetLendersQuery, useGetLoansQuery, useGetSupplierQuery,
    useLazyGetDetailedFinanceQuery, useLazyGetFilteredFinancesQuery,
    usePatchFinancesMutation,
    useSendFinanceMutation
} from "@/store/services/FinancesApi.ts";
import * as dayjs from "dayjs"
import cn from "classnames"
import {getKeyByValue} from "@/utils/hooks";
import moment from "moment";
export const checkboxCategories = [
    { name: 'loan_payment', label: 'Оплата по сделке' },
    { name: 'initial_fee', label: 'Первоначальный взнос' },
    { name: 'partner_expense', label: 'Оплата партнеру' },
    { name: 'discount', label: 'Скидка клиенту' },
    { name: 'other_expense', label: 'Прочие расходы' },
    { name: 'salary', label: 'Зарплата' },
    { name: 'product_expense', label: 'Покупка мат. ценностей' },
    { name: 'invest_expense', label: 'Выплата инвестиций' },
    { name: 'investment', label: 'Поступление инвестиций' },
    { name: 'client_overpay', label: 'Переплата по сделке' },
    { name: 'loan_expense', label: 'Займ' },
    { name: 'undefined', label: 'Невыясненные платежи' },
];
const {Dragger} = Upload;
const FinancesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentModal, setCurrentModal] = useState<number>(1)
    const {data, refetch} = useGetFinancesQuery(null)
    const [patchTrigger, {data: patchData, error: patchError}] = usePatchFinancesMutation()
    const [postTrigger, {data: postData, error: postError}] = useSendFinanceMutation()
    const [getFinance] = useLazyGetDetailedFinanceQuery()
    const [filtersData, setFiltersData] = useState<any>({}); // Состояние для данных фильтров
    const [isFiltersSuccess, setIsFiltersSuccess] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [sendInfo, setSendInfo] = useState<any>({})
    const [currentFinanceId, setCurrentFinanceId] = useState("")
    const [postUrl, setPostUrl] = useState("")
    const {data: investorsData} = useGetInvesotrsQuery(null)
    const {data: loansData} = useGetLoansQuery(null)
    const {data: employeeData} = useGetEmployeeQuery(null)
    const {data: lenderData} = useGetLendersQuery(null)
    const {data: expencesData} = useGetExpencesQuery(null)
    const {data: supplierData} = useGetSupplierQuery(null)
    const [investors, setInvestors] = useState<any>()
    const [loans, setLoans] = useState<any>()
    const [employees, setEmployees] = useState<any>()
    const [lender, setLender] = useState<any>()
    const [expences, setExpences] = useState<any>()
    const [supplier, setSupplier] = useState<any>()
    const [errors, setErrors] = useState<any>({})
    const [sendType, setSendType] = useState<FinancesSendType | undefined>(FinancesSendType.POST)
    const [modalType, setModalType] = useState({
        partner_expenses: 1,
        discount: 2,
        other_expenses: 3,
        salary_expenses: 4,
        loan_expenses: 5,
        product_expenses: 6,
        investor_expenses: 7,
        incoming_investment: 8,
        client_overpay: 9,
        incoming_undefined: 10,
        payment: 11
    })
    const [changedFields, setChangedFields] = useState({})
    const [updateQuery, setUpdateQuery] = useState(0);
    useEffect(() => {
        if (investorsData) {
            const arr: any = []
            investorsData.forEach((item, i) => {
                arr.push({
                    value: item.id,
                    label: `${item.first_name} ${item.surname} ${item.middle_name}`
                })
            })
            setInvestors(arr)
        }
    }, [investorsData]);
    useEffect(() => {
        if (employeeData) {
            const arr: any = []
            employeeData.forEach((item, i) => {
                arr.push({
                    value: item.id,
                    label: `${item.first_name} ${item.surname} ${item.middle_name}`
                })
            })
            setEmployees(arr)
        }
    }, [employeeData]);
    useEffect(() => {
        if (lenderData) {
            const arr: any = []
            lenderData.forEach((item, i) => {
                arr.push({
                    value: item.id,
                    label: `${item.first_name} ${item.surname} ${item.middle_name}`
                })
            })
            setLender(arr)
        }
    }, [lenderData]);
    useEffect(() => {
        if (expencesData) {
            const arr: any = []
            expencesData.forEach((item, i) => {
                arr.push({
                    value: item.id,
                    label: item.name
                })
            })
            setExpences(arr)
        }
    }, [expencesData]);
    useEffect(() => {
        if (supplierData) {
            const arr: any = []
            supplierData.forEach((item, i) => {
                arr.push({
                    value: item.id,
                    label: item.name
                })
            })
            setSupplier(arr)
        }
    }, [supplierData]);
    useEffect(() => {
        if (loansData) {
            const arr: any = []
            loansData.forEach((item, i) => {
                arr.push({
                    value: item.id,
                    label: item.debt_num
                })
            })
            setLoans(arr)
        }
    }, [loansData]);
    useEffect(() => {
        if (postError) {
            setErrors(postError.data)
        }
    }, [postError]);
    useEffect(() => {
        if (patchError) {
            setErrors(patchError.data)
        }
    }, [patchError]);
    useEffect(() => {
        if (postData) {
            setErrors({})
            setIsModalOpen(false)
            setSendInfo({})
        }
    }, [postData]);
    useEffect(() => {
        if (patchData) {
            setErrors({})
            setIsModalOpen(false)
            setSendInfo({})
        }
    }, [patchData]);
    const [fileList, setFileList] = useState([]);
    useEffect(() => {
        if (data) {
            refetch()
        }
        return
    }, [updateQuery]);
    const handleFiltersChange = ({data, isSuccess}) => {
        if (isSuccess) {
            setIsFiltersSuccess(true)
            refetch()
            setFiltersData(data); // Функция обратного вызова для обновления данных фильтров
        }
    };
    const props: UploadProps = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status === 'done') {
                setFileList(info.fileList);
            }
        },
    };
    const sendData = async () => {
        if (postUrl === "payment") {
            const formData = new FormData();

            // Добавляем данные из sendData в formData
            Object.keys(changedFields).forEach((key) => {
                formData.append(key, changedFields[key]);
            });

            // Добавляем файл из Upload в formData
            if (fileList.length > 0) {
                const file = fileList[0].originFileObj;
                formData.append('bill_photo', file);F
            }

            // Отправляем formData
            try {
                if (sendType === FinancesSendType.POST) {
                    console.log(sendInfo)
                    await postTrigger({url: postUrl, body: formData});
                } else {
                    await patchTrigger({url: postUrl, id: currentFinanceId, body: formData});
                }
                // После успешного запроса можно сбросить данные и список файлов
                refetch()
                setUpdateQuery(prevState => prevState+=1)
                setSendInfo({});
                setChangedFields({})
                setFileList([]);
            } catch (error) {
                console.error('Error sending data:', error);
            }
        } else {
            try {
                if (sendType === FinancesSendType.POST) {
                    await postTrigger({url: postUrl, body: sendInfo});
                } else {
                    await patchTrigger({url: postUrl, id: currentFinanceId, body: sendInfo});
                }
                refetch()
                setUpdateQuery(prevState => prevState+=1)
                setFileList([]);
            } catch (error) {
                console.error('Error sending data:', error);
            }
        }
    };


    const handleRowClick = async (record) => {
        if (record.url !== "no_route") {
            try {
                if (record.url === "partner_expenses") {
                    const result: any = await getFinance({url: record.url, id: record.id});
                    const info = result.data;
                    setSendInfo({
                        amount: info.amount,
                        operation_date: info.operation_date,
                        operation_type: info.operation_type,
                        income_type: info.income_type,
                        loan: info.loan
                    });
                }
                if (record.url === "discount") {
                    const result: any = await getFinance({url: record.url, id: record.id});
                    const info = result.data;
                    setSendInfo({
                        amount: info.amount,
                        operation_date: info.operation_date,
                        operation_type: info.operation_type,
                        loan: info.loan
                    });
                }
                if (record.url === "other_expenses") {
                    const result: any = await getFinance({url: record.url, id: record.id});
                    const info = result.data;
                    setSendInfo({
                        amount: info.amount,
                        operation_date: info.operation_date,
                        operation_type: info.operation_type,
                        expensestype: info.expensestype,
                        supplier: info.supplier
                    });
                }
                if (record.url === "salary_expenses") {
                    const result: any = await getFinance({url: record.url, id: record.id});
                    const info = result.data;
                    setSendInfo({
                        amount: info.amount,
                        operation_date: info.operation_date,
                        operation_type: info.operation_type,
                        employee: info.employee,
                    });
                }
                if (record.url === "loan_expenses") {
                    const result: any = await getFinance({url: record.url, id: record.id});
                    const info = result.data;
                    setSendInfo({
                        amount: info.amount,
                        operation_date: info.operation_date,
                        operation_type: info.operation_type,
                        lender: info.lender,
                    });
                }
                if (record.url === "product_expenses") {
                    const result: any = await getFinance({url: record.url, id: record.id});
                    const info = result.data;
                    setSendInfo({
                        amount: info.amount,
                        operation_date: info.operation_date,
                        operation_type: info.operation_type,
                        name: info.name,
                    });
                }
                if (record.url === "investor_expenses") {
                    const result: any = await getFinance({url: record.url, id: record.id});
                    const info = result.data;
                    setSendInfo({
                        amount: info.amount,
                        operation_date: info.operation_date,
                        operation_type: info.operation_type,
                        withdraw_type: info.withdraw_type,
                        investor: info.investor,
                    });
                }
                if (record.url === "incoming_investment") {
                    const result: any = await getFinance({url: record.url, id: record.id});
                    const info = result.data;
                    setSendInfo({
                        amount: info.amount,
                        operation_date: info.operation_date,
                        operation_type: info.operation_type,
                        debt_num: info.debt_num,
                        investment_term: info.investment_term,
                        profit_percent: info.profit_percent,
                        investor: info.investor,
                    });
                }
                if (record.url === "client_overpay") {
                    const result: any = await getFinance({url: record.url, id: record.id});
                    const info = result.data;
                    setSendInfo({
                        amount: info.amount,
                        operation_date: info.operation_date,
                        operation_type: info.operation_type,
                        loan: info.loan,
                    });
                }
                if (record.url === "incoming_undefined") {
                    const result: any = await getFinance({url: record.url, id: record.id});
                    const info = result.data;
                    setSendInfo({
                        amount: info.amount,
                        operation_date: info.operation_date,
                        operation_type: info.operation_type,
                    });
                }
                if (record.url === "payment") {
                    const result: any = await getFinance({url: record.url, id: record.id});
                    const info = result.data;
                    setSendInfo({
                        payment_amount: info.payment_amount,
                        payment_date: info.payment_date,
                        comment: info.comment,
                        delay_days: info.delay_days,
                        status: info.status,
                        loan: info.loan,
                        bill_photo: info.bill_photo,
                    });
                }
                setPostUrl(record.url);
                setSendType(FinancesSendType.PATCH);
                setCurrentModal(modalType[record.url]);
                setCurrentFinanceId(record.id);
                showModal();
            } catch (error) {
                // Обработка ошибки, если запрос не удался
                console.error("Ошибка при получении данных:", error);
            }
        }
    };

    const modals = [
        {
            children:
                <div className={cls.partner}>
                    <span className={cls.title}>Партнер</span>
                    <div className={cls.grid}>
                        <Typography.Title level={5}>Сумма</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.amount}</span>
                            <Input
                                onChange={(e) => {
                                    setSendInfo((prevState) => ({
                                        ...prevState,
                                        amount: e.target.value
                                    }))
                                }}
                                value={sendInfo.amount || ""}
                                className={cn(cls.input, {
                                    [cls.errorBorder]: errors.amount
                                })}
                                type="number"/>
                        </div>

                        <Typography.Title level={5}>Дата</Typography.Title>

                        {sendInfo.operation_date ?
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.operation_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.operation_date
                                    })}
                                    value={sendInfo.operation_date ? dayjs(sendInfo.operation_date) : dayjs()}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            operation_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                            :
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.operation_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.operation_date
                                    })}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            operation_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                        }
                        <Typography.Title level={5}>Вид операции</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.operation_type}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.operation_type
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        operation_type: value
                                    }))
                                }}
                                style={{width: '100%'}}
                                value={sendInfo.operation_type}
                                options={[{value: 'Поступление', label: 'Поступление'}, {
                                    value: 'Выплата',
                                    label: 'Выплата'
                                }, {value: 'Начисление', label: 'Начисление'}]}/>
                        </div>

                        <Typography.Title level={5}>Вид поступления</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.income_type}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.income_type
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        income_type: value
                                    }))
                                }}
                                style={{width: '100%'}}
                                value={sendInfo.income_type}
                                options={[{value: 'Отмена сделки', label: 'Отмена сделки'}, {
                                    value: 'Переплата',
                                    label: 'Переплата'
                                }]}/>
                        </div>


                        <Typography.Title level={5}>Договор</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.loan}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.loan
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        loan: value
                                    }))
                                }}
                                style={{width: '100%'}}
                                value={sendInfo.loan}
                                options={loans}/>
                            {/*<Input*/}
                            {/*    onChange={(e) => {*/}
                            {/*        setSendInfo(prevState => ({*/}
                            {/*            ...prevState,*/}
                            {/*            loan: e.target.value*/}
                            {/*        }))*/}
                            {/*    }}*/}
                            {/*    value={sendInfo.loan || ""}*/}
                            {/*    className={cn(cls.input, {*/}
                            {/*        [cls.errorBorder]: errors.loan*/}
                            {/*    })} type="text"/>*/}
                        </div>
                    </div>
                </div>,
        },
        {
            children:
                <div className={cls.sale}>
                    <span className={cls.title}>Скидка</span>
                    <div className={cls.grid}>
                        <Typography.Title level={5}>Сумма</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.amount}</span>
                            <Input
                                onChange={(e) => {
                                    setSendInfo((prevState) => ({
                                        ...prevState,
                                        amount: e.target.value
                                    }))
                                }}
                                value={sendInfo.amount || ""}
                                className={cn(cls.input, {
                                    [cls.errorBorder]: errors.amount
                                })} type="number"/>
                        </div>

                        <Typography.Title level={5}>Дата</Typography.Title>
                        {sendInfo.operation_date ?
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.operation_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.operation_date
                                    })}
                                    value={sendInfo.operation_date ? dayjs(sendInfo.operation_date) : dayjs()}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            operation_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                            :
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.operation_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.operation_date
                                    })}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            operation_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                        }
                        <Typography.Title level={5}>Вид операции</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.operation_type}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.operation_type
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        operation_type: value
                                    }))
                                }}
                                style={{width: '100%'}}
                                value={sendInfo.operation_type}
                                options={[{value: 'Поступление', label: 'Поступление'}, {
                                    value: 'Выплата',
                                    label: 'Выплата'
                                }, {value: 'Начисление', label: 'Начисление'}]}/>
                        </div>
                        <Typography.Title level={5}>Договор</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.loan}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.loan
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        loan: value
                                    }))
                                }}
                                style={{width: '100%'}}
                                value={sendInfo.loan}
                                options={loans}/>
                            {/*<Input*/}
                            {/*    onChange={(e) => {*/}
                            {/*        setSendInfo(prevState => ({*/}
                            {/*            ...prevState,*/}
                            {/*            loan: e.target.value*/}
                            {/*        }))*/}
                            {/*    }}*/}
                            {/*    value={sendInfo.loan || ""}*/}
                            {/*    className={cn(cls.input, {*/}
                            {/*        [cls.errorBorder]: errors.loan*/}
                            {/*    })} type="text"/>*/}
                        </div>
                    </div>
                </div>,
        },
        {
            children:
                <div className={cls.other}>
                    <span className={cls.title}>Прочие расходы</span>
                    <div className={cls.grid}>
                        <Typography.Title level={5}>Сумма</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.amount}</span>
                            <Input
                                onChange={(e) => {
                                    setSendInfo((prevState) => ({
                                        ...prevState,
                                        amount: e.target.value
                                    }))
                                }}
                                value={sendInfo.amount || ""}
                                className={cn(cls.input, {
                                    [cls.errorBorder]: errors.amount
                                })} type="number"/>
                        </div>

                        <Typography.Title level={5}>Дата</Typography.Title>
                        {sendInfo.operation_date ?
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.operation_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.operation_date
                                    })}
                                    value={sendInfo.operation_date ? dayjs(sendInfo.operation_date) : dayjs()}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            operation_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                            :
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.operation_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.operation_date
                                    })}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            operation_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                        }
                        <Typography.Title level={5}>Вид операции</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.operation_type}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.operation_type
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        operation_type: value
                                    }))
                                }}
                                style={{width: '100%'}}
                                value={sendInfo.operation_type}
                                options={[{value: 'Поступление', label: 'Поступление'}, {
                                    value: 'Выплата',
                                    label: 'Выплата'
                                }, {value: 'Начисление', label: 'Начисление'}]}/>
                        </div>

                        <Typography.Title level={5}>Вид расходов</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.expensestype}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.expensestype
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        expensestype: value
                                    }))
                                }}
                                style={{width: '100%'}}
                                value={sendInfo.expensestype}
                                options={expences}/>
                        </div>
                        <Typography.Title level={5}>Поставщик</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.supplier}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.supplier
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        supplier: value
                                    }))
                                }}
                                style={{width: '100%'}}
                                value={sendInfo.supplier}
                                options={supplier}/>
                        </div>
                    </div>
                </div>,
        },
        {
            children:
                <div className={cls.salary}>
                    <span className={cls.title}>Зарплаты</span>
                    <div className={cls.grid}>
                        <Typography.Title level={5}>Сумма</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.amount}</span>
                            <Input
                                onChange={(e) => {
                                    setSendInfo((prevState) => ({
                                        ...prevState,
                                        amount: e.target.value
                                    }))
                                }}
                                value={sendInfo.amount || ""}
                                className={cn(cls.input, {
                                    [cls.errorBorder]: errors.amount
                                })} type="number"/>
                        </div>

                        <Typography.Title level={5}>Дата</Typography.Title>
                        {sendInfo.operation_date ?
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.operation_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.operation_date
                                    })}
                                    value={sendInfo.operation_date ? dayjs(sendInfo.operation_date) : dayjs()}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            operation_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                            :
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.operation_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.operation_date
                                    })}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            operation_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                        }
                        <Typography.Title level={5}>Вид операции</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.operation_type}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.operation_type
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        operation_type: value
                                    }))
                                }}
                                style={{width: '100%'}}
                                value={sendInfo.operation_type}
                                options={[{value: 'Поступление', label: 'Поступление'}, {
                                    value: 'Выплата',
                                    label: 'Выплата'
                                }, {value: 'Начисление', label: 'Начисление'}]}/>
                        </div>


                        <Typography.Title level={5}>Сотрудник</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.employee}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.employee
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        employee: value
                                    }))
                                }}
                                style={{width: '100%'}}
                                value={sendInfo.employee}
                                options={employees}
                            />
                        </div>
                    </div>
                </div>,
        },
        {
            children:
                <div className={cls.borrow}>
                    <span className={cls.title}>Займ</span>
                    <div className={cls.grid}>
                        <Typography.Title level={5}>Сумма</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.amount}</span>
                            <Input
                                onChange={(e) => {
                                    setSendInfo((prevState) => ({
                                        ...prevState,
                                        amount: e.target.value
                                    }))
                                }}
                                value={sendInfo.amount || ""}
                                className={cn(cls.input, {
                                    [cls.errorBorder]: errors.amount
                                })} type="number"/>
                        </div>

                        <Typography.Title level={5}>Дата</Typography.Title>
                        {sendInfo.operation_date ?
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.operation_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.operation_date
                                    })}
                                    value={sendInfo.operation_date ? dayjs(sendInfo.operation_date) : dayjs()}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            operation_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                            :
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.operation_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.operation_date
                                    })}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            operation_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                        }


                        <Typography.Title level={5}>Вид операции</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.operation_type}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.operation_type
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        operation_type: value
                                    }))
                                }}
                                style={{width: '100%'}}
                                value={sendInfo.operation_type}
                                options={[{value: 'Поступление', label: 'Поступление'}, {
                                    value: 'Выплата',
                                    label: 'Выплата'
                                }, {value: 'Начисление', label: 'Начисление'}]}/>
                        </div>


                        <Typography.Title level={5}>Займодатель</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.lender}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.lender
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        lender: value
                                    }))
                                }}
                                style={{width: '100%'}}
                                value={sendInfo.lender}
                                options={lender}/>
                        </div>
                    </div>
                    {/*{ivalue ? <CreateInvestor openCreateInvestor={openCreateInvestor}*/}
                    {/*                          setOpenCreateInvestor={setOpenCreateInvestor}/> : ''}*/}
                </div>,
        },
        {
            children:
                <div className={cls.material}>
                    <span className={cls.title}>Материальные ценности</span>
                    <div className={cls.grid}>
                        <Typography.Title level={5}>Сумма</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.amount}</span>
                            <Input
                                onChange={(e) => {
                                    setSendInfo((prevState) => ({
                                        ...prevState,
                                        amount: e.target.value
                                    }))
                                }}
                                value={sendInfo.amount || ""}
                                className={cn(cls.input, {
                                    [cls.errorBorder]: errors.amount
                                })} type="number"/>
                        </div>
                        <Typography.Title level={5}>Дата</Typography.Title>
                        {sendInfo.operation_date ?
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.operation_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.operation_date
                                    })}
                                    value={sendInfo.operation_date ? dayjs(sendInfo.operation_date) : dayjs()}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            operation_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                            :
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.operation_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.operation_date
                                    })}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            operation_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                        }

                        <Typography.Title level={5}>Вид операции</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.operation_type}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.operation_type
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        operation_type: value
                                    }))
                                }}
                                style={{width: '100%'}}
                                value={sendInfo.operation_type}
                                options={[{value: 'Поступление', label: 'Поступление'}, {
                                    value: 'Выплата',
                                    label: 'Выплата'
                                }, {value: 'Начисление', label: 'Начисление'}]}/>
                        </div>
                        <Typography.Title level={5}>Товар</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.name}</span>
                            <Input
                                className={cn(cls.input, {
                                    [cls.errorBorder]: errors.name
                                })}
                                onChange={(e) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        name: e.target.value
                                    }))
                                }}
                                value={sendInfo.name || ""}
                                type="text"/>
                        </div>
                    </div>

                </div>,
        },
        {
            children:
                <div className={cls.investor}>
                    <span className={cls.title}>Выплата инвестору</span>
                    <div className={cls.grid}>
                        <Typography.Title level={5}>Сумма</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.amount}</span>
                            <Input
                                onChange={(e) => {
                                    setSendInfo((prevState) => ({
                                        ...prevState,
                                        amount: e.target.value
                                    }))
                                }}
                                value={sendInfo.amount || ""}
                                className={cn(cls.input, {
                                    [cls.errorBorder]: errors.amount
                                })} type="number"/>
                        </div>

                        <Typography.Title level={5}>Дата</Typography.Title>
                        {sendInfo.operation_date ?
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.operation_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.operation_date
                                    })}
                                    value={sendInfo.operation_date ? dayjs(sendInfo.operation_date) : dayjs()}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            operation_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                            :
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.operation_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.operation_date
                                    })}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            operation_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                        }


                        <Typography.Title level={5}>Вид операции</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.operation_type}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.operation_type
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        operation_type: value
                                    }))
                                }}
                                style={{width: '100%'}}
                                value={sendInfo.operation_type}
                                options={[{value: 'Поступление', label: 'Поступление'}, {
                                    value: 'Выплата',
                                    label: 'Выплата'
                                }, {value: 'Начисление', label: 'Начисление'}]}/>
                        </div>


                        <Typography.Title level={5}>Тип выплаты</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.withdraw_type}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.withdraw_type
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        withdraw_type: value
                                    }))
                                }}
                                style={{width: '100%'}}
                                value={sendInfo.withdraw_type}
                                options={[
                                    {value: 'Инвестиции', label: 'Инвестиции'},
                                    {value: 'Дивиденды', label: 'Дивиденды'},
                                ]}/>
                        </div>


                        <Typography.Title level={5}>Инвестор</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.investor}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.investor
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        investor: value
                                    }))
                                }}
                                options={investors}
                            />
                        </div>
                    </div>
                </div>,
        },
        {
            children:
                <div className={cls.investing}>
                    <span className={cls.title}>Инвестиции</span>
                    <div className={cls.grid}>
                        <Typography.Title level={5}>Сумма</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.amount}</span>
                            <Input
                                onChange={(e) => {
                                    setSendInfo((prevState) => ({
                                        ...prevState,
                                        amount: e.target.value
                                    }))
                                }}
                                value={sendInfo.amount || ""}
                                className={cn(cls.input, {
                                    [cls.errorBorder]: errors.amount
                                })} type="number"/>
                        </div>

                        <Typography.Title level={5}>Дата</Typography.Title>
                        {sendInfo.operation_date ?
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.operation_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.operation_date
                                    })}
                                    value={sendInfo.operation_date ? dayjs(sendInfo.operation_date) : dayjs()}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            operation_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                            :
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.operation_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.operation_date
                                    })}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            operation_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                        }

                        <Typography.Title level={5}>Вид операции</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.operation_type}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.operation_type
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        operation_type: value
                                    }))
                                }}
                                style={{width: '100%'}}
                                value={sendInfo.operation_type}
                                options={[{value: 'Поступление', label: 'Поступление'}, {
                                    value: 'Выплата',
                                    label: 'Выплата'
                                }, {value: 'Начисление', label: 'Начисление'}]}/>
                        </div>


                        <Typography.Title level={5}>Номер договора инвестора</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.debt_num}</span>
                            <Input
                                onChange={(e) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        debt_num: e.target.value
                                    }))
                                }}
                                value={sendInfo.debt_num || ""}
                                className={cn(cls.input, {
                                    [cls.errorBorder]: errors.debt_num
                                })} type="text"/>
                        </div>

                        <Typography.Title level={5}>Срок инвестиций</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.investment_term}</span>
                            <Input
                                onChange={(e) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        investment_term: e.target.value
                                    }))
                                }}
                                value={sendInfo.investment_term || ""}
                                className={cn(cls.input, {
                                    [cls.errorBorder]: errors.investment_term
                                })} type="number"/>
                        </div>


                        <Typography.Title level={5}>Доля прибыли</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.profit_percent}</span>
                            <Input
                                onChange={(e) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        profit_percent: e.target.value
                                    }))
                                }}
                                value={sendInfo.profit_percent || ""}
                                className={cn(cls.input, {
                                    [cls.errorBorder]: errors.profit_percent
                                })} type="number"/>
                        </div>

                        <Typography.Title level={5}>Инвестор</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.investor}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.investor
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        investor: value
                                    }))
                                }}
                                options={investors}
                            />
                        </div>
                    </div>
                </div>,
        },
        {
            children:
                <div className={cls.overpayment}>
                    <span className={cls.title}>Переплата</span>
                    <div className={cls.grid}>
                        <Typography.Title level={5}>Сумма</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.amount}</span>
                            <Input
                                onChange={(e) => {
                                    setSendInfo((prevState) => ({
                                        ...prevState,
                                        amount: e.target.value
                                    }))
                                }}
                                value={sendInfo.amount || ""}
                                className={cn(cls.input, {
                                    [cls.errorBorder]: errors.amount
                                })} type="number"/>
                        </div>
                        <Typography.Title level={5}>Дата</Typography.Title>
                        {sendInfo.operation_date ?
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.operation_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.operation_date
                                    })}
                                    value={sendInfo.operation_date ? dayjs(sendInfo.operation_date) : dayjs()}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            operation_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                            :
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.operation_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.operation_date
                                    })}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            operation_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                        }


                        <Typography.Title level={5}>Вид операции</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.operation_type}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.operation_type
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        operation_type: value
                                    }))
                                }}
                                style={{width: '100%'}}
                                value={sendInfo.operation_type}
                                options={[{value: 'Поступление', label: 'Поступление'}, {
                                    value: 'Выплата',
                                    label: 'Выплата'
                                }, {value: 'Начисление', label: 'Начисление'}]}/>
                        </div>
                        <Typography.Title level={5}>Сделка с переплатой</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.loan}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.loan
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        loan: value
                                    }))
                                }}
                                style={{width: '100%'}}
                                value={sendInfo.loan}
                                options={loans}/>
                            {/*<Input*/}
                            {/*    onChange={(e) => {*/}
                            {/*        setSendInfo(prevState => ({*/}
                            {/*            ...prevState,*/}
                            {/*            loan: e.target.value*/}
                            {/*        }))*/}
                            {/*    }}*/}
                            {/*    value={sendInfo.loan || ""}*/}
                            {/*    className={cn(cls.input, {*/}
                            {/*        [cls.errorBorder] : errors.loan*/}
                            {/*    })} type="number"/>*/}
                        </div>
                    </div>
                </div>,
        },
        {
            children:
                <div className={cls.Unclear}>
                    <span className={cls.title}>Невыясненные платежи</span>
                    <div className={cls.grid}>
                        <Typography.Title level={5}>Сумма</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.amount}</span>
                            <Input
                                onChange={(e) => {
                                    setSendInfo((prevState) => ({
                                        ...prevState,
                                        amount: e.target.value
                                    }))
                                }}
                                value={sendInfo.amount || ""}
                                className={cn(cls.input, {
                                    [cls.errorBorder]: errors.amount
                                })} type="number"/>
                        </div>
                        <Typography.Title level={5}>Дата</Typography.Title>
                        {sendInfo.operation_date ?
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.operation_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.operation_date
                                    })}
                                    value={sendInfo.operation_date ? dayjs(sendInfo.operation_date) : dayjs()}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            operation_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                            :
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.operation_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.operation_date
                                    })}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            operation_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                        }


                        <Typography.Title level={5}>Вид операции</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.operation_type}</span>
                            <Select
                                className={cn({
                                    [cls.errorBorder]: errors.operation_type
                                })}
                                onChange={(value) => {
                                    setSendInfo(prevState => ({
                                        ...prevState,
                                        operation_type: value
                                    }))
                                }}
                                style={{width: '100%'}}
                                value={sendInfo.operation_type}
                                options={[{value: 'Поступление', label: 'Поступление'}, {
                                    value: 'Выплата',
                                    label: 'Выплата'
                                }, {value: 'Начисление', label: 'Начисление'}]}/>
                        </div>
                    </div>
                </div>,
        },
        {
            children: (
                <div className={cls.investing}>
                    <span className={cls.title}>Оплата</span>
                    <div className={cls.grid}>
                        <Typography.Title level={5}>Сумма платежа</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.payment_amount}</span>
                            <Input
                                onChange={(e) => {
                                    setSendInfo((prevState) => ({
                                        ...prevState,
                                        payment_amount: e.target.value
                                    }))
                                    setChangedFields((prev) => ({
                                        ...prev,
                                        payment_amount: e.target.value
                                    }))
                                }}
                                value={sendInfo.payment_amount || ""}
                                className={cn(cls.input, {
                                    [cls.errorBorder]: errors.payment_amount
                                })} type="number"
                            />
                        </div>

                        <Typography.Title level={5}>Дата платежа</Typography.Title>
                        {sendInfo.payment_date ?
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.payment_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.payment_date
                                    })}
                                    value={sendInfo.payment_date ? dayjs(sendInfo.payment_date) : dayjs()}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            payment_date: dateString
                                        }))
                                        setChangedFields((prev) => ({
                                            ...prev,
                                            payment_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                            :
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.payment_date}</span>
                                <DatePicker
                                    className={cn({
                                        [cls.errorBorder]: errors.payment_date
                                    })}
                                    placeholder=""
                                    onChange={(date, dateString) => {
                                        setSendInfo((prevState) => ({
                                            ...prevState,
                                            payment_date: dateString
                                        }))
                                        setChangedFields((prev) => ({
                                            ...prev,
                                            payment_date: dateString
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                />
                            </div>
                        }


                        <Typography.Title level={5}>Примечение</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.comment}</span>
                            <Input
                                onChange={(e) => {
                                    setSendInfo((prevState) => ({
                                        ...prevState,
                                        comment: e.target.value
                                    }))
                                    setChangedFields((prev) => ({
                                        ...prev,
                                        comment: e.target.value
                                    }))
                                }}
                                value={sendInfo.comment || ""} className={cn(cls.input, {
                                [cls.errorBorder]: errors.comment
                            })} type="text"/>
                        </div>

                        {sendType === FinancesSendType.POST &&
                            <>
                                <Typography.Title level={5}>Договор</Typography.Title>
                                <div className={cls.errorWrapper}>
                                    <span className={cls.error}>{errors?.loan}</span>
                                    <Select
                                        className={cn({
                                            [cls.errorBorder]: errors.loan
                                        })}
                                        onChange={(value) => {
                                            setSendInfo(prevState => ({
                                                ...prevState,
                                                loan: value
                                            }))
                                            setChangedFields((prev) => ({
                                                ...prev,
                                                loan: value
                                            }))
                                        }}
                                        style={{width: '100%'}}
                                        value={sendInfo.loan}
                                        options={loans}/>
                                    {/*<Input*/}
                                    {/*    onChange={(e) => {*/}
                                    {/*        setSendInfo(prevState => ({*/}
                                    {/*            ...prevState,*/}
                                    {/*            loan: e.target.value*/}
                                    {/*        }))*/}
                                    {/*    }}*/}
                                    {/*    value={sendInfo.loan || ""}*/}
                                    {/*    className={cn(cls.input, {*/}
                                    {/*        [cls.errorBorder]: errors.loan*/}
                                    {/*    })} type="text"/>*/}
                                </div>
                            </>
                        }


                        <Typography.Title level={5}>Фото чеков</Typography.Title>
                        <div className={cls.errorWrapper}>
                            <span className={cls.error}>{errors?.bill_photo}</span>
                            <Dragger
                                className={cn({
                                    [cls.errorBorder]: errors.bill_photo
                                })}
                                {...props}>
                                <DownloadOutlined style={{fontSize: "30px"}}/>
                                <Typography.Paragraph>
                                    Загрузить фото
                                </Typography.Paragraph>
                                {/*<div className={cls.upload}>*/}
                                {/*    <Button>Загрузить файл</Button>*/}
                                {/*</div>*/}
                            </Dragger>
                            {sendInfo.bill_photo &&
                                <a href={sendInfo.bill_photo} download>Скачать файл</a>
                            }

                            {/*<Upload {...props}>*/}
                            {/*    <div className={cls.upload}>*/}
                            {/*        <Button>Загрузить файл</Button>*/}
                            {/*        {sendInfo.bill_photo &&*/}
                            {/*            <a href={sendInfo.bill_photo} download>Скачать файл</a>*/}
                            {/*        }*/}
                            {/*    </div>*/}
                            {/*</Upload>*/}
                        </div>
                    </div>
                </div>
            )
        }
    ];
    const menuItems: MenuProps['items'] = [
        {
            key: 1,
            label: "Партнер"
        }, {
            key: 2,
            label: "Скидка"
        }, {
            key: 3,
            label: "Прочие расходы"
        },
        {
            key: 11,
            label: "Оплата"
        }, {
            key: 4,
            label: "Зарплата"
        }, {
            key: 5,
            label: "Займ"
        }, {
            key: 6,
            label: "Мат. ценности"
        }, {
            key: 7,
            label: "Выплата инвестору"
        }, {
            key: 8,
            label: "Инвестиции"
        }, {
            key: 9,
            label: "Переплата"
        },
        {
            key: 10,
            label: "Невыясненные платежи"
        },
    ]
    const menu = (<Menu items={menuItems} onClick={(item) => {
        // @ts-ignore
        setPostUrl(getKeyByValue(modalType, Number(item.key)))
        // @ts-ignore
        setCurrentModal(item.key)
        setSendType(FinancesSendType.POST)
        showModal()
    }}/>);
// --- --- --- --- --- --- --- ---
    const showModal = () => {
        setSendInfo((prevState) => ({
            ...prevState,
        }))
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setErrors({})
        setIsModalOpen(false);
        setSendInfo({})
        setCurrentFinanceId("")
        setFileList([])
        setPostUrl("")
    };
// --- --- --- --- --- --- --- ---

    const columns: ColumnsType<IFinancesColumns> = [
        {
            title: "Дата",
            dataIndex: "date",
            key: "date",
            // render: (_, data) => {
            //     return _.split(" ")[0]
            // }
            render: (text, record) => {
                return moment(text).format("YYYY-MM-DD");
            },
            sorter: (a, b) => moment(a.date) - moment(b.date), // Функция сортировки по дате

        }, {
            title: "Тип операции",
            dataIndex: "type",
            key: "type",
            // filters: [
            //     {text: "Первоначальный взнос", value: "Первоначальный взнос"},
            //     {text: "Платеж по Сделке", value: "Платеж по Сделке"},
            //     {text: "Инвестиция", value: "Инвестиция"},
            // ],
            // onFilter: (value: string, record) => record.type.startsWith(value),
        }, {
            title: "Операция",
            dataIndex: "operation",
            key: "operation",
            // filters: [
            //     {value: 'Поступление', text: 'Поступление'},
            //     {value: 'Выплата', text: 'Выплата'},
            //     {value: 'Начисление', text: 'Начисление'}],
            // onFilter: (value: string, record) => record.type.startsWith(value),
        }, {
            title: "Сумма",
            dataIndex: "payout",
            key: "payout",
            sorter: (a, b) => a.payout - b.payout,
        }, {
            title: "Детали",
            dataIndex: "detail",
            key: "detail",
        },

    ]


    return (
        <div className={cls.wrapper}>
            <div className={cls.mainWrapper}>
                <div className={cls.heading}>
                    <Typography.Title level={1}>Финансы</Typography.Title>
                    <div className="buttons">
                        <Filters updateQuery={updateQuery} onFiltersChange={handleFiltersChange}/>
                        <Button style={{margin: '0 10px'}} type="primary" icon={<DownloadOutlined/>}>
                            .xlsx
                        </Button>
                        <Dropdown overlay={menu} trigger={["click"]}>
                            <Button type="primary">Добавить</Button>
                        </Dropdown>
                    </div>
                </div>
                {isFiltersSuccess ? (
                    <Table
                        rowClassName={cls.row}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    handleRowClick(record)
                                    // setModalOpen(true)
                                }, // click row
                            };
                        }}
                        pagination={{defaultPageSize: 50}}
                        dataSource={filtersData?.operation}
                        columns={columns}
                        scroll={{x: 1000}}
                    />
                ) : (
                    <Table
                        rowClassName={cls.row}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    handleRowClick(record)
                                },
                            };
                        }}
                        pagination={{defaultPageSize: 50}}
                        // @ts-ignore
                        dataSource={data?.operation}
                        columns={columns}
                        scroll={{x: 1000}}
                    />
                )}
                <div className={cls.tableFooter}>

                </div>
            </div>
            <Modal
                width={600}
                footer={(
                    <div className={cn(cls.modalButtons, {
                        [cls.postButtons]: sendType === FinancesSendType.POST
                    })}>
                        {
                            sendType === FinancesSendType.PATCH &&
                            <Button type="primary" danger>
                                Удалить
                            </Button>
                        }
                        <div>
                            <Button onClick={() => {
                                setIsModalOpen(false)
                                setSendInfo({})
                            }}>
                                Отмена
                            </Button>
                            <Button
                                onClick={sendData}
                                type="primary"
                            >
                                {
                                    sendType === FinancesSendType.POST ?
                                        "Добавить" :
                                        "Изменить"
                                }
                            </Button> :

                        </div>
                    </div>
                )}
                open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={'Добавить'}
                cancelText={'Закрыть'}>
                {modals[currentModal - 1].children}
            </Modal>
        </div>
    );

};

export default FinancesPage;