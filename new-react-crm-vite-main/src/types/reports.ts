export enum ReportsTypeEnum {
    PROFITS = "profits",
    SUITCASE = "suitcase",
    DISTRIBUTION = "distribution",
    MUTUALSETTLEMENTS = "settlements",
}



export interface Investment {
    date: string;
    term: number;
    amount: number;
}

export interface InvestorData {
    investments: Investment[];
    total: number;
    withdrow_dividends: number;
    withdrow_investment: number;
    dividends: number;
    dividends_left: number;
    sum_investments: number;
}

export interface FormattedDataItem {
    key: string;
    name: string;
    date: string[];
    term: number[];
    amount: number[];
    total: number;
    withdrow_dividends: number;
    withdrow_investment: number;
    dividends: number;
    dividends_left: number;
    sum_investments: number;
}
export enum ProfitsButtonEnum {
    "GROSS" = "Gross",
    "CASH" = "Cashier"
}

export interface ISettlementsReports {
    name: string
    date_before: string
    debt_increase: string
    debt_decrease: string
    date_after: string

}
export enum SettlementsButtonEnum {
    "SALARY" = "salary",
    "PARTNERS" = "partners",
    "OTHER" = "other"
}
export enum SettlementsTypeEnum {
    "SALARY" = "salary",
    "PARTNERS" = "partners",
    "SUPPLIERS" = "suppliers"
}

export interface IndirectExpenses {
    Зарплата?: number;
    Аренда?: number;
    ГСМ?: number;
    Связь?: number;
}
export enum MonthsEnum {
    'янв' = 1,
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
}