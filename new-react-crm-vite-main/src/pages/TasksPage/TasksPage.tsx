import React, {useEffect, useState} from 'react';
import {Button, Checkbox, DatePicker, Drawer, Input, Modal, Select, Spin, Table, Tag, Typography} from 'antd';
import cls from './TasksPage.module.scss';
import {FiltersData, InputsFilterEnum, TableData, TasksSendType} from '@/types';
import {CheckboxChangeEvent} from "antd/es/checkbox";

import {ColumnsType} from "antd/es/table";
import {DownloadOutlined} from '@ant-design/icons';
import {
    useGetTasksQuery,
    useLazyGetFilteredTasksQuery,
    useLazyGetTaskQuery,
    usePatchTaskMutation,
    useSendTaskMutation
} from "@/store/services/TasksApi.ts";
import cn from "classnames";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/ru_RU";
import {useGetLoansQuery} from "@/store/services/FinancesApi.ts";
import moment from "moment/moment";


interface Task {
    id: number;
    name: string;
    text: string;
    important: boolean;
    status: string;
    plan_date: string;
    real_date: string | null;
    created_by: number;
    executor: number;
    loan: number | null;
}

interface Filter {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
}

export interface TasksData {
    tasks: Task[];
    filters: Filter[];
}

const {RangePicker} = DatePicker

export const TasksPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState<boolean>(false);
    const [dateValue, setDateValue] = useState<any>([]);
    const [filtersData, setFiltersData] = useState<FiltersData>({
        debt_date_start: '',
        debt_date_end: '',
        created_by: '',
        executor: '',
        loan: '',
        important: undefined,
        status: undefined,
    });
    const [trigger, {data: filteredData, isSuccess}] = useLazyGetFilteredTasksQuery();
    const {data, error, isLoading, refetch} = useGetTasksQuery(null)
    const [sendData, setSendData] = useState({
        name: "",
        text: "",
        important: false,
        loan: "",
        plan_date: "",
        executor: null,
    })
    const [currentId, setCurrentId] = useState("")
    const [getTrigger,] = useLazyGetTaskQuery()
    const [errors, setErrors] = useState<any>({})
    const [mutate, {data: postData, error: postError}] = useSendTaskMutation()
    const [modalType, setModalType] = useState<TasksSendType>(TasksSendType.POST)
    const [patchTrigger, {data: patchData, error: patchError}] = usePatchTaskMutation()
    const {data: loansData} = useGetLoansQuery(null)
    const [loans, setLoans] = useState<any>()


    useEffect(() => {
        if (loansData) {
            const arr: any = []
            loansData.forEach((item, i) => {
                arr.push({
                    value: item.debt_num,
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
            setSendData({})
            if (isSuccess) {
                trigger(filtersData)
            }
        }
    }, [postData]);
    useEffect(() => {
        if (patchData) {
            setErrors({})
            setIsModalOpen(false)
            setSendData({})
            if (isSuccess) {
                trigger(filtersData)
            }
        }
    }, [patchData]);

    useEffect(() => {
        if (data?.filters) {
            const obj = []
            data.filters.forEach((item, i) => {
                const selectItem = {
                    label: item.name,
                    value: item.id
                }
                obj.push(selectItem)
            })
        }
    }, [data]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (modalType === TasksSendType.POST) {
            await mutate(sendData);
        } else {
            await patchTrigger({id: currentId, body: sendData}).unwrap();
            refetch(); // Повторный запрос на получение задач после мутации
        }
    };
    const handleRowClick = async (record) => {
        setCurrentId(record.id)
        setModalType(TasksSendType.PATCH);
        try {
            const result = await getTrigger({id: record.id});
            setSendData(result.data)
            showModal();
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    };

    const handleCancel = () => {
        setSendData()
        setErrors()
        setIsModalOpen(false);
    };
    const getExecutors = (filters) => {
        if (filters) {
            const array = []
            filters.forEach((item, i) => {
                const obj = {
                    label: item.first_name,
                    value: item.id
                }
                array.push(obj)
            })
            return array
        }
    }
    const getExecutor = (filters, id) => {
        if (filters) {
            let name = ""
            filters.forEach((item) => {
                if (item.id == Number(id)) {
                    name = item.first_name
                }
            })
            return name
        }
    }

    const getExecutorsFotFilters = (filters) => {
        if (filters) {
            const array = []
            filters.forEach((item, i) => {
                const obj = {
                    label: item.first_name,
                    value: item.username
                }
                array.push(obj)
            })
            return array
        }
    }

    const handleInputsFilters = (
        e: React.ChangeEvent<HTMLInputElement | CheckboxChangeEvent>,
        type: InputsFilterEnum
    ) => {
        if (type === InputsFilterEnum.STATUS || type === InputsFilterEnum.IMPORTANT) {
            // Handle checkboxes
            setFiltersData((prevState: FiltersData) => ({
                ...prevState,
                [type]: !prevState[type],
            }));
        } else {
            // Handle input elements
            if (typeof e === 'object' && 'target' in e) {
                const value = 'value' in e.target ? e.target.value : '';
                setFiltersData((prevState: FiltersData) => ({
                    ...prevState,
                    [type]: value,
                }));
            }
        }
    };
    const columns: ColumnsType<TableData> = [
        {
            title: "Название",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Дата",
            dataIndex: "plan_date",
            key: "plan_date",
            render: (text, record) => {
                return moment(text).format("YYYY-MM-DD");
            },
            sorter: (a, b) => moment(a.plan_date) - moment(b.plan_date),
        },
        {
            title: "Статус",
            dataIndex: "status",
            key: "status",
            render: (text: string) => <Tag
                color={text === "Активна" ? "blue" : text === "Завершена" ? "success" : "error"}>{text}</Tag>,
        },
        {
            title: "Создано",
            dataIndex: "created_by",
            key: "created_by",
            render: (text: string, record: any) => {
                const id = Number(text)
                let name = ""
                if (data) {
                    data.filters.forEach((item, i) => {
                        if (Number(item.id) === id) {
                            name = item.first_name
                        }
                    })
                }
                return name
            },
        },
        {
            title: "Исполнитель",
            dataIndex: "executor",
            key: "executor",
            render: (text: string, record: any) => {
                const id = Number(text)
                let name = ""
                if (data) {
                    data.filters.forEach((item, i) => {
                        if (Number(item.id) === id) {
                            name = item.first_name
                        }
                    })
                }
                return name
            },
        },
        {
            title: "Заем",
            dataIndex: "loan",
            key: "loan"
        },
    ];
    return (
        <div className={cls.wrapper}>
            <div className={cls.heading}>
                <Typography.Title style={{marginBottom: '0'}} level={1}>Задачи</Typography.Title>
                <div>
                    <Button type={'primary'} className="filters" onClick={() => setOpen(true)}>
                        Открыть фильтры
                    </Button>
                    <Button style={{margin: '0 10px'}} type="primary" icon={<DownloadOutlined/>}>.xlsx</Button>

                    <Button type="primary" onClick={() => {
                        setModalType(TasksSendType.POST)
                        showModal()
                    }}>Создать</Button>
                </div>
            </div>
            {isSuccess ?
                <Table
                    rowClassName={cls.row}
                    onRow={(record, index) => {
                        return {
                            onClick: (event) => {
                                handleRowClick(record)
                            }
                        }
                    }}
                    columns={columns} dataSource={filteredData?.tasks} scroll={{x: 800}}/>
                :
                <Table
                    rowClassName={cls.row}
                    onRow={(record, index) => {
                        return {
                            onClick: (event) => {
                                handleRowClick(record)
                            }
                        }
                    }}
                    columns={columns} dataSource={data?.tasks} scroll={{x: 800}}/>
            }

            <Modal
                footer={(
                    <div className={cn(cls.modalButtons, {
                        [cls.postButtons]: modalType === TasksSendType.POST
                    })}>
                        {
                            modalType === TasksSendType.PATCH &&
                            <Button type="primary" danger>
                                Удалить
                            </Button>
                        }
                        <div>
                            <Button onClick={() => {
                                setIsModalOpen(false)
                                setSendData({})
                            }}>
                                Отмена
                            </Button>
                            <Button
                                onClick={handleOk}
                                type="primary"
                            >
                                {
                                    modalType === TasksSendType.POST ?
                                        "Добавить" :
                                        "Изменить"
                                }
                            </Button> :

                        </div>
                    </div>
                )}

                title="Задача" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={'Добавить'}
                cancelText={'Закрыть'}>
                <div className={cls.wrapperModal}>
                    {modalType === TasksSendType.PATCH && sendData
                        ?
                        <>
                            <Typography.Title level={5}>Название</Typography.Title>
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.name}</span>
                                <Input value={sendData?.name} onChange={(e) => {
                                    setSendData(prevState => ({
                                        ...prevState,
                                        name: e.target.value
                                    }))
                                }} className={cn(cls.inputModal, {
                                    [cls.errorBorder]: errors?.name
                                })}/>
                            </div>
                            <Typography.Title level={5}>Описание</Typography.Title>
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.text}</span>
                                <Input value={sendData?.text} onChange={(e) => {
                                    setSendData(prevState => ({
                                        ...prevState,
                                        text: e.target.value
                                    }))
                                }} className={cn(cls.inputModal, {
                                    [cls.errorBorder]: errors?.name
                                })}/>
                            </div>

                            <Typography.Title level={5}>Исполнитель</Typography.Title>
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.executor}</span>
                                <Select
                                    className={cn({
                                        [cls.errorBorder]: errors?.executor
                                    })}
                                    onChange={(item) => {
                                    setSendData(prevState => ({
                                        ...prevState,
                                        executor: item
                                    }))
                                }}
                                        value={getExecutor(data?.filters, sendData?.executor)}
                                        options={getExecutors(data?.filters)}/>
                            </div>

                            <Typography.Title level={5}>Плановая дата</Typography.Title>
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.plan_date}</span>
                                <DatePicker
                                    className={cn(cls.input, {
                                        [cls.errorBorder]: errors?.plan_date
                                    })}
                                    style={{width: "100%"}}
                                    placeholder=""
                                    onChange={(time, timeString) => {
                                        setSendData(prevState => ({
                                            ...prevState,
                                            plan_date: timeString
                                        }))
                                    }}
                                    value={dayjs(sendData.plan_date)}
                                />
                            </div>


                            <Typography.Title level={5}>Заем</Typography.Title>
                            <div className={cls.errorWrapper}>
                                <span className={cls.error}>{errors?.loan}</span>
                                {/*<Input value={sendData?.loan} onChange={(e) => {*/}

                                {/*    setSendData(prevState => ({*/}
                                {/*        ...prevState,*/}
                                {/*        loan: e.target.value*/}
                                {/*    }))*/}
                                {/*}} className={cls.inputModal}/>*/}
                                <Select
                                    className={cn({
                                        [cls.errorBorder]: errors?.loan
                                    })}
                                    onChange={(value) => {
                                        setSendData(prevState => ({
                                            ...prevState,
                                            loan: value
                                        }))
                                    }}
                                    style={{width: '100%'}}
                                    value={sendData?.loan}
                                    options={loans}/>
                            </div>

                            <Typography.Title level={5}>Важность</Typography.Title>

                            <Checkbox checked={sendData?.important} onChange={() => setSendData((prevState => ({
                                ...prevState,
                                important: !prevState.important
                            })))}/>
                        </>
                        : modalType === TasksSendType.POST ?
                            <>
                                <Typography.Title level={5}>Название</Typography.Title>
                                <div className={cls.errorWrapper}>
                                    <span className={cls.error}>{errors?.name}</span>
                                    <Input value={sendData?.name} onChange={(e) => {
                                        setSendData(prevState => ({
                                            ...prevState,
                                            name: e.target.value
                                        }))
                                    }} className={cn(cls.inputModal, {
                                        [cls.errorBorder]: errors?.name
                                    })}/>
                                </div>
                                <Typography.Title level={5}>Описание
                                </Typography.Title>
                                <div className={cls.errorWrapper}>
                                    <span className={cls.error}>{errors?.text}</span>
                                    <Input value={sendData?.text} onChange={(e) => {
                                        setSendData(prevState => ({
                                            ...prevState,
                                            text: e.target.value
                                        }))
                                    }} className={cn(cls.inputModal, {
                                        [cls.errorBorder]: errors?.text
                                    })}/>
                                </div>

                                <Typography.Title level={5}>Исполнитель</Typography.Title>

                                <div className={cls.errorWrapper}>
                                    <span className={cls.error}>{errors?.executor}</span>
                                    <Select
                                        className={cn(cls.input, {
                                            [cls.errorBorder]: errors?.executor
                                        })}
                                        onChange={(item) => {
                                            setSendData(prevState => ({
                                                ...prevState,
                                                executor: item
                                            }))
                                        }}
                                        value={getExecutor(data?.filters, sendData?.executor)}
                                        options={getExecutors(data?.filters)}/>
                                </div>
                                <Typography.Title level={5}>Плановая дата</Typography.Title>
                                <div className={cls.errorWrapper}>
                                    <span className={cls.error}>{errors?.plan_date}</span>
                                    <DatePicker
                                        style={{width: "100%"}}
                                        className={cn(cls.input, {
                                            [cls.errorBorder]: errors?.plan_date
                                        })}
                                        placeholder=""
                                        onChange={(time, timeString) => {
                                            setSendData(prevState => ({
                                                ...prevState,
                                                plan_date: timeString
                                            }))
                                        }}
                                    />
                                </div>

                                <Typography.Title level={5}>Заем</Typography.Title>
                                <div className={cls.errorWrapper}>
                                    <span className={cls.error}>{errors?.loan?.loan_error}</span>
                                    {/*<Input value={sendData?.loan} onChange={(e) => {*/}
                                    {/*    setSendData(prevState => ({*/}
                                    {/*        ...prevState,*/}
                                    {/*        loan: e.target.value*/}
                                    {/*    }))*/}
                                    {/*}} className={cls.inputModal}/>*/}
                                    <Select
                                        className={cn({
                                            [cls.errorBorder]: errors?.loan
                                        })}
                                        onChange={(value) => {
                                            setSendData(prevState => ({
                                                ...prevState,
                                                loan: value
                                            }))
                                        }}
                                        style={{width: '100%'}}
                                        value={sendData?.loan}
                                        options={loans}/>
                                </div>
                                <Typography.Title level={5}>Важность</Typography.Title>
                                <Checkbox checked={sendData?.important} onChange={() => setSendData((prevState => ({
                                    ...prevState,
                                    important: !prevState.important
                                })))}/>
                            </> :
                            <Spin/>
                    }
                </div>
            </Modal>

            <Drawer
                style={{
                    boxShadow: 'none',
                    minWidth: "30vw",
                }}
                onClose={() => setOpen(false)}
                placement={'left'}
                open={open}
            >
                <div className={cls.drawerWrapper}>
                    <div className={cls.fullWidth}>
                        <Typography.Title level={5}>Дата операций</Typography.Title>
                        <RangePicker
                            locale={locale}
                            value={dateValue}
                            onChange={(dates, dateString) => {
                                setFiltersData(prevState => {
                                    return {
                                        ...prevState,
                                        debt_date_start: dateString[0],
                                        debt_date_end: dateString[1],
                                    }
                                })
                                setDateValue(dates)
                            }}
                            style={{
                                width: '100%',
                                boxShadow: '1.5px 1.5px 15px 1px rgba(0, 0, 0, 0.059)',
                            }}
                            placeholder={['', '']}
                        />
                    </div>
                    <div className={cls.input}>
                        <Typography.Title level={5}>Создано</Typography.Title>
                        <Select
                            value={filtersData.created_by}
                            onChange={(item: string) => {
                                setFiltersData(prevState => ({
                                    ...prevState,
                                    created_by: item
                                }))
                            }} options={getExecutorsFotFilters(data?.filters)}/>
                    </div>
                    <div className={cls.input}>
                        <Typography.Title level={5}>Исполнитель</Typography.Title>
                        <Select
                            value={filtersData.executor}
                            onChange={(item: string) => {
                                setFiltersData(prevState => ({
                                    ...prevState,
                                    executor: item
                                }))
                            }} options={getExecutorsFotFilters(data?.filters)}/>
                    </div>
                    <div className={cls.input}>
                        <Typography.Title level={5}>Статус</Typography.Title>
                        <Select
                            value={filtersData.status}
                            onChange={(item) => {
                                setFiltersData(prevState => ({
                                    ...prevState,
                                    status: item
                                }))
                            }} options={[
                            {
                                label: "Активна",
                                value: "Активна"
                            },
                            {
                                label: "Завершена",
                                value: "Завершена"
                            },
                            {
                                label: "Просрочена",
                                value: "Просрочена"
                            },
                        ]}/>
                    </div>
                    <div className={cls.fullWidth}>
                        <Typography.Title level={5}>Заем</Typography.Title>
                        {/*<Input*/}
                        {/*    value={filtersData.loan}*/}
                        {/*    onChange={(e) => handleInputsFilters(e, InputsFilterEnum.LOAN)}*/}
                        {/*/>*/}
                        <Select
                            value={filtersData.loan}
                            onChange={(item: string) => {
                                setFiltersData(prevState => ({
                                    ...prevState,
                                    loan: item
                                }))
                            }} options={loans}/>
                    </div>
                    <div className={cls.checkboxes}>
                        <Checkbox
                            name="important"
                            checked={filtersData.important}
                            onChange={(e) =>
                                handleInputsFilters(e, InputsFilterEnum.IMPORTANT)
                            }
                        >
                            <p className={cls.p}>Важное</p>
                        </Checkbox>
                    </div>
                    <div className={cls.buttons}>
                        <Button type="primary" onClick={() => {
                            trigger(filtersData)
                        }}>Применить</Button>
                        <Button type="default" onClick={() => {
                            setFiltersData({
                                debt_date_start: '',
                                debt_date_end: '',
                                created_by: '',
                                executor: '',
                                loan: '',
                                important: undefined,
                                status: undefined,
                            })
                            setDateValue()
                        }
                        }>Очистить фильтры</Button>
                    </div>
                </div>
            </Drawer>
        </div>
    )
        ;
};