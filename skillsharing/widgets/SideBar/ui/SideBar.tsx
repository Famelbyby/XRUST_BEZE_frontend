import React from 'react';
import { Link, useLocation } from 'react-router';
import './SideBar.scss';
import { ComparePathnames } from '../../../shared/Functions/ComparePathnames';
import { useSelector } from 'react-redux';
import { AppState } from '../../../app/AppStore';

interface sideBarItem {
    id: number;
    icon: string;
    title: string;
    linkTo: string;
}

const SideBar: React.FC = () => {
    const location = useLocation();

    const { user } = useSelector((state: AppState) => state.user);

    const sideBarItems: sideBarItem[] = [
        {
            id: 0,
            icon: '/Header/main.png',
            title: 'Главная',
            linkTo: '/main-page',
        },
        {
            id: 1,
            icon: '/SideBar/user.png',
            title: 'Профиль',
            linkTo: `/profile/${user?.id}`,
        },
        {
            id: 2,
            icon: '/SideBar/message.png',
            title: 'Чаты',
            linkTo: '/chats',
        },
        {
            id: 3,
            icon: '/SideBar/materials.png',
            title: 'Материалы',
            linkTo: '/materials',
        },
    ];

    return (
        <div className="sidebar">
            {sideBarItems.map((item) => {
                return (
                    <Link to={item.linkTo} key={item.id} aria-label={item.title}>
                        <div
                            className={
                                ComparePathnames(location.pathname, item.linkTo)
                                    ? ' sidebar-item_selected'
                                    : 'sidebar-item'
                            }
                        >
                            <img className="sidebar-item__img" src={item.icon} alt="" />
                            <div className="sidebar-item__title">{item.title}</div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default SideBar;
