import React from "react";
import { Link, useLocation } from "react-router";
import './MobileSideBar.scss'
import { useSelector } from "react-redux";
import { AppState } from "../../app/AppStore";
import { ComparePathnames } from "../../shared/Functions/ComparePathnames";

interface mobileSideBarItem {
    id: number,
    icon: string,
    linkTo: string,
    title: string,
}

const MobileSideBar: React.FC = () => {
    const location = useLocation();

    const {user} = useSelector((state: AppState) => state.user);

    const sideBarItems: mobileSideBarItem[] = [
        {
            id: 0,
            icon: '/Header/main.png',
            linkTo: '/main-page',
            title: 'Главная',
        },
        {
            id: 1,
            icon:'/SideBar/user.png',
            linkTo: `/profile/${user?.id}`,
            title: 'Профиль',
        },
        {
            id: 2,
            icon:'/SideBar/message.png',
            linkTo: '/chats',
            title: 'Чаты',
        },
        {
            id: 3,
            icon: '/SideBar/materials.png',
            linkTo: '/materials',
            title: 'Материалы',
        }
    ];

    return (
        <div className="mobile-sidebar">
            {sideBarItems.map((item) => {
                return (
                    <Link to={item.linkTo} key={item.id} aria-label={item.title}>
                        <div className={"mobile-sidebar-item" + (ComparePathnames(location.pathname, item.linkTo) ? " mobile-sidebar-item_selected" : "")}>
                            <img className="mobile-sidebar-item__img" src={item.icon} alt=""/>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
};

export default MobileSideBar;