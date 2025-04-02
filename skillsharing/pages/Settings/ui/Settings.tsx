import React, { useEffect } from "react";
import SettingsLeftColumn from "../../../widgets/SettingsLeftColumn/SettingsLeftColumn";
import SettingsRightColumn from "../../../widgets/SettingsRightColumn/SettingsRightColumn";
import SettingsFooter from '../../../widgets/SettingsFooter/SettingsFooter';
import './Settings.scss'
import { useDispatch, useSelector } from "react-redux";
import { GetProfile } from "../../Profile/api/Profile";
import { AppDispatch, AppState } from "../../../app/AppStore";

const Settings: React.FC = () => {
    const {user} = useSelector((state: AppState) => state.profile);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (user !== undefined) {
            dispatch(GetProfile({userId: user.id, callback: () => {}}));
        }
        
    }, [dispatch, user]);

    return (
        <div className="settings-page">
            <div className="settings-main">
                <SettingsLeftColumn />
                <SettingsRightColumn />
            </div>
            <SettingsFooter />
        </div>

    );
}

export default Settings;