import React from "react";
import { ProfileType } from "../../pages/Profile/ui/ProfileTypes";
import SkillsTags from "../../features/SkillsTags/SkillsTags";
import { Skill } from "../ProfileLeftColumn/ProfileLeftColumnTypes";

interface MainRightSideBarPropTypes {
    user: ProfileType | undefined,
    handleFilteringDialogs: (tags: Skill[]) => void,
}

const MainRightSideBar: React.FC<MainRightSideBarPropTypes> = ({user, handleFilteringDialogs}) => {
    return (
        <div className="main-right-sidebar">
            {user !== undefined &&
                <SkillsTags handleCheckingTag={handleFilteringDialogs} tags={user!.skills_to_learn}/>
            }
        </div>
    )
};

export default MainRightSideBar;