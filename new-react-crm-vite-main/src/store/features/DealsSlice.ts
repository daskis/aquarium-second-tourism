import { createSlice } from "@reduxjs/toolkit";
import { IValue } from "@/types";

type dealValue = {
    Deals: Array<IValue>,
}

const initialState:dealValue = {
    Deals: [
        {
            dept_num:1,
            borrower: {
                first_name:'Спанч',
                surname:'Боб',
                middle_name:'Сквепенс',
                birth_date:'1983-08-21',
                phohe_number:'+79214212342',
                passport_serial:2652,
                passport_number:251242,
                passport_date:'2014-03-13',
                address:'Смолвиль',
                work_place:'Повар крановщик',
            },
            product:{
                debt_num: 1,
                debt_type: 'Тунец',
                debt_amount: '140000.00',
                cost_price: "100000.00",
                initial_fee: "20000.00",
                debt_term: 12,
                initial_fee_pay_method: "Карта",
                month_fee: "12000.00",
                debt_date: "2023-09-01",
                pay_date: "2023-10-01",
                creditorbillinfo: {
                    bill_phone:"+79286648551"
                },
                partner:"Надежность",
                security:"Адам Адамов",
            },
            guarantors: {
                first_name:"Поручитель 1",
                surname:"Поручитель 1",
                middle_name:"Поручитель 1",
                birth_date:"1983-08-21",
                phone_number:"+79285544112",
                passport_serial:2652,
                passport_number:265285,
                passport_date:"2014-03-13",
            },

        },

        {
            dept_num:1,
            borrower: {
                first_name:'Спанч',
                surname:'Боб',
                middle_name:'Сквепенс',
                birth_date:'1983-08-21',
                phohe_number:'+79214212342',
                passport_serial:2652,
                passport_number:251242,
                passport_date:'2014-03-13',
                address:'Смолвиль',
                work_place:'Повар крановщик',
            },
            product:{
                debt_num: 1,
                debt_type: 'Тунец',
                debt_amount: '140000.00',
                cost_price: "100000.00",
                initial_fee: "20000.00",
                debt_term: 12,
                initial_fee_pay_method: "Карта",
                month_fee: "12000.00",
                debt_date: "2023-09-01",
                pay_date: "2023-10-01",
                creditorbillinfo: {
                    bill_phone:"+79286648551"
                },
                partner:"Надежность",
                security:"Адам Адамов",
            },
            guarantors: {
                first_name:"Поручитель 1",
                surname:"Поручитель 1",
                middle_name:"Поручитель 1",
                birth_date:"1983-08-21",
                phone_number:"+79285544112",
                passport_serial:2652,
                passport_number:265285,
                passport_date:"2014-03-13",
            },

        },
    ]
}

const DealsSlice = createSlice({
    name:'DealsArr',
    initialState,
    reducers:{

        addDeal(state,action){
            state.Deals.push(action.payload)
        },

    }
})


export const {addDeal} = DealsSlice.actions;
export default DealsSlice.reducer

