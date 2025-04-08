import React, { useEffect } from "react";
import { useParams } from "react-router";
import ProfileRightColumn from "../../../widgets/ProfileRightColumn/ProfileRightColumn";
import ProfileLeftColumn from '../../../widgets/ProfileLeftColumn/ProfileLeftColumn'
import './Profile.scss'
import { GetProfile } from "../api/Profile";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../app/AppStore";
import { clearProfile } from "../../../app/slices/ProfileSlice";
import NotFound from '../../../features/404/404'

const Profile: React.FC = () => {
    const {user, isFetched} = useSelector((state: AppState) => state.profile);
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const userID: string | undefined = params.userID;

        dispatch(GetProfile(userID!));

        return () => {
            dispatch(clearProfile());
        }
    }, [params.userID, dispatch])

    return (
        <div className="profile-page">
            {user === undefined && isFetched && 
                <NotFound />
            }
            {(user !== undefined || !isFetched) && 
                <>
                    <ProfileLeftColumn />
                    <ProfileRightColumn />
                </>
            }
        </div>
    );
};

export default Profile;