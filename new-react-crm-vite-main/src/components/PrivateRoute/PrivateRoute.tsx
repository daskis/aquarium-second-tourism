import {useVerifyUserMutation} from "@/store/services/LoginApi.ts";
import {useEffect} from "react";
import {Navigate} from "react-router-dom";

export const PrivateRoute = ({children}) => {
    const token = localStorage.getItem("token")
    if (token) {
        return children
    } else {
        return <Navigate to={"/login"}/>
    }
};

