import {FC, useEffect, useState} from "react";
import {Button, Dropdown, Checkbox, Menu, MenuProps, Typography, Drawer, DatePicker, Select, Input, Form} from "antd";
import {CreateDealPost} from "../../components/Deal/CreateDeal/CreateDealPost"
import {TableDeal} from "../../components/Deal/TableDeal/TableDeal"
import {Modal} from 'antd';
import {Chat} from "@/components/chat/chat";
import cls from "./DealPage.module.scss"
import {UnorderedListOutlined} from "@ant-design/icons"
import {DownloadOutlined} from '@ant-design/icons';
import {NotfoundComponement} from "@/components/notfoundcom/Notfound";
import {useGetDealsQuery, useLazyGetDealsQuery, usePostDealMutation} from "@/store/services/DealApi.ts";


export const DealPage: FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [trigger, { data: filteredData, isSuccess }] = useLazyGetDealsQuery();
 
    const [filtersData, setFiltersData] = useState(
        {
  
        }
    )

    const [initData, setInitData] = useState<Object>({
            debt_num: 100,
            debt_type: "lk",
            debt_amount: 100,
            cost_price: 1231,
            initial_fee: 123,
            debt_term: 87,
            initial_fee_pay_method: "Карта",
            month_fee: "",
            debt_date: "1221-03-01",
            pay_date: "1422-04-03",
        
            partner: {
                id: 1
            },
            security: {
                id: 3
            },
            creditorbillinfo: {
                id: 2
            },
            borrower: {
            first_name: "msm",
            surname: "asd",
            middle_name: "sdf",
            birth_date: "1221-03-01",
            phone_number: "+79124412314",
            passport_serial: 1423,
            passport_number: 123141,
            passport_date: "1998-10-10",
            work_place: "asd",
            address: "asd",
            }, 
            guarantors: [
                {
                    first_name:"Поручитель",
                    surname:"Поручитель",
                    middle_name:"Поручитель ",
                    birth_date:"1983-08-21",
                    phone_number:"+79285544112",
                    passport_serial:2652,
                    passport_number:265285,
                    passport_date:"2014-03-13"
                }
        ] 
        
    })

    const [postTrigger, { error }] = usePostDealMutation()

    const {RangePicker} = DatePicker;   

    const {data, isLoading, refetch} = useGetDealsQuery(null)
