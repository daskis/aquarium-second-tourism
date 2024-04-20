import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Button, Menu, Typography} from 'antd';
import {Link, useLocation} from "react-router-dom";
import DashboardIcon from "@/assets/images/dashboard/icons/dashboard.svg";
import TaskIcon from "@/assets/images/dashboard/icons/tasks.svg"
import cls from "./Sibebar.module.scss"
import UserIcon from "@/assets/images/dashboard/profile.png"
import {DirectoriesPagesEnum, ReportsTypeEnum} from "@/types";
import {SidebarTask} from '../SidebarTask/SidebarTask';

type MenuItem = Required<MenuProps>['items'][number];
import Dashboard from "@/assets/icons/dashboard.svg"
import Deals from "@/assets/icons/deals.svg"
import Reports from "@/assets/icons/reports.svg"
import Tasks from "@/assets/icons/tasks.svg"

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[] | null,
    type?: 'group',
    className?: string
): MenuItem {
    return {
        key,
        icon,
        className,
        children,
        label,
        type
    } as MenuItem;
}


const items: MenuItem[] = [
    getItem(<Link to={"/statistics"}>Статистика</Link>, '1', <Dashboard/>,),
    getItem(<Link to={"/deal"}>Программы</Link>, '2', <Deals/>),
    // getItem("Отчеты", '3', <Deals/>, [
    //     getItem(
    //         <Link to={`/reports/${ReportsTypeEnum.PROFITS}`}>Прибыль и убытки</Link>, "31", null),
    //     getItem(
    //         <Link to={`/reports/${ReportsTypeEnum.SUITCASE}`}>Потфель инвестора</Link>, "32", null),
    //     getItem(
    //         <Link to={`/reports/${ReportsTypeEnum.MUTUALSETTLEMENTS}`}>Взаиморасчеты</Link>, "33", null),
    // ]),
    getItem(<Link to={"/finances"}>Финансы</Link>, '4', <Tasks/>),
    // getItem(<Link to={"/tasks"}>Задачи</Link>, '5', <Tasks/>),
    // getItem("Справочники", '6', <Tasks/>, [
    //     getItem(
    //         <Link to={`/directories/${DirectoriesPagesEnum.CONTRACT}`}>Данные для договора</Link>, "61", null),
    //     getItem(
    //         <Link to={`/directories/${DirectoriesPagesEnum.INVOICE}`}>Счет для оплаты</Link>, "62", null),
    //     getItem(
    //         <Link to={`/directories/${DirectoriesPagesEnum.INVESTORS}`}>Инвестора</Link>, "63", null),
    //     getItem(
    //         <Link to={`/directories/${DirectoriesPagesEnum.PARTNERS}`}>Партнеры</Link>, "64", null),
    //     getItem(
    //         <Link to={`/directories/${DirectoriesPagesEnum.EMPLOYEES}`}>Сотрудники</Link>, "65", null),
    //     getItem(
    //         <Link to={`/directories/${DirectoriesPagesEnum.SUPPLIERS}`}>Поставщики</Link>, "66", null),
    //     getItem(
    //         <Link to={`/directories/${DirectoriesPagesEnum.EXPENSES}`}>Виды расходов</Link>, "67", null),
    //     getItem(
    //         <Link to={`/directories/${DirectoriesPagesEnum.LENDERS}`}>Займодатели</Link>, "68", null),
    //     getItem(
    //         <Link to={`/directories/${DirectoriesPagesEnum.USERS}`}>Пользователи</Link>, "69", null)
    // ]),
];

export const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation()
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    if (location.pathname === "/login") {
        return (<></>)
    } else {
        return (
            <div className={cls.sidebar}
                 style={collapsed ? {maxWidth: 100, padding: "20px 10px"} : {minWidth: 250, padding: "20px 10px"}}>
                <Typography.Title
                    style={{marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #EBEFF2'}}
                    level={3}>SaaS {collapsed ? "" : "comp"}</Typography.Title>
                <Link to={"/user"} className={cls.user}>
                    <img className={cls.userImg} src={UserIcon} alt=""/>
                    <div
                        className={cls.userInfo}
                        style={collapsed ? {opacity: "0%", display: "none"} : {opacity: "100%", display: "flex"}}>
                        <Typography.Text className={cls.userName}>Jonh Doe</Typography.Text>
                        <Typography.Text className={cls.userEmail}>JonhDoe@example.com</Typography.Text>
                    </div>
                </Link>
                <Menu
                    className={cls.menu}
                    theme="light"
                    mode="vertical"
                    style={{width: "100%"}}
                    items={items}
                    
                />
                <Button type="primary" onClick={toggleCollapsed} style={{marginBottom: 16}}>
                    {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                </Button>
            </div>
        );
    }
};


