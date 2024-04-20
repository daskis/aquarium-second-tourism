import React from 'react';
import { useCallback } from 'react';

import { Divider, Select, DatePicker, Button, Spin } from 'antd';

import styles from './StatisticPage.module.scss'

import { LoadingOutlined } from '@ant-design/icons';
import { FirstGraph } from './graphics/FirstGraph';
import { SecondGraph } from './graphics/SecondGraph';
import { ThirdGraph } from './graphics/ThirdGraph';
import { FourthGraph } from './graphics/FourthGraph';
import { NotfoundComponement } from '@/components/notfoundcom/Notfound';
// import { useGetStatisticQuery, useLazyGetStatisticQuery} from '@/store/services/StatisticApi';

const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };


export const StatisticPage = () => {
      // const {data} = useGetStatisticQuery(null)      
      const [filtersData, setFiltersData] = React.useState({
        debt_date: "2022-11-15",
        debt_date_start: "2022-11-01",
        debt_date_end: "2022-12-01",
        creditors: ["ABC Bank", "XYZ Financial Services", "123 Credit Union"],
        investors: ["Investment Group A", "Capital Ventures", "Wealth Management Inc."],
        partners: ["Tech Innovations LLC", "Global Solutions Corp", "Digital Ventures Group"]
          });
          
//           const [trigger, { data: filteredData, isSuccess }] = useLazyGetStatisticQuery(filtersData);
//  console.log(filtersData);
 
    

      const { RangePicker } = DatePicker;

      function NumberWithCommas({ number }) {
            return <span>{Number(number).toLocaleString()}</span>;
          }

      // Filter `option.label` match the user type `input`
      const filterOption = (input: string, option?: { label: string; value: string }) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase());



const handleSelectChange = (type, item) => {
  setFiltersData((prevState) => ({
    ...prevState,
    [type]: item,
  }));

};



const handleSelectRANGEDATAChange = (data, dateString) => {
      setFiltersData((prevState) => ({
        ...prevState,
        debt_date_start: dateString[0],
        debt_date_end: dateString[1],
      }));
      setFiltersData((prevFiltersData) => {
            return prevFiltersData;
          });
    };


    // const resetFilters = useCallback(async () => {
    //   setFiltersData(prevFiltersData => ({
    //     debt_date: '',
    //     debt_date_start: '',
    //     debt_date_end: '',
    //     partners: [],
    //     manager: [],
    //     investors: [],
    //   }));
    
    //   await trigger(filtersData);
    // }, [trigger]);


    
    return (


                  <div className={styles.statistic}>
                  <Divider style={{fontSize: '18px', marginBottom: '35px'}} orientation="center">Добрый день Username ! </Divider>
          
                      <div className={styles.timeline}>
                      <Select
                      placeholder="Выберите период"
                      onChange={(item) => handleSelectChange('debt_date', item)}
                        style={{ width: '50%' }}
                  
                        options={[
                  { value: '', label: 'Не выбрано' },
                  { value: 'today', label: 'Сегодня' },
                  { value: 'yesterday', label: 'Вчера' },
                  { value: 'week', label: 'Неделя' },
                  { value: 'month', label: 'Месяц'},
                  { value: 'year', label: 'Год'},
                        ]}
                        />
                        <RangePicker onChange={(dates, dateStrings) => handleSelectRANGEDATAChange(dates, dateStrings)} style={{width:'50%'}} placeholder={['Начало','Конец']}/>
                      </div>
        

          
                  <div className={styles.statisticItem}>
          
                      <div className={styles.statisticItem__block}>
                            <span className={styles.title}>Посещения</span>
                            <span className={styles.curriency}>201304.</span>
                            <span className={styles.curriency}>шт.</span>
                      </div>
          
                      {/* <div className={styles.statisticItem__block}>
                            <span className={styles.title}>Активные посещения</span>
                            <span className={styles.curriency}>201304.</span>
                            <span className={styles.curriency}>шт.</span>
                      </div> */}
          
                      {/* <div className={styles.statisticItem__block}>
                            <span className={styles.title}>Услуги</span>
                            <span className={styles.curriency}>12.</span>

                            <span className={styles.curriency}>шт.</span>
                      </div> */}
          
                      {/* <div className={styles.statisticItem__block}>
                            <span className={styles.title}>Кол-во просроченных</span>
                            <span className={styles.curriency}>201304.</span>
                            <span className={styles.curriency}>шт.</span>
                      </div> */}
          
                      <div className={styles.statisticItem__block}>
                            <span className={styles.title}>Баллов в обороте</span>
                            <span className={styles.curriency}>201304.</span>
                            <span className={styles.curriency}>шт.</span>
                      </div>
          
          
                      <div className={styles.statisticItem__block}>
                            <span className={styles.title}>Потреченных былов</span>
                            <span className={styles.curriency}>201304.</span>

                            <span className={styles.curriency}>шт.</span>
                      </div>

                      <div className={styles.statisticItem__block}>
                            <span className={styles.title}>Сгоревших баллов</span>
                            <span className={styles.curriency}>201304.</span>

                            <span className={styles.curriency}>шт.</span>
                      </div>
          
          
          
                      <div className={styles.statisticItem__block}>
                            <span className={styles.title}>Кол-во текущих мероприятий</span>
                            <span className={styles.curriency}>5.</span>

                            <span className={styles.curriency}>шт.</span>
                      </div>
          
          
                      <div className={styles.statisticItem__block}>
                            <span className={styles.title}>Кол-во закрытых мероприятий</span>
                            <span className={styles.curriency}>254.</span>

                            <span className={styles.curriency}>шт.</span>
                      </div>
          
                  </div>
          
          
                  <Divider orientation="center">На графиках</Divider>
          
                  {/* <div className={styles.graphic}> */}
                        {/* <div className={styles.graphic__block}>
                              <Divider style={{fontSize: '16px', marginBottom: '25px', marginTop:'0'}} orientation="center">Статистика прибыли</Divider>
                              {isSuccess ? (
                              <FirstGraph current={filteredData?.current_profit_chart} previous={filteredData?.previous_profit_chart}/>
                            ) : (
                              <FirstGraph current={data.current_profit_chart} previous={data.previous_profit_chart}/>
                            )}
                        </div>

                        <div className={styles.graphic__block}>
                              <Divider style={{fontSize: '16px', marginBottom: '25px', marginTop:'0'}} orientation="center">Статистика просрочек</Divider>
                              {isSuccess ? (
                              <SecondGraph current={filteredData?.current_year_count} previous={filteredData?.previous_year_count}/>
                            ) : (
                              <SecondGraph current={data.current_year_count} previous={data.previous_year_count}/>
                            )}
                        </div>

                        <div className={styles.graphic__block}>
                              <Divider style={{fontSize: '16px', marginBottom: '25px', marginTop:'0'}} orientation="center">Статистика продаж</Divider>
                              {isSuccess ? (
                              <ThirdGraph current={filteredData?.current_year_chart} previous={filteredData?.previous_year_chart}/>
                            ) : (
                              <ThirdGraph current={data.current_year_chart} previous={data.previous_year_chart}/>
                            )}
                        </div>

                        <div className={styles.graphic__block}>
                              <Divider style={{fontSize: '16px', marginBottom: '25px', marginTop:'0'}} orientation="center">Количество продаж</Divider>
                              {isSuccess ? (
                              <FourthGraph current={filteredData?.current_year_count} previous={filteredData?.previous_year_count}/>
                            ) : (
                              <FourthGraph current={data.current_year_count} previous={data.previous_year_count}/>
                            )} */}

                        {/* </div> */}
                    {/* </div> */}
          
                 </div> 
            )

};

