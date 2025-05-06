import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import './SettingsFooter.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../app/AppStore';
import { UpdateProfile } from '../../pages/Settings/api/Settings';
import { LoadAvatar } from '../../pages/Auth/api/Auth';
import Loader from '../../features/Loader/Loader';

const SettingsFooter: React.FC = () => {
    const navigatoTo = useNavigate();
    const {
        user,
        usernameError,
        avatar,
        isPending,
        hrefs,
        skillsToLearnError,
        skillsToShareError,
    } = useSelector((state: AppState) => state.settings);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (avatar.URL !== undefined) {
            dispatch(
                UpdateProfile({
                    user: user!,
                    avatar: avatar.URL,
                    hrefs: hrefs.map((href) => href.value),
                }),
            );
        }
    }, [dispatch, avatar.URL]);

    return (
        <div className="settings-footer">
            <div className="settings-footer-buttons">
                <div className="settings-footer__cancel" onClick={() => navigatoTo(-1)}>
                    Отменить
                </div>
                <div
                    className="settings-footer__save"
                    onClick={() => {
                        if (
                            usernameError ||
                            avatar.error !== undefined ||
                            hrefs.find((href) => href.error !== undefined) ||
                            skillsToLearnError !== undefined ||
                            skillsToShareError !== undefined
                        ) {
                            return;
                        }

                        if (avatar.file !== undefined && avatar.URL === undefined) {
                            dispatch(LoadAvatar({ avatar: avatar.file }));
                        } else {
                            dispatch(
                                UpdateProfile({
                                    user: user!,
                                    avatar: avatar.URL,
                                    hrefs: hrefs.map((href) => href.value),
                                }),
                            );
                        }
                    }}
                >
                    {isPending && <Loader />}
                    {!isPending && <>Сохранить</>}
                </div>
            </div>
        </div>
    );
};

export default SettingsFooter;
