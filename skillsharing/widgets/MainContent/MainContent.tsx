import React, { useEffect, useRef, useState } from "react";
import MainRightSidebar from "../MainRightSidebar/MainRightSidebar";
import { ProfileType } from "../../pages/Profile/ui/ProfileTypes";
import User from "../../entity/User/User";
import {GetMatchedUsers} from '../../pages/Main/api/Main'
import FoundUser from '../../features/FoundUser/FoundUser'
import { Skill } from "../ProfileLeftColumn/ProfileLeftColumnTypes";

interface MainContentPropTypes {
    user: ProfileType | undefined,
}

const MainContent: React.FC<MainContentPropTypes> = ({user}) => {
    const [foundUsers, setFoundUsers] = useState<ProfileType[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<ProfileType[]>([]);
    const componentIsMounted = useRef(true);
    const isRefreshed = useRef(false);

    useEffect(() => {
        function gotUsers(profilesData: ProfileType[]) {
            if (componentIsMounted.current) {
                setFoundUsers(profilesData);
                setFilteredUsers(profilesData);
                isRefreshed.current = true;
            }
        }

        GetMatchedUsers(User.getUserID(), gotUsers);

        return () => {
            componentIsMounted.current = false;
            isRefreshed.current = false;
        }
    }, [])

    function handleFilteringDialogs(tags: Skill[]) {
        if (tags.length === 0) {
            setFilteredUsers(foundUsers);
            return;
        }

        const sortedUsers: ProfileType[] = [];

        foundUsers.forEach((foundUser: ProfileType) => {
            let isFiltered: boolean = true;

            tags.forEach((tag: Skill) => {
                if (foundUser.skills_to_share.find((skill: Skill) => skill.name === tag.name) === undefined) {
                    isFiltered = false;
                }
            });

            if (isFiltered) {
                sortedUsers.push(foundUser);
            }
        });

        setFilteredUsers(sortedUsers);
    }

    return (
        <div className="main-content">
            <div className="main-results">
                {!isRefreshed.current && 
                    <div className="main-results__waiting">
                        Обрабатываем Ваш запрос, секундочку
                    </div>
                }
                {isRefreshed.current && filteredUsers.length === 0 && 
                    <div className="main-results__no-results">
                        К сожалению, подходящих экспертов найдено не было
                    </div>
                }
                {isRefreshed.current && filteredUsers.length > 0 && 
                    filteredUsers.map((filteredUser: ProfileType, index: number) => {
                        return <FoundUser key={index} user={filteredUser}/>;
                    })
                }
            </div>
            <MainRightSidebar handleFilteringDialogs={handleFilteringDialogs} user={user}/>
        </div>
    )
};

export default MainContent;