import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import "@styles/global.scss"
import {router, store} from "@shared/lib";
import ThemeProvider from "@shared/lib/utils/providers/ThemeProvider/ui/ThemeProvider.tsx";
import {App} from "@app/App.tsx";
import {Provider} from "react-redux";
import {ConfigProvider} from "antd";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ConfigProvider
        theme={{
            components: {
                Button: {
                    colorPrimary: "#1677ff",
                    colorText: "#fff",
                    colorPrimaryHover: "#0958d9",
                },
                Progress: {
                    circleTextColor: "var(--progress)",
                    colorText: "var(--progress)",
                },
                Input: {
                    activeBg: "var(--bg)",
                    colorBgBase: "var(--bg)",
                    colorBorderBg: "var(--primary)",
                    colorBgMask: "var(--bg)",
                    hoverBg: "var(--bg)",
                    colorTextPlaceholder: "var(--text)",
                    activeBorderColor: "var(--primary)",
                    hoverBorderColor: "var(--primary)",

                },
                Typography: {
                    colorText: "var(--text)",
                    colorTextHeading: "#fff",
                    // colorLink: "#fff",
                    // colorLinkHover: "#eee",
                    // colorLinkActive: "#ddd"
                }
            }
        }}>

        <Provider store={store}>
            <ThemeProvider>
                <App>
                    <RouterProvider router={router}/>
                </App>
            </ThemeProvider>
        </Provider>
    </ConfigProvider>
)
