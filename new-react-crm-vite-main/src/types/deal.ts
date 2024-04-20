export type IValue = {
    dept_num: number,
    borrower: {
        first_name:string,
        surname:string,
        middle_name:string,
        birth_date:string,
        phohe_number:string,
        passport_serial:number,
        passport_number:number,
        passport_date:string,
        address:string,
        work_place:string,
    },
    product:{
        debt_num: number,
        debt_type:string ,
        debt_amount: string,
        cost_price: string,
        initial_fee: string,
        debt_term: number,
        initial_fee_pay_method: string,
        month_fee: string,
        debt_date: string,
        pay_date: string,
        creditorbillinfo: {
            bill_phone:string
        },
        partner:string,
        security:string,
    },
    guarantors: {
        first_name:string,
        surname:string,
        middle_name:string,
        birth_date:string,
        phone_number:string,
        passport_serial:number,
        passport_number:number,
        passport_date:string,
    },

}

export enum DealStatusEnum {
    DONE = "Текущий",
    INPROCESS = "Просрочен",
    REJECTED = "Закрыт",
    DRAFT = 'Черновик'
}
export interface DataType {
    id: number;
    name: string;
    product: string;
    credit: number;
    debt: number;
    currentDebt: number;
    term: string;
    issueDate: string;
    paymentDate: string;
    status: string;
    partner: string;
}2