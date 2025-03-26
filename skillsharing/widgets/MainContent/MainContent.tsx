import React, { useEffect, useRef, useState } from "react";
import MainRightSidebar from "../MainRightSidebar/MainRightSidebar";
import { ProfileType } from "../../pages/Profile/ui/ProfileTypes";
import User from "../../entity/User/User";
import {GetMatchedUsers} from '../../pages/Main/api/Main'
import FoundUser from '../../features/FoundUser/FoundUser'

interface MainContentPropTypes {
    user: ProfileType | undefined,
}

const MainContent: React.FC<MainContentPropTypes> = ({user}) => {
    const [foundUsers, setFoundUsers] = useState<ProfileType[]>([]);
    const componentIsMounted = useRef(true);
    const isRefreshed = useRef(false);

    useEffect(() => {
        function gotUsers(profilesData: ProfileType[]) {
            if (componentIsMounted.current) {
                setFoundUsers(profilesData);
                isRefreshed.current = true;
            }
        }

        GetMatchedUsers(User.getUserID(), gotUsers);

        return () => {
            componentIsMounted.current = false;
            isRefreshed.current = false;
        }
    }, [])

    return (
        <div className="main-content">
            <div className="main-results">
                {!isRefreshed.current && 
                    <div className="main-results__waiting">
                        Обрабатываем Ваш запрос, секундочку
                    </div>
                }
                {isRefreshed.current && foundUsers.length === 0 && 
                    <div className="main-results__no-results">
                        К сожалению, подходящих навыков найдено не было
                    </div>
                }
                {isRefreshed.current && foundUsers.length > 0 && 
                    foundUsers.map((foundUser: ProfileType, index: number) => {
                        return <FoundUser key={index} user={foundUser}/>;
                    })
                }
            </div>
            <MainRightSidebar user={user}/>
        </div>
    )
};

export default MainContent;