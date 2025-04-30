import React from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { LOG_IN_URL, SIGN_UP_URL } from '../../../shared/Consts/URLS';
import './Auth.scss';

const Auth: React.FC = () => {
    const location = useLocation();

    return (
        <div className="auth-page">
            <div className="auth-window">
                <div className="auth-header">
                    <Link to={LOG_IN_URL} aria-label="">
                        <div
                            className={
                                'auth-log-in' +
                                (location.pathname === LOG_IN_URL ? ' auth-log-in_selected' : '')
                            }
                        >
                            Вход
                        </div>
                    </Link>
                    <Link to={SIGN_UP_URL} aria-label="">
                        <div
                            className={
                                'auth-sign-up' +
                                (location.pathname === SIGN_UP_URL ? ' auth-sign-up_selected' : '')
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
