import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ProfileRightColumn from "../../../widgets/ProfileRightColumn/ProfileRightColumn";
import ProfileLeftColumn from '../../../widgets/ProfileLeftColumn/ProfileLeftColumn'
import './Profile.scss'
import { ProfileType } from "./ProfileTypes";
import { GetProfile } from "../api/Profile";
import { useSelector } from "react-redux";
import { AppState } from "../../../app/AppStore";

const Profile: React.FC = () => {
    const params = useParams();
    const navigateTo = useNavigate();
    const [profile, setProfile] = useState<ProfileType | undefined>();
    const componentIsMounted = useRef(true);
    const {user} = useSelector((state: AppState) => state.profile);

    useEffect(() => {
        const userID: string | undefined = params.userID;

        if (userID === undefined) {
            navigateTo(`/profile/${user?.id}`);
        } else {
            function profileGot(profileData: ProfileType | undefined) {
                if (componentIsMounted.current) {
                    setProfile(profileData);
                }
            }

            GetProfile(userID, profileGot);
        }

        return () => {
            componentIsMounted.current = false;
        }
    }, [params.userID, navigateTo, user?.id])

    return (
        <div className="profile-page">
            <ProfileLeftColumn profile={profile}/>
            <ProfileRightColumn profile={profile} />
        </div>
    );
};

export default Profile;