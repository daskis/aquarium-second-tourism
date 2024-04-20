import { useGetSidebarTasksQuery } from '@/store/services/TasksApi';
import cls from './SidebarTask.module.scss'


export const SidebarTask = ({collapsed}) => {
    const {data, isLoading} = useGetSidebarTasksQuery(null)

    

    if (!isLoading){
        if (!collapsed) {
        return (
        
        <div className={cls.wrapper}>
            <div className={cls.block}>
                <div className={cls.item}>
                    <span className={cls.title}>Мои задачи</span>
                    <span className={cls.value}>{data.my_tasks}</span>
                </div>

                <div className={cls.item}>
                    <span className={cls.title}>Мои задачи</span>
                    <span className={cls.value}>{data.given_tasks}</span>
                </div>

                <div className={cls.item}>
                    <span className={cls.title}>Активные</span>
                    <span className={cls.value}>{data.active}</span>
                </div>

                <div className={cls.item}>
                    <span className={cls.title}>Истекшие</span>
                    <span className={cls.value}>{data.expired}</span>
                </div>

                <div className={cls.item}>
                    <span className={cls.title}>Закрытые</span>
                    <span className={cls.value}>{data.closed}</span>
                </div>
            </div>
        </div>
        )} else {
            return (
                <span/>
            )
        }
    } else {

        return (
            <div className="">Загрузка</div>
        )
    }
    
};

