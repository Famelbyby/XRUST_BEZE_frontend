import React, { useEffect } from 'react';
import { ProfileType } from '../../pages/Profile/ui/ProfileTypes';
import {
    GetFoundByNameUsers,
    GetFoundBySkillsUsers,
    GetMatchedUsers,
} from '../../pages/Main/api/Main';
import FoundUser from '../../features/FoundUser/FoundUser';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../app/AppStore';
import './MainContent.scss';
import FilterByNameAndSkills from '../../features/FilterByNameAndSkills/FilterByNameAndSkills';
import { GetCategories } from '../../pages/Auth/api/Auth';
import { clearFoundUsers } from '../../app/slices/MainSlice';

const MainlLeftSide: React.FC = () => {
    const { foundUsers } = useSelector((state: AppState) => state.mainPageUsers);

    return (
        <div className="main-content-left-side">
            <div className="main-results">
                {foundUsers === undefined && (
                    <div className="main-results__waiting">Обрабатываем Ваш запрос, секундочку</div>
                )}
                {foundUsers !== undefined && foundUsers.length === 0 && (
                    <div className="main-results__no-results">
                        К сожалению, подходящих экспертов найдено не было
                    </div>
                )}
                {foundUsers !== undefined &&
                    foundUsers.length > 0 &&
                    foundUsers.map((filteredUser: ProfileType, index: number) => {
                        return <FoundUser key={index} user={filteredUser} />;
                    })}
            </div>
        </div>
    );
};

const MainRightSide: React.FC = () => {
    const { user } = useSelector((state: AppState) => state.user);
    const { globalSkills } = useSelector((state: AppState) => state.mainPageUsers);
    const dispatch = useDispatch<AppDispatch>();

    function changedNameInput(nameInput: string) {
        if (user === undefined) {
            return;
        }

        if (nameInput === '') {
            if (user !== undefined) {
                dispatch(GetMatchedUsers({ userId: user.id }));
            }
        } else {
            dispatch(GetFoundByNameUsers({ query: nameInput, userId: user.id }));
        }
    }

    function changedSkillInput(skillsInput: string[]) {
        if (skillsInput.length === 0) {
            if (user !== undefined) {
                dispatch(GetMatchedUsers({ userId: user.id }));
            }
        } else {
            dispatch(GetFoundBySkillsUsers(skillsInput));
        }
    }

    useEffect(() => {
        dispatch(GetCategories());
    }, []);

    return (
        <div className="materials-content-right-side">
            <FilterByNameAndSkills
                changedSkill={(skill) => changedSkillInput(skill)}
                changedName={(nameInput) => changedNameInput(nameInput)}
                globalSkills={globalSkills}
                placeholder="Имя пользователя"
            />
        </div>
    );
};

const MainContent: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearFoundUsers());
    }, []);

    return (
        <div className="main-content">
            <MainlLeftSide />
            <MainRightSide />
        </div>
    );
};

export default MainContent;
