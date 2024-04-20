export enum InputsFilterEnum {
    CREATED_BY = "created_by",
    EXECUTOR = "executor",
    LOAN = "loan",
    IMPORTANT = "important",
    STATUS = "status"
}
export interface FiltersData {
    debt_date_start: string;
    debt_date_end: string;
    created_by: string;
    executor: string;
    loan: number;
    important?: boolean;
    status?: boolean;
}

export interface TableData {
    name: string,
    plan_date:string,
    status: string ,
    create_by:string,
    executor:string,
    loan:string,
}

export enum TasksSendType {
    POST = "post",
    PATCH = "patch"
}