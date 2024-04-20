export enum DirectoriesPagesEnum {
    CONTRACT = 'contract',
    EXPENSES = 'expenses',
    EMPLOYEES = 'employees',
    INVOICE = 'invoice',
    PARTNERS = 'partners',
    SUPPLIERS = 'suppliers',
    INVESTORS = 'investors',
    USERS = 'users',
    LENDERS = 'lenders'
}

export interface IContractColumns {
    first_name: string,
    surname: string,
    middle_name: string,
    password_serial: string,
    password_number:  string,
    password_date: string,
}

export interface IEmployeesColumns {
    first_name: string,
    surname: string,
    middle_name: string,
}

export interface IInvestorColumns {
    first_name: string,
    surname: string,
    middle_name: string,
}

export interface ILenderColumns {
    first_name: string,
    surname: string,
    middle_name: string,
}

export interface IExpensesColumns {
    name:string,
}

export interface IInvoiceColumns {
    bill_phone: string,
    bill_card: string,
    bill_bank: string,
    bill_first_name: string,
    bill_middle_name: string,
    bill_is_active: string,
}

export interface ISuppliersColumns {
    name:string,
}

export interface IPartnerColumns {
    name:string,
    bill_phone:string,
    bill_card: string,
    bill_first_name:string,
    email:string,
}

export interface IExpensesColumns {
    name:string,
}

export interface IUsersColumns {
    id: number,
    username: string,
    first_name:string,
    last_name:string,
    staff:string,
    is_active:string,
    date_joinded: string,
    last_login: string,

}

export interface IUsersAdd {
    username: string,
    first_name:string,
    last_name:string,
    staff:string,
    is_active:string,
    date_joinded: string,
    last_login: string
}