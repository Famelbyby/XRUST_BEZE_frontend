import React, { useEffect } from "react";
import SettingsLeftColumn from "../../../widgets/SettingsLeftColumn/SettingsLeftColumn";
import SettingsRightColumn from "../../../widgets/SettingsRightColumn/SettingsRightColumn";
import SettingsFooter from '../../../widgets/SettingsFooter/SettingsFooter';
import './Settings.scss'
import { useDispatch, useSelector } from "react-redux";
import { GetProfile } from "../../Profile/api/Profile";
import { AppDispatch, AppState } from "../../../app/AppStore";
import { clearSettings, clearUpdated } from "../../../app/slices/SettingsSlice";
import { useNavigate } from "react-router";
import { GetCategories } from "../../Auth/api/Auth";

const Settings: React.FC = () => {
    const {user, isFetched} = useSelector((state: AppState) => state.user);
    const {isUpdated} = useSelector((state: AppState) => state.settings);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('here');
        if (user !== undefined && !isFetched) {
            dispatch(GetProfile(user.id));
            console.log('i am here')
        }

        return () => {
            dispatch(clearSettings());
        }
    }, [dispatch, user, isFetched]);

    useEffect(() => {
        dispatch(GetCategories());

        if (isUpdated) {
            dispatch(clearUpdated());
            navigate('/profile/' + user!.id);
        }
    }, [isUpdated, dispatch, navigate, user]);

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