import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/styles/global.scss'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "@/store";
import locale from "antd/locale/ru_RU"
import {ConfigProvider} from "antd";
ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <ConfigProvider locale={locale}>
                <App/>
            </ConfigProvider>
        </Provider>
    </BrowserRouter>
)
