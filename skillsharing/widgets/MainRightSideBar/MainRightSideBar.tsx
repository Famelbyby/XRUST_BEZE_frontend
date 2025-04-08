import React from "react";
import SkillsTags from "../../features/SkillsTags/SkillsTags";
import { useDispatch, useSelector } from "react-redux";
import { filterUsers } from "../../app/slices/MainSlice";
import { AppState } from "../../app/AppStore";
import './MainRightSideBar.scss'

const MainRightSideBar: React.FC = () => {
    const {user} = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch();

    return (
        <div className="main-right-sidebar">
            {user !== undefined &&
                <SkillsTags handleFilteringSomething={(tags: string[]) => dispatch(filterUsers(tags))}/>
            }
        </div>
    )
};

export default MainRightSideBar;