import React from "react";
import { ProfileType } from "../../pages/Profile/ui/ProfileTypes";
import SkillsTags from "../../features/SkillsTags/SkillsTags";

interface MainRightSideBarPropTypes {
    user: ProfileType | undefined,
    handleFilteringDialogs: (tags: string[]) => void,
}

const MainRightSideBar: React.FC<MainRightSideBarPropTypes> = ({user, handleFilteringDialogs}) => {
    return (
        <div className="main-right-sidebar">
            {user !== undefined &&
                <SkillsTags handleFilteringSomething={handleFilteringDialogs}/>
            }
        </div>
    )
};

export default MainRightSideBar;