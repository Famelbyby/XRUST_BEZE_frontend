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

    const { user, theme } = useSelector((state: AppState) => state.user);

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
        <div className={'sidebar' + ` ${theme}-mode__block ${theme}-mode__bright-right-border`}>
            {sideBarItems.map((item) => {
                return (
                    <Link to={item.linkTo} key={item.id} aria-label={item.title}>
                        <div
                            className={
                                ComparePathnames(location.pathname, item.linkTo)
                                    ? ' sidebar-item_selected' +
                                      (theme === 'light' ? '' : ` ${theme}-mode__bright-text`)
                                    : 'sidebar-item' +
                                      (theme === 'light' ? '' : ` ${theme}-mode__bright-text`)
                            }
                        >
                            <img
                                className={
                                    'sidebar-item__img' +
                                    (theme === 'light' ? '' : ` ${theme}-mode__img`)
                                }
                                src={item.icon}
                                alt=""
                            />
                            <div className={'sidebar-item__title'}>{item.title}</div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default SideBar;
