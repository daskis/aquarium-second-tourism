import {useLocation} from "react-router-dom";
import {useMemo} from "react";
import {v4 as uuidv4} from "uuid"
import {FormattedDataItem, IndirectExpenses, InvestorData, MonthsEnum} from "@/types";
import * as dayjs from "dayjs"

export function useQuery() {
    const {search} = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

export function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1
    const year = date.getFullYear();

    // Проверяем, если день или месяц меньше 10, то добавляем ведущий ноль
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}.${formattedMonth}.${year}`;
}

export const transformIndirectExpenses = (data: any[]): IndirectExpenses[] => {
    const result: IndirectExpenses[] = [];

    for (let i = 0; i < 3; i++) {
        const currentData = data[i]?.expenses || {};
        const transformedData: IndirectExpenses = {};

        transformedData['Зарплата'] = currentData['Зарплата'] || null;
        transformedData['Аренда'] = currentData['Аренда'] || null;
        transformedData['ГСМ'] = currentData['ГСМ'] || null;
        transformedData['Связь'] = currentData['Связь'] || null;

        result.push(transformedData);
    }

    return result;
};
export const formatDataForProfits = (serverData: Array<any>, type: "acurral" | "cash") => {
    if (serverData) {
        const transformedData = transformIndirectExpenses(serverData);

        if (type === "acurral") {
            const expeencesResult = transformedData.map((item) => {
                const mount = item["Зарплата"] + item["Аренда"] + item["ГСМ"] + item["Связь"]
                return mount
            })
            const values = [
                {
                    accountingTypes: "Выручка",
                    mount_1: parseInt(serverData[0].debt_amount).toFixed(2),
                    mount_2: parseInt(serverData[1].debt_amount).toFixed(2),
                    mount_3: parseInt(serverData[2].debt_amount).toFixed(2),
                    result: parseInt(serverData[0].debt_amount + serverData[1].debt_amount + serverData[2].debt_amount).toFixed(2),
                },
                {
                    accountingTypes: "Себестоимость",
                    mount_1: parseInt(serverData[0].cost_price).toFixed(2),
                    mount_2: parseInt(serverData[1].cost_price).toFixed(2),
                    mount_3: parseInt(serverData[2].cost_price).toFixed(2),
                    result: parseInt(serverData[0].cost_price + serverData[1].cost_price + serverData[2].cost_price).toFixed(2),
                },
                {
                    accountingTypes: "Валовая прибыль",
                    mount_1: parseInt(serverData[0].gross_profit).toFixed(2),
                    mount_2: parseInt(serverData[1].gross_profit).toFixed(2),
                    mount_3: parseInt(serverData[2].gross_profit).toFixed(2),
                    result: parseInt(serverData[0].gross_profit + serverData[1].gross_profit + serverData[2].gross_profit).toFixed(2),
                },
                {
                    accountingTypes: "Рентабельность по валовой прибыли",
                    mount_1: parseInt(serverData[0].gross_profit_percent).toFixed(2),
                    mount_2: parseInt(serverData[1].gross_profit_percent).toFixed(2),
                    mount_3: parseInt(serverData[2].gross_profit_percent).toFixed(2),
                    result: parseInt(serverData[0].gross_profit_percent + serverData[1].gross_profit_percent + serverData[2].gross_profit_percent).toFixed(2),
                },
                {
                    accountingTypes: "Косвенные расходы",
                    mount_1: transformedData[0]["Зарплата"] + transformedData[0]["Аренда"] + transformedData[0]["ГСМ"] + transformedData[0]["Связь"],
                    mount_2: transformedData[1]["Зарплата"] + transformedData[1]["Аренда"] + transformedData[1]["ГСМ"] + transformedData[1]["Связь"],
                    mount_3: transformedData[2]["Зарплата"] + transformedData[2]["Аренда"] + transformedData[2]["ГСМ"] + transformedData[2]["Связь"],
                    result: expeencesResult[0] + expeencesResult[1] + expeencesResult[2],
                    children: [
                        {
                            accountingTypes: "Зарплата",
                            mount_1: transformedData[0]["Зарплата"] | 0,
                            mount_2: transformedData[1]["Зарплата"] | 0,
                            mount_3: transformedData[2]["Зарплата"] | 0,
                            result: transformedData[0]["Зарплата"] + transformedData[1]["Зарплата"] + transformedData[2]["Зарплата"],
                        },
                        {
                            accountingTypes: "Аренда",
                            mount_1: transformedData[0]["Аренда"] | 0,
                            mount_2: transformedData[1]["Аренда"] | 0,
                            mount_3: transformedData[2]["Аренда"] | 0,
                            result: transformedData[0]["Аренда"] + transformedData[1]["Аренда"] + transformedData[2]["Аренда"],
                        },
                        {
                            accountingTypes: "ГСМ",
                            mount_1: transformedData[0]["ГСМ"] | 0,
                            mount_2: transformedData[1]["ГСМ"] | 0,
                            mount_3: transformedData[2]["ГСМ"] | 0,
                            result: transformedData[0]["ГСМ"] + transformedData[1]["ГСМ"] + transformedData[2]["ГСМ"],
                        },
                        {
                            accountingTypes: "Связь",
                            mount_1: transformedData[0]["Связь"] | 0,
                            mount_2: transformedData[1]["Связь"] | 0,
                            mount_3: transformedData[2]["Связь"] | 0,
                            result: transformedData[0]["Связь"] + transformedData[1]["Связь"] + transformedData[2]["Связь"],
                        },
                    ]
                },
                {
                    accountingTypes: "Прочие доходы",
                    mount_1: serverData[0].client_overpay,
                    mount_2: serverData[1].client_overpay,
                    mount_3: serverData[2].client_overpay,
                    result: serverData[0].client_overpay + serverData[1].client_overpay + serverData[2].client_overpay,
                },
                {
                    accountingTypes: "Прочие расходы",
                    mount_1: serverData[0].discount,
                    mount_2: serverData[1].discount,
                    mount_3: serverData[2].discount,
                    result: serverData[0].discount + serverData[1].discount + serverData[2].discount,
                },
                {
                    accountingTypes: "Чистая прибыль",
                    mount_1: serverData[0].net_profit,
                    mount_2: serverData[1].net_profit,
                    mount_3: serverData[2].net_profit,
                    result: serverData[0].net_profit + serverData[1].net_profit + serverData[2].net_profit,
                },
                {
                    accountingTypes: "Рентабельность по чистой прибыли",
                    mount_1: serverData[0].net_profit_percent,
                    mount_2: serverData[1].net_profit_percent,
                    mount_3: serverData[2].net_profit_percent,
                    result: serverData[0].net_profit_percent + serverData[1].net_profit_percent + serverData[2].net_profit_percent,
                },
            ]
            return values
        } else {
            const expeencesResult = transformedData.map((item) => {
                const mount = item["Зарплата"] + item["Аренда"] + item["ГСМ"] + item["Связь"]
                return mount
            })
            const values = [
                {
                    accountingTypes: "Прибыль всего",
                    mount_1: (serverData[0].cash_method_total),
                    mount_2: (serverData[1].cash_method_total),
                    mount_3: (serverData[2].cash_method_total),
                    result: (serverData[0].cash_method_total + serverData[1].cash_method_total + serverData[2].cash_method_total),
                },
                {
                    accountingTypes: "Прибыль за месяц",
                    mount_1: (serverData[0].cash_method),
                    mount_2: (serverData[1].cash_method),
                    mount_3: (serverData[2].cash_method),
                    result: (serverData[0].cash_method + serverData[1].cash_method + serverData[2].cash_method),
                },
                {
                    accountingTypes: "Косвенные расходы",
                    mount_1: transformedData[0]["Зарплата"] + transformedData[0]["Аренда"] + transformedData[0]["ГСМ"] + transformedData[0]["Связь"],
                    mount_2: transformedData[1]["Зарплата"] + transformedData[1]["Аренда"] + transformedData[1]["ГСМ"] + transformedData[1]["Связь"],
                    mount_3: transformedData[2]["Зарплата"] + transformedData[2]["Аренда"] + transformedData[2]["ГСМ"] + transformedData[2]["Связь"],
                    result: expeencesResult[0] + expeencesResult[1] + expeencesResult[2],
                    children: [
                        {
                            accountingTypes: "Зарплата",
                            mount_1: transformedData[0]["Зарплата"] | 0,
                            mount_2: transformedData[1]["Зарплата"] | 0,
                            mount_3: transformedData[2]["Зарплата"] | 0,
                            result: transformedData[0]["Зарплата"] + transformedData[1]["Зарплата"] + transformedData[2]["Зарплата"],
                        },
                        {
                            accountingTypes: "Аренда",
                            mount_1: transformedData[0]["Аренда"] | 0,
                            mount_2: transformedData[1]["Аренда"] | 0,
                            mount_3: transformedData[2]["Аренда"] | 0,
                            result: transformedData[0]["Аренда"] + transformedData[1]["Аренда"] + transformedData[2]["Аренда"],
                        },
                        {
                            accountingTypes: "ГСМ",
                            mount_1: transformedData[0]["ГСМ"] | 0,
                            mount_2: transformedData[1]["ГСМ"] | 0,
                            mount_3: transformedData[2]["ГСМ"] | 0,
                            result: transformedData[0]["ГСМ"] + transformedData[1]["ГСМ"] + transformedData[2]["ГСМ"],
                        },
                        {
                            accountingTypes: "Связь",
                            mount_1: transformedData[0]["Связь"] | 0,
                            mount_2: transformedData[1]["Связь"] | 0,
                            mount_3: transformedData[2]["Связь"] | 0,
                            result: transformedData[0]["Связь"] + transformedData[1]["Связь"] + transformedData[2]["Связь"],
                        },
                    ]
                },
                {
                    accountingTypes: "Прочие доходы",
                    mount_1: serverData[0].client_overpay,
                    mount_2: serverData[1].client_overpay,
                    mount_3: serverData[2].client_overpay,
                    result: serverData[0].client_overpay + serverData[1].client_overpay + serverData[2].client_overpay,
                },
                {
                    accountingTypes: "Прочие расходы",
                    mount_1: serverData[0].discount,
                    mount_2: serverData[1].discount,
                    mount_3: serverData[2].discount,
                    result: serverData[0].discount + serverData[1].discount + serverData[2].discount,
                },
                {
                    accountingTypes: "Чистая прибыль за месяц",
                    mount_1: (serverData[0].net_profit),
                    mount_2: (serverData[1].net_profit),
                    mount_3: (serverData[2].net_profit),
                    result: (serverData[0].net_profit + serverData[1].net_profit + serverData[2].net_profit),
                },
            ]
            console.log(values)
            return values
        }
    }
}

export const formatDataForTable = (data: Record<string, InvestorData>): FormattedDataItem[] | undefined => {
    if (data) {
        const array: FormattedDataItem[] = [];
        for (const [name, value] of Object.entries(data)) {
            const obj: FormattedDataItem = {
                name: name,
                key: uuidv4(),
                date: [],
                term: [],
                amount: [],
                total: value.total,
                withdrow_dividends: value.withdrow_dividends,
                withdrow_investment: value.withdrow_investment,
                dividends: value.dividends,
                dividends_left: value.dividends_left,
                sum_investments: value.sum_investments,
            };
            value.investments.forEach((item) => {
                obj.date.push(item.date);
                obj.term.push(item.term);
                obj.amount.push(item.amount);
            });
            array.push(obj);
        }
        return array;
    }
};
export const getLastDayOfMonth = (inputDate: string) => {
    const parts = inputDate.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // Месяцы в JavaScript начинаются с 0 (январь - 0, февраль - 1 и так далее)

    const date = new Date(year, month + 1, 0);

    return date.getDate(); // Возвращает последний день месяца
}
export const getPreviousMonths = (dateString: string): [string, keyof typeof MonthsEnum][][] => {
    const date = dayjs(dateString);
    const month = parseInt(date.format('MM'), 10);
    const year = date.format('YY');
    const result: [string, keyof typeof MonthsEnum][][] = [];

    for (let i = 0; i < 3; i++) {
        let currentMonth = month - i;
        let currentYear = parseInt(year, 10);

        if (currentMonth <= 0) {
            currentMonth += 12;
            currentYear--;
        }

        const monthKey: keyof typeof MonthsEnum = MonthsEnum[currentMonth as keyof typeof MonthsEnum];

        result.push([[currentYear.toString(), monthKey]]);
    }

    return result;
};


export const getKeyByValue = (object: object, value: number) => {
    for (const key in object) {
        if (object[key] === value) {
            return key;
        }
    }
    return null; // Если значение не найдено
}