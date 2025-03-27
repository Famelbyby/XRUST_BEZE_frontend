import React from 'react';
import './Dialogs.scss'
import SkillsTags from "../../../features/SkillsTags/SkillsTags";
import DialogsContent from '../../../widgets/DialogsContent/DialogsContent'
import { Provider } from "react-redux";
import { dialogsStore } from "../../../app/stores/DialogsStore";
import { filterDialogs } from './slice/DialogsSlice';

const Dialogs: React.FC = () => {
    return (
        <div className="dialogs-page">
            <Provider store={dialogsStore}>
                <DialogsContent />
                <SkillsTags handleFilteringSomething={(tags: string[]) => dialogsStore.dispatch(filterDialogs(tags))} />
            </Provider>
        </div>
    )
};

export default Dialogs;