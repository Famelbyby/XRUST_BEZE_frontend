import React from 'react';
import './Dialogs.scss'
import SkillsTags from "../../../features/SkillsTags/SkillsTags";
import DialogsContent from '../../../widgets/DialogsContent/DialogsContent'
import { filterDialogs } from '../../../app/slices/DialogsSlice';
import { ProfileType } from '../../Profile/ui/ProfileTypes';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';

const Dialogs: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <div className="dialogs-page">
            <Helmet>
                <title>Диалоги</title>
            </Helmet>
            <DialogsContent />
            <SkillsTags handleFilteringSomething={(selectedTags: string[], user: ProfileType) => dispatch(filterDialogs({selectedTags, user}))} />
        </div>
    )
};

export default Dialogs;