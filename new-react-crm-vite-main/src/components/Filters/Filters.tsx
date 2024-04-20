import {useEffect, useState} from 'react';
import {Checkbox, Button, Space, DatePicker, Typography, Select} from 'antd';
import {Drawer} from 'antd';


import cls from "./Filters.module.scss"
import {useLazyGetFilteredFinancesQuery} from "@/store/services/FinancesApi.ts";
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


export const Filters = ({onFiltersChange, updateQuery}) => {
    // Для чекбоксов
    // Тип операции 
    const selectValues = [
        {value: "", label: ""},
        {value: "Поступление", label: "Поступление"},
        {value: "Выплата", label: "Выплата"},
        {value: "Начисление", label: "Начисление"},
    ]
    const [checkboxValues, setCheckboxValues] = useState<any>({});
    const [accessCheckbox, setAccessCheckbox] = useState<Boolean>(false)
    const [open, setOpen] = useState(false);
    const [operationValue, setOperationValue] = useState<String>('')
    const [dateValue, setDateValue] = useState<string[]>([])
    const [filteredData, setFilteredData] = useState({
        date_start: "",
        date_end: "",
        type: "",
        checkboxes: checkboxValues
    })
    const [trigger, filtersData] = useLazyGetFilteredFinancesQuery()
    const showDrawer = () => {
        setOpen(true);
    };
    useEffect(() => {
        // Вызываем функцию обратного вызова при изменении filteredData
        onFiltersChange(filtersData);
    }, [filtersData]);
    const onClose = () => {
        setOpen(false);
    };

    const handleCheckboxChange = (category: string, checked: boolean) => {
        setCheckboxValues((prevValues) => {
            if (checked) {
                return {
                    ...prevValues,
                    [category]: checked,
                };
            } else {
                const {[category]: removedField, ...rest} = prevValues;
                return {...rest};
            }
        });
    };
    useEffect(() => {
        setFilteredData((prevState) => ({
            ...prevState,
            checkboxes: checkboxValues, // Обновляем filteredData.checkboxes с актуальными значениями checkboxValues
        }));
    }, [checkboxValues]);

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
        setFilteredData((prevState) => ({
            ...prevState,
            type: value
        }))
        value.length >= 1 ? setAccessCheckbox(true) : setAccessCheckbox(false)
    };

    const handleData = (date: never, dateString: string[]) => {
        if (dateString[0] && dateString[1]) {
            setFilteredData((prevState) => ({
                ...prevState,
                date_start: dateString[0],
                date_end: dateString[1]
            }))
            setDateValue(date)
        }
    }
    const handleShowValues = () => {
        console.log(checkboxValues);
    };

    const reloadFilters = () => {
        setCheckboxValues({})
        setOperationValue('')
        setFilteredData({
            date_start: "",
            date_end: "",
            type: "",
            checkboxes: []
        })
        setAccessCheckbox(false)
        setDateValue([])
    }
    useEffect(() => {
        console.log(124)
        trigger(filteredData)
    }, [updateQuery]);

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Открыть фильтры
            </Button>

            <Drawer title="Фильтры" placement="left" onClose={onClose} open={open}
                    style={{
                        boxShadow: 'none',
                        minWidth: "30vw"
                    }}
                    bodyStyle={{
                        padding: "10px"
                    }}
            >
                <Space direction="vertical" size={'large'} className={cls.wrapper}>
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                    }}>

                        <div className="datepicker+selector" style={{
                            marginTop: '15px', display: 'flex', gap: '20px'

                        }}>
                            <div className='datepicker' style={{marginBottom: '30px', width: '100%'}}>
                                <Typography.Title level={5}>Дата операции</Typography.Title>
                                <DatePicker.RangePicker value={dateValue} onChange={handleData}

                                                        placeholder={["", ""]}/>

                            </div>
                            <div className='Selector' style={{
                                marginBottom: '30px', width: '100%',
                            }}>
                                <Typography.Title level={5}>Тип операции</Typography.Title>
                                <Select
                                    value={filteredData.type}
                                    style={{width: '100%', boxShadow: ' 1.5px 1.5px 15px 1px rgba(0, 0, 0, 0.059)', borderRadius: '5px'}}
                                    options={selectValues}
                                    onChange={handleChange}/>
                            </div>
                        </div>
                        <div className={cls.some}>
                            {checkboxCategories.map((category) => {
                                return (
                                    (
                                        <Checkbox
                                            disabled={accessCheckbox ? true : false}
                                            className={cls.some__item}
                                            key={category.name}
                                            checked={checkboxValues[category.name] || false}
                                            onChange={(e) => handleCheckboxChange(category.name, e.target.checked)}
                                        >
                                            {<span className={cls.category__label}>{category.label}</span>}
                                        </Checkbox>
                                    )
                                )
                            })}
                        </div>
                    </div>

                    <div className={cls.btns}>
                        <Button className={cls.btn} type="primary" onClick={() => {
                            trigger(filteredData)
                        }}>
                            Применить
                        </Button>
                        <Button className={cls.btn2} onClick={reloadFilters}>
                            Очистить фильтры
                        </Button>
                    </div>
                </Space>
            </Drawer>
        </>

    );
};