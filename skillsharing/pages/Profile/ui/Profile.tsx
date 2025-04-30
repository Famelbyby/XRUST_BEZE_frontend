import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import ProfileRightColumn from '../../../widgets/ProfileRightColumn/ProfileRightColumn';
import ProfileLeftColumn from '../../../widgets/ProfileLeftColumn/ProfileLeftColumn';
import './Profile.scss';
import { GetProfile } from '../api/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../app/AppStore';
import { clearProfile } from '../../../app/slices/ProfileSlice';
import NotFound from '../../../features/404/404';
import { Helmet } from 'react-helmet';

const Profile: React.FC = () => {
    const { user, isFetched } = useSelector((state: AppState) => state.profile);
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const userID: string | undefined = params.userID;

        dispatch(GetProfile(userID!));

        return () => {
            dispatch(clearProfile());
        };
    }, [params.userID, dispatch]);

    useEffect(() => {
        if (user === undefined && isFetched) {
            const noIndex = document.createElement('meta');

            noIndex.name = 'robots';
            noIndex.content = 'noindex';

            document.head.appendChild(noIndex);
        }

        return () => {
            document.querySelector('meta[content="noindex"]')?.remove();
        };
    }, [user, isFetched]);

    return (
        <div className="profile-page">
            <Helmet>
                <title>Профиль</title>
            </Helmet>
            {user === undefined && isFetched && <NotFound />}
            {(user !== undefined || !isFetched) && (
                <>
                    <ProfileLeftColumn />
                    <ProfileRightColumn />
                </>
            )}
        </div>
    );
};

export default Profile;
