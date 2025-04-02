import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ProfileRightColumn from "../../../widgets/ProfileRightColumn/ProfileRightColumn";
import ProfileLeftColumn from '../../../widgets/ProfileLeftColumn/ProfileLeftColumn'
import './Profile.scss'
import { ProfileType } from "./ProfileTypes";
import { GetProfile } from "../api/Profile";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../app/AppStore";

const Profile: React.FC = () => {
    const params = useParams();
    const navigateTo = useNavigate();
    const [profile, setProfile] = useState<ProfileType | undefined>();
    const componentIsMounted = useRef(true);
    const {user} = useSelector((state: AppState) => state.profile);
    const dispatch = useDispatch<AppDispatch>();

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

            dispatch(GetProfile({userId: userID, callback: profileGot}));
        }

        return () => {
            componentIsMounted.current = false;
        }
    }, [params.userID, navigateTo, user?.id, dispatch])

    return (
        <div className="profile-page">
            <ProfileLeftColumn profile={profile}/>
            <ProfileRightColumn profile={profile} />
        </div>
    );
};

export default Profile;