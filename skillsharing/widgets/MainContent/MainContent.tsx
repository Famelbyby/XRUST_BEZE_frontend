import React, { useEffect } from "react";
import { ProfileType } from "../../pages/Profile/ui/ProfileTypes";
import {GetMatchedUsers} from '../../pages/Main/api/Main'
import FoundUser from '../../features/FoundUser/FoundUser'
import { useDispatch, useSelector } from "react-redux";
import { clearFoundUsers } from "../../app/slices/MainSlice";
import { AppDispatch, AppState } from "../../app/AppStore";
import MainRightSideBar from '../MainRightSideBar/MainRightSideBar'
import './MainContent.scss'

const MainContent: React.FC = () => {
    const { filteredUsers } = useSelector((state: AppState) => state.mainPageUsers);
    const { user } = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (user !== undefined) {
            dispatch(GetMatchedUsers({userId: user.id, callback: () => {}}));
        }

        return () => {
            dispatch(clearFoundUsers());
        }
    }, [user, dispatch]);

    return (
        <div className="main-content">
            <div className="main-results">
                {filteredUsers === undefined && 
                    <div className="main-results__waiting">
                        Обрабатываем Ваш запрос, секундочку
                    </div>
                }
                {filteredUsers !== undefined && filteredUsers.length === 0 && 
                    <div className="main-results__no-results">
                        К сожалению, подходящих экспертов найдено не было
                    </div>
                }
                {filteredUsers !== undefined && filteredUsers.length > 0 && 
                    filteredUsers.map((filteredUser: ProfileType, index: number) => {
                        return <FoundUser key={index} user={filteredUser}/>;
                    })
                }
            </div>
            <MainRightSideBar />
        </div>
    )
};

export default MainContent;