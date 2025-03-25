import React, { useEffect, useRef, useState } from "react";
import SettingsLeftColumn from "../../../widgets/SettingsLeftColumn/SettingsLeftColumn";
import { ProfileType } from "../../Profile/ui/ProfileTypes";
import SettingsRightColumn from "../../../widgets/SettingsRightColumn/SettingsRightColumn";
import SettingsFooter from '../../../widgets/SettingsFooter/SettingsFooter';
import './Settings.scss'
import { GetProfile } from "../../Profile/api/Profile";

const Settings: React.FC = () => {
    const [profile, setProfile] = useState<ProfileType>();
    const componentIsMounted = useRef(true);

    useEffect(() => {
        function gotProfile(profile: ProfileType) {
            if (componentIsMounted) {
                setProfile(profile);
            }
        }

        GetProfile("67e018ff9d65eb861882040a", gotProfile);

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