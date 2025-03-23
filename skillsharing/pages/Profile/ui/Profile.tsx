import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ProfileLeftColumn from './ProfileLeftColumn/ProfileLeftColumn'
import ProfileRightColumn from './ProfileRightColumn/ProfileRightColumn'
import './Profile.scss'
import { ProfileType } from "./ProfileTypes";
import { GetProfile } from "../api/Profile";

const ownUserID = 2;

const Profile: React.FC = () => {
    const params = useParams();
    const navigateTo = useNavigate();
    const [user, setUser] = useState<ProfileType | undefined>();
    const componentIsMounted = useRef(true);

    useEffect(() => {
        const userID: string | undefined = params.userID;

        if (userID === undefined) {
            navigateTo(`/profile/${ownUserID}`);
        }

        function profileGot(profileData: ProfileType) {
            if (componentIsMounted.current) {
                setUser(profileData);
            }
        }

        GetProfile(+userID!, profileGot);

        return () => {
            componentIsMounted.current = false;
        }
    }, [params.userID, navigateTo])

    return (
        <div className="profile-page">
            <ProfileLeftColumn profile={user}/>
            <ProfileRightColumn profile={user} />
        </div>
    );
};

export default Profile;