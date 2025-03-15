import React from "react";
import { Link } from "react-router";
import './SideBar.scss'

interface sideBarItem {
    id: number,
    icon: string,
    title: string,
    linkTo: string,
}

const sideBarItems: sideBarItem[] = [
    {
        id: 1,
        icon:'/SideBar/user.png',
        title: 'Профиль',
        linkTo: '/profile',
    },
    {
        id: 2,
        icon:'/SideBar/message.png',
        title: 'Чаты',
        linkTo: '/chats',
    },
    {
        id: 3,
        icon:'/SideBar/medal.png',
        title: 'Рейтинг',
        linkTo: '/rating',
    },
];

const SideBar: React.FC = () => {
    return (
        <div className="sidebar">
            {sideBarItems.map((item) => {
                return (
                    <Link to={item.linkTo} key={item.id}>
                        <div className="sidebar-item">
                            <img className="sidebar-item__img" src={item.icon} alt=""/>
                            <div className="sidebar-item__title">
                                {item.title}
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
};

export default SideBar;