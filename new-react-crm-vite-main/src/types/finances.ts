export interface IFinancesColumns {
    date: string
    type: string
    operation: string
    amount: string
    details: string
}
export enum FinancesSendType {
    POST = "post",
    PATCH = "patch"
}