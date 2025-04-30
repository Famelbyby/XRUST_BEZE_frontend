import React, { useEffect, useRef, useState } from 'react';
import '../../pages/Main/ui/Main.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../app/AppStore';
import './MainHeader.scss';
import { GetFoundByNameUsers, GetMatchedUsers } from '../../pages/Main/api/Main';

const MainHeader: React.FC = () => {
    const { user } = useSelector((state: AppState) => state.user);
    const [query, setQuery] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const prevQuery = useRef('');

    useEffect(() => {
        function handleQueryChanging() {
            const searchingInput = document.querySelector('#searching-input') as HTMLInputElement;

            if (searchingInput === null) {
                return;
            }

            const nextQuery = searchingInput.value;

            if (nextQuery === prevQuery.current) {
                return;
            }

            setQuery(nextQuery);
            prevQuery.current = query;

            if (user !== undefined) {
                if (nextQuery === '') {
                    dispatch(GetMatchedUsers({ userId: user.id, callback: () => {} }));
                } else {
                    dispatch(
                        GetFoundByNameUsers({
                            userId: user.id,
                            query: nextQuery,
                            callback: () => {},
                        }),
                    );
                }
            }
        }

        const intervalIndex = setInterval(handleQueryChanging, 500);

        return () => {
            clearInterval(intervalIndex);
        };
    }, [dispatch, user, query]);

    return (
        <div className="main-header">
            <div className="main-header-left">
                <div className="main-header-hello">
                    Добро пожаловать,
                    {user !== undefined && <>{' ' + user.username}</>}
                    {user === undefined && (
                        <div className="main-header-hello-mock">
                            <div className="main-header-hello-spinner"></div>
                        </div>
                    )}
                    !
                </div>
                <div className="main-header-questions">
                    Появились вопросы? Мы подобрали Вам экспертов по вашим навыкам
                </div>
            </div>
            <div className="main-header-right">
                <input
                    id="searching-input"
                    type="text"
                    value={query}
                    placeholder="Поиск по имени"
                    className="main-header__searching-input"
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>
        </div>
    );
};

export default MainHeader;
