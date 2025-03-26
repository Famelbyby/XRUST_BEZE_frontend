import React, { useEffect, useRef, useState } from "react";
import MainHeader from '../../../widgets/MainHeader/MainHeader'
import { ProfileType } from "../../Profile/ui/ProfileTypes";
import { GetProfile } from "../../Profile/api/Profile";
import User from "../../../entity/User/User";

const Main: React.FC = () => {
    const [user, setUser] = useState<ProfileType>();
    const componentIsMounted = useRef(true);

    useEffect(() => {
        function gotUser(profileData: ProfileType) {
            if (componentIsMounted.current) {
                setUser(profileData);
            }
        }

        GetProfile(User.getUserID(), gotUser);

        return () => {
            componentIsMounted.current = false;
        }
    }, [])

    return (
        <div className="main-page">
            <MainHeader user={user}/>
        </div>
    )
};

export default Main;