import { configureStore } from "@reduxjs/toolkit";
import openDealSlice from "./features/OpenDealSlice";
import DealsSlice from "./features/DealsSlice";
import {reportsApi} from "@/store/services/ReportsApi.ts";
import {loginApi} from "@/store/services/LoginApi.ts";
import {dealApi} from "@/store/services/DealApi.ts";
import {financesApi} from "@/store/services/FinancesApi.ts";
import {tasksApi} from "@/store/services/TasksApi.ts";
import { sellersApi } from "@/store/services/directories/SellersApi";
import { employeesApi } from "@/store/services/directories/EmployeesApi";
import { partnersApi } from "./services/directories/PartnersApi";
import { lenderApi } from "./services/directories/LenderApi";
import { usersApi } from "./services/directories/UsersApi";
import { investorsApi } from "./services/directories/InvestorsApi";
import { invoiceApi } from "./services/directories/InvoiceApi";
import { suppliersApi } from "./services/directories/SuppliersApi";
import { expensesApi } from "./services/directories/ExpensesApi";
import { statisticApi } from "./services/StatisticApi";



const store = configureStore({
    reducer: {
        DealsArr: DealsSlice,
        createDealStatus: openDealSlice,
        [loginApi.reducerPath]: loginApi.reducer,
        [reportsApi.reducerPath]: reportsApi.reducer,
        [dealApi.reducerPath]: dealApi.reducer,
        [financesApi.reducerPath]: financesApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
        [sellersApi.reducerPath]: sellersApi.reducer,
        [employeesApi.reducerPath]: employeesApi.reducer,
        [partnersApi.reducerPath]: partnersApi.reducer,
        [lenderApi.reducerPath]: lenderApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [investorsApi.reducerPath]: investorsApi.reducer,
        [invoiceApi.reducerPath]: invoiceApi.reducer,
        [suppliersApi.reducerPath]: suppliersApi.reducer,
        [expensesApi.reducerPath]: expensesApi.reducer,
        [statisticApi.reducerPath]: statisticApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            reportsApi.middleware,
            loginApi.middleware,
            dealApi.middleware,
            financesApi.middleware,
            tasksApi.middleware,
            sellersApi.middleware,
            employeesApi.middleware,
            partnersApi.middleware,
            lenderApi.middleware,
            usersApi.middleware,
            investorsApi.middleware,
            invoiceApi.middleware,
            suppliersApi.middleware,
            expensesApi.middleware,
            statisticApi.middleware
            )
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch