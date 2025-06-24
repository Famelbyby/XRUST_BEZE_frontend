import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { AppDispatch, AppState } from '../../../app/AppStore';
import { GetUserMaterials } from '../api/UserMaterials';
import UserMaterialsHeader from '../../../widgets/UserMaterialsHeader/UserMaterialsHeader';
import UserMaterialsContent from '../../../widgets/UserMaterialsContent/UserMaterialsContent';
import './UserMaterials.scss';
import { clearUserMaterials } from '../../../app/slices/UserMaterialsSlice';
import { Helmet } from 'react-helmet';

const UserMaterials: React.FC = () => {
    const params = useParams();

    const { theme } = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const userId = params.userID;

        if (userId !== undefined) {
            dispatch(GetUserMaterials(userId));
        }

        return () => {
            dispatch(clearUserMaterials());
        };
    }, []);

    return (
        <div className={'user-materials-page' + ` ${theme}-mode__bright-text`}>
            <Helmet>
                <title>Учебные материалы пользователя</title>
            </Helmet>
            <UserMaterialsHeader />
            <UserMaterialsContent />
        </div>
    );
};

export default UserMaterials;
