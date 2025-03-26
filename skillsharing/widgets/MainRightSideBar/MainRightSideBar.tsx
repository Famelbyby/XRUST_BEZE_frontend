import React from "react";
import { ProfileType } from "../../pages/Profile/ui/ProfileTypes";

interface MainRightSideBarPropTypes {
    user: ProfileType | undefined,
}

const MainRightSideBar: React.FC<MainRightSideBarPropTypes> = ({user}) => {
    return (
        <div className="main-right-sidebar">
            <div className="main-right-sidebar-title">
                Навыки
                <div className="main-right-sidebar__count">
                    {user !== undefined && 
                        <>
                            {user.skills_to_learn.length}
                        </>
                    }
                    {user === undefined && 
                        0
                    }
                </div>
            </div>
        </div>
    )
};

export default MainRightSideBar;