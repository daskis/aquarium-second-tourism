import {ILoginRequest, useLoginMutation} from "@features/auth/lib";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export const useLogin = () => {
    const [loginTrigger, {data, isLoading}] = useLoginMutation()
    const navigate = useNavigate()
    const trigger = async (data: ILoginRequest) => {
        await loginTrigger(data)
    }
    useEffect(() => {
        if (data) {
            toast.success("Вы успешно вошли")
            console.log(data)
            setTimeout(() => {
                navigate("/home")
            }, 1500)
        }
    }, [data]);


    return {trigger, data, isLoading}
}
