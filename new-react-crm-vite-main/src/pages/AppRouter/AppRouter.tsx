import {Route, Routes} from "react-router-dom";
import {
    DealPage,
    NotFoundPage,
    MainPage,
    SuitcaseReports,
    MutualSettlementsReports,
    ProfitsReports,
    TasksPage,
    InvestorsPage,
    SuppliersPage,
    InvoicePage,
    ExpensesPage,
    PartnersPage,
    EmployeesPage, ContractPage, UsersPage, LenderPage,

} from "@/pages";
import FinancesPage from "@/pages/FinancesPage/FinancesPage.tsx";
import {StatisticPage} from "@/pages";
import {LoginPage} from "@/pages/LoginPage/LoginPage.tsx";
import {PrivateRoute} from "@/components";


export const AppRouter = () => {
    return (
        <div className="page-wrapper">
            <Routes>
                <Route path={"/"} element={ <MainPage/> }/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/statistics"} element={ <StatisticPage/> }/>
                <Route path={"/deal"} element={ <DealPage/> }/>
                <Route path={"*"} element={ <NotFoundPage/> }/>
                <Route path={"/reports"}>
                    <Route path={"/reports/profits"} element={ <ProfitsReports/> }/>
                    <Route path={"/reports/suitcase"} element={ <SuitcaseReports/> }/>
                    <Route path={"/reports/settlements"}
                           element={ <MutualSettlementsReports/> }/>
                </Route>
                <Route path={"/finances"} element={ <FinancesPage/> }/>
                <Route path={"/tasks"} element={ <TasksPage/> }/>
                <Route path="/directories">
                    <Route path="/directories/employees" element={ <EmployeesPage/> }/>
                    <Route path="/directories/expenses" element={ <ExpensesPage/> }/>
                    <Route path="/directories/invoice" element={ <InvoicePage/> }/>
                    <Route path="/directories/partners" element={ <PartnersPage/> }/>
                    <Route path="/directories/suppliers" element={ <SuppliersPage/> }/>
                    <Route path="/directories/contract" element={ <ContractPage/> }/>
                    <Route path="/directories/investors" element={ <InvestorsPage/> }/>
                    <Route path="/directories/users" element={ <UsersPage/> }/>
                    <Route path="/directories/lenders" element={ <LenderPage/> }/>
                </Route>
            </Routes>
        </div>
    );
};

