import cls from "./ProfilePage.module.scss"
import {ProfileBonus, ProfileCard, ProfileTasks} from "@entities/user/ui";

export const ProfilePage = () => {
    return (
        <div className={cls.wrapper}>
            <ProfileCard/>
            <ProfileTasks/>
            <ProfileBonus/>
        </div>
    );
};

