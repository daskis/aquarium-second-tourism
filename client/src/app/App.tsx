import React, {DetailedHTMLProps, HTMLAttributes} from "react";
import {classNames, Theme, useTheme} from "@shared/lib";
import {ToastContainer} from "react-toastify";

interface IAppProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

export const App = ({children}: IAppProps) => {
    const {theme} = useTheme();
    console.log(theme)
    return <div className={classNames('app', {}, [theme])}>

        <>
            <ToastContainer
                style={{zIndex: 10000000}}
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme === Theme.LIGHT ? "light" : "dark"}
            />
            {children}
        </>
    </div>;
};