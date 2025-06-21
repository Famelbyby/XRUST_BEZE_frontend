import './App.scss';
import { Navigate, Route, useNavigate } from 'react-router';
import Header from '../widgets/Header/ui/Header';
import SideBar from '../widgets/SideBar/ui/SideBar';
import MobileSideBar from '../widgets/MobileSideBar/MobileSideBar';
import Chat from '../pages/Chat/ui/Chat';
import Dialogs from '../pages/Dialogs/ui/Dialogs';
import Profile from '../pages/Profile/ui/Profile';
import Main from '../pages/Main/ui/Main';
import Auth from '../pages/Auth/ui/Auth';
import SignUp from '../widgets/SignUp/SignUp';
import LogIn from '../widgets/LogIn/LogIn';
import { Routes } from 'react-router';
import { useEffect } from 'react';
import { GetUserByCookie } from '../entity/User/api/User';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from './AppStore';
import { clearFirstPage, clearUser } from './slices/UserSlice';
import Settings from '../pages/Settings/ui/Settings';
import StructurizedMessage from '../pages/StructurizedMessage/ui/StructurizedMessage';
import MainWebSocket from '../shared/WebSocket';
import UserMaterials from '../pages/UserMaterials/ui/UserMaterials';
import CertainMaterial from '../pages/CertainMaterial/ui/CertainMaterial';
import Materials from '../pages/Materials/ui/Materials';
import CopiedWindow from '../features/CopiedWindow/CopiedWindow';
import ErrorWindow from '../features/ErrorWindow/ErrorWindow';
import Landing from '../pages/Landing/ui/Landing';
import { enableMapSet } from 'immer';
import { LOG_IN_URL } from '../shared/Consts/URLS';
import '../shared/Styles/Themes.scss';

enableMapSet();

function App() {
    const { user, isFetched, justResigtered, justLogedIn, firstPage, theme } = useSelector(
        (state: AppState) => state.user,
    );
    const dispatch = useDispatch<AppDispatch>();
    const navigateTo = useNavigate();

    useEffect(() => {
        dispatch(GetUserByCookie());

        return () => {
            dispatch(clearUser());
        };
    }, [dispatch]);

    useEffect(() => {
        if (user !== undefined) {
            if (justResigtered) {
                navigateTo(`/profile/${user.id}`, { replace: true });
            }

            if (justLogedIn) {
                if (firstPage !== '') {
                    navigateTo(firstPage, { replace: true });
                    dispatch(clearFirstPage());
                } else {
                    navigateTo(`/main-page`, { replace: true });
                }
            }
        }
    }, [justResigtered, justLogedIn, user]);

    useEffect(() => {
        if (user !== undefined) {
            MainWebSocket.openConnection(user.id);
        } else {
            MainWebSocket.closeConnection();
        }
    }, [user]);

    return (
        <>
            <Header />
            <CopiedWindow />
            <ErrorWindow />
            <div className={'main-part' + (theme === 'light' ? '' : ` ${theme}-mode__block`)}>
                {user === undefined && !isFetched && (
                    <div className="main-part__waiting">
                        <div className="main-part__spinner"></div>
                    </div>
                )}
                {user === undefined && isFetched && (
                    <Routes>
                        <Route path="" element={<Landing />} />
                        <Route path="auth" element={<Auth />}>
                            <Route index element={<Navigate to="log-in" replace />} />
                            <Route path="sign-up" element={<SignUp />} />
                            <Route path="log-in" element={<LogIn />} />
                        </Route>
                        <Route path="*" element={<Navigate to={LOG_IN_URL} replace />} />
                    </Routes>
                )}
                {user !== undefined && (
                    <>
                        {location.pathname !== '/' && <SideBar />}
                        <Routes>
                            <Route path="" element={<Landing />} />
                            <Route path="/main-page" element={<Main />} />
                            <Route path="/profile">
                                <Route path=":userID" element={<Profile />} />
                            </Route>
                            <Route path="/profile-materials/:userID" element={<UserMaterials />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/chat">
                                <Route path=":chatID" element={<Chat />} />
                            </Route>
                            <Route path="/chats" element={<Dialogs />} />
                            <Route path="/structurized-messages">
                                <Route path=":messageId" element={<StructurizedMessage />} />
                            </Route>
                            <Route path="/materials" element={<Materials />} />
                            <Route path="/materials/:materialID" element={<CertainMaterial />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                        <MobileSideBar />
                    </>
                )}
            </div>
        </>
    );
}

export default App;
