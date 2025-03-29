import React, { useEffect } from 'react';
import Dialog from '../../entity/Dialog/ui/Dialog';
import { DialogItem } from '../../entity/Dialog/ui/DialogTypes';
import { useDispatch, useSelector } from 'react-redux';
import { clearAll } from '../../app/slices/DialogsSlice';
import { GetDialogs } from '../../pages/Dialogs/api/Dialogs';
import { AppDispatch, AppState } from '../../app/AppStore';

const DialogsContent: React.FC = () => {
    const {filteredDialogs} = useSelector((state: AppState) => state.dialogs);
    const {user} = useSelector((state: AppState) => state.profile);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(GetDialogs(user!.id));

        return () => {
            dispatch(clearAll());
        }
    }, [dispatch, user]);

    return (
        <div className="dialogs">
            {filteredDialogs === undefined && 
                [0, 1, 2, 3, 4].map((index) => {
                    return <Dialog dialog={undefined} key={index} />
                })}
            {filteredDialogs !== undefined && filteredDialogs.length > 0 && 
                filteredDialogs.map((dialog: DialogItem) => {
                    return <Dialog dialog={dialog} key={dialog.channel_id} />
                })}
            {filteredDialogs !== undefined && filteredDialogs.length === 0 && 
                <div className="dialogs__no-chats">
                    Чатов нет
                </div>
            }
        </div>
    );
};

export default DialogsContent;