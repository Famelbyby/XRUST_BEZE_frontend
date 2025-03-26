import React, { useEffect, useRef, useState } from "react";
import SettingsLeftColumn from "../../../widgets/SettingsLeftColumn/SettingsLeftColumn";
import { ProfileType } from "../../Profile/ui/ProfileTypes";
import SettingsRightColumn from "../../../widgets/SettingsRightColumn/SettingsRightColumn";
import SettingsFooter from '../../../widgets/SettingsFooter/SettingsFooter';
import './Settings.scss'
import { GetProfile } from "../../Profile/api/Profile";
import User from "../../../entity/User/User";

const Settings: React.FC = () => {
    const [profile, setProfile] = useState<ProfileType>();
    const componentIsMounted = useRef(true);

    useEffect(() => {
        const ownUserID: string = User.getUserID();

        function gotProfile(profile: ProfileType) {
            if (componentIsMounted) {
                setProfile(profile);
            }
        }

        GetProfile(ownUserID, gotProfile);

        return () => {
            componentIsMounted.current = false;
        }
    }, []);

    return (
        <div className="settings-page">
            <div className="settings-main">
                <SettingsLeftColumn profile={profile} setProfile={setProfile}/>
                <SettingsRightColumn profile={profile} setProfile={setProfile}/>
            </div>
            <SettingsFooter />
        </div>

    );
}

export default Settings;