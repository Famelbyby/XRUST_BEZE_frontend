import React from 'react';
import './Dialogs.scss';
import SkillsTags from '../../../features/SkillsTags/SkillsTags';
import DialogsContent from '../../../widgets/DialogsContent/DialogsContent';
import { filterDialogs } from '../../../app/slices/DialogsSlice';
import { ProfileType } from '../../Profile/ui/ProfileTypes';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { AppState } from '../../../app/AppStore';

const Dialogs: React.FC = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector((state: AppState) => state.user);

    return (
        <div
            className={
                'dialogs-page' +
                (theme === 'light' ? '' : ` ${theme}-mode__block`) +
                (theme === 'light' ? '' : ` ${theme}-mode__bright-text`)
            }
        >
            <Helmet>
                <title>Диалоги</title>
            </Helmet>
            <DialogsContent />
            <SkillsTags
                handleFilteringSomething={(selectedTags: string[], user: ProfileType) =>
                    dispatch(filterDialogs({ selectedTags, user }))
                }
            />
        </div>
    );
};

export default Dialogs;
