import React from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { LOG_IN_URL, SIGN_UP_URL } from '../../../shared/Consts/URLS';
import './Auth.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../../app/AppStore';

const Auth: React.FC = () => {
    const { theme } = useSelector((state: AppState) => state.user);
    const location = useLocation();

    return (
        <div className="auth-page">
            <div className={'auth-window' + ` ${theme}-mode__middle-block`}>
                <div className={'auth-header'}>
                    <Link replace to={LOG_IN_URL} aria-label="">
                        <div
                            className={
                                'auth-log-in' +
                                (location.pathname === LOG_IN_URL
                                    ? ' auth-log-in_selected'
                                    : theme === 'light'
                                      ? ''
                                      : ` ${theme}-mode__bright-text`)
                            }
                        >
                            Вход
                        </div>
                    </Link>
                    <Link replace to={SIGN_UP_URL} aria-label="">
                        <div
                            className={
                                'auth-sign-up' +
                                (location.pathname === SIGN_UP_URL
                                    ? ' auth-sign-up_selected'
                                    : theme === 'light'
                                      ? ''
                                      : ` ${theme}-mode__bright-text`)
                            }
                        >
                            Регистрация
                        </div>
                    </Link>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default Auth;