console.log(isLoading);

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


    const showDrawer = () => {
        setIsModalOpen(true);     
    };

    const onClick = async () => {
        try {
          console.log('Post created successfully!', initData);
          // дополнительная логика после успешного POST-запроса
        } catch (error) {
          console.log(error);
          
          // обработка ошибки
        }
        setIsModalOpen(false)
      };  

    const onClose = () => {
        setIsModalOpen(false);
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Отправить партнеру',
        },
        {
            key: '2',
            label: 'Скачать договор',
        },
        {
            key: '3',
            label: 'Прикрепить договор',
        },
        {
            key: '4',
            label: 'Активировать',
        },
    ];

    const menu = (
        <Menu items={items}/>
    );

    // const getExecutorFotFiltersOne = (filters, category, firstname, id) => {
    //     if (filters) {
    //           const array = []
    //           filters[category].forEach((el, i) => {
              
              
    //                 const obj = {
    //                 label: el[firstname],
    //                 value: el[id],
    //                 }
    //                 array.push(obj)
    //           })
    //           array.unshift({label: 'Не выбрано', value: '',})
    //           return array
              
    //           }
    // } 

    const handleSelectChange = (type, item) => {
        setFiltersData((prevState) => ({
            ...prevState,
            [type]: item,
        }));
        
    };

    // const onHandleOk = () => {        
    //     trigger(filtersData)
    //     setOpen(false)
    // }

    // const onResetFilters = () => {
    //     trigger('')
    //     setOpen(false)
    // }

    const handleSelectRANGEDATAChange = (data, dateString) => {
        setFiltersData((prevState) => ({
        ...prevState,
        date_start: dateString[0],
        date_end: dateString[1],
        }));

    };

    return (
        <div className={cls.wrapper}>
            <div className={cls.heading}>

                <Typography.Title>
                    Программы лояльностей

                </Typography.Title>

                <div>

                    {/* <Button type={'primary'} className="filters" onClick={() => setOpen(true)}>
                        Фильтры
                    </Button> */}

                    {/* <Button style={{margin: '0 10px'}} type="primary" icon={<DownloadOutlined/>}>.xlsx</Button> */}

                    <Button type="primary" onClick={showDrawer}>Добавить программу</Button>

                </div>

            </div>

            <Modal

                title={(
                    <div className={cls.modalHeading}>
                        <Typography.Title level={4}>
                            Добавить программу
                        </Typography.Title>
                        <Dropdown overlay={menu} trigger={["hover"]} disabled>
                            <UnorderedListOutlined style={{color: '#ccc'}} className={cls.modalHeadingIcon}/>
                        </Dropdown>
                    </div>
                )}
                styles={{
                    body: {}
                }}
                style={{
                    marginTop: '-80px',
                }} width={'60%'}
                open={isModalOpen}
                onCancel={onClose}
                footer={[
                    <div className={cls.modalFooter}>
                        <Button type="primary" onClick={onClick}>Добавить</Button>
                        <Button onClick={onClose}>Закрыть</Button>
                    </div>
                ]}>

                <div style={{display: 'flex', gap: '25px', height: "75vh"}}>
                    
                    <Form className={cls.form} placeholder="Input placeholder"> 
                    <Input placeholder="Input placeholder" />
                    <Input placeholder="Input placeholder" />
                    <Input placeholder="Input placeholder" />
                    </Form> 


                    
                </div>
                
            </Modal>
            <TableDeal data={initData} refetch={refetch} isLoad={isLoading}/>
            {/* {isSuccess ? (
                

            ) : (
                <TableDeal data={data} refetch={refetch} isLoad={isLoading}/>

            )} */}

            {/* <Drawer
                title={'Фильтры'}
             onClose={() => setOpen(false)} placement={'left'} open={open}>

                <div style={{display: 'flex', gap: '15px', marginBottom: '25px',}}>
                    <RangePicker onChange={(dates, dateStrings) => handleSelectRANGEDATAChange(dates, dateStrings)} style={{width: '50%'}} placeholder={['Начало', 'Конец']}/>
                    <Select
                        onChange={(item) => handleSelectChange('debt_date', item)}
                        placeholder="Выберите период"
                        style={{width: '50%'}}
                        options={[
                            {value: '', label: 'Не выбрано'},
                            {value: 'today', label: 'Сегодня'},
                            {value: 'yesterday', label: 'Вчера'},
                            {value: 'week', label: 'Неделя'},
                            {value: 'month', label: 'Месяц'},
                            {value: 'year', label: 'Год'},
                        ]}/>
                </div>

                <div style={{}}>
                    <Select

                        style={{minWidth: '32%', height: '35px', marginBottom: '15px'}}
                        showSearch
                        onChange={(item) => handleSelectChange('partner', item)}
                        placeholder="Выберите партнера"
                        optionFilterProp="children"
                        filterOption={filterOption}
                        notFoundContent={<NotfoundComponement/>}
                        // options={getExecutorFotFiltersOne(data?.filters, 'partner' ,'bill_first_name', 'id')}

                    />

                    <Select
                        style={{minWidth: '32%', height: '35px', marginBottom: '15px'}}
                        showSearch
                        onChange={(item) => handleSelectChange('investor', item)}
                        placeholder="Выберите службу безопасности"
                        optionFilterProp="children"
                        filterOption={filterOption}
                        notFoundContent={<NotfoundComponement/>}
                        // options={getExecutorFotFiltersOne(data?.filters, 'security' ,'first_name', 'id')}

                    />

                    <Select
                        style={{minWidth: '32%', height: '35px', marginBottom: '15px'}}
                        showSearch
                        onChange={(item) => handleSelectChange('creditor', item)}
                        placeholder="Выберите менеджера"
                        optionFilterProp="children"
                        filterOption={filterOption}
                        notFoundContent={<NotfoundComponement/>}
                        // options={getExecutorFotFiltersOne(data?.filters, 'manager' ,'first_name', 'id')}

                    />
                </div>

                <div style={{}}>
                    <Select
                        style={{minWidth: '32%', height: '35px', marginBottom: '15px'}}
                        onChange={(item) => handleSelectChange('status', item)}
                        placeholder={'Не выбрано'}
                        options={[
                            {value: '', label: 'Выбрать статус'},
                            {value: 'Текущий', label: 'Текущий'},
                            {value: 'Просрочен', label: 'Просрочен'},
                            {value: 'Закрыт', label: 'Закрыт'},
                            {value: 'Черновик', label: 'Черновик'},
                        ]}/>

                    <Input style={{minWidth: '32%', height: '35px', marginBottom: '15px'}} placeholder="Введите клиента" onChange={(item) => handleSelectChange('client', item.target.value)}

                        />
                    <Input style={{minWidth: '32%', height: '35px', marginBottom: '15px'}} placeholder="Введите продукт" onChange={(item) => handleSelectChange('product', item.target.value)}/>
                </div>

                <div style={{}}>
                    <Input style={{minWidth: '32%', height: '35px', marginBottom: '15px'}} type={"number"} placeholder="Введите цену" onChange={(item) => handleSelectChange('debt_price', item.target.value + `.00`)}
/>
                    <Input style={{minWidth: '32%', height: '35px', marginBottom: '15px'}} type={"number"} placeholder="Введите серию паспорта" onChange={(item) => handleSelectChange('passport_serial', item.target.value)}/>
                    <Input style={{minWidth: '32%', height: '35px', marginBottom: '15px'}} type={"number"} placeholder="Введите номер паспорта" onChange={(item) => handleSelectChange('passport_number', item.target.value)}/>
                </div>

                <div style={{
                    width: '80%',
                    position: 'absolute',
                    bottom: '5%', 

                    
                }}>
                
                        <Button style={{width:'100%', marginTop: '15px'}} type="primary">Очистить фильтры</Button>
                        <Button style={{width:'100%', marginTop: '15px'}} type="primary">Сохранить</Button>
                </div>

            </Drawer> */}
        </div>
    )
};