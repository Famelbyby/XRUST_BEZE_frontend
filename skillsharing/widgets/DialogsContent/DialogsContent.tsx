import React, { useEffect } from 'react';
import Dialog from '../../entity/Dialog/ui/Dialog';
import { DialogItem } from '../../entity/Dialog/ui/DialogTypes';
import { useDispatch, useSelector } from 'react-redux';
import { clearAll, replaceNewMessage, replaceUpdatedMessage } from '../../app/slices/DialogsSlice';
import { GetDialogs, GetLastMessage } from '../../pages/Dialogs/api/Dialogs';
import { AppDispatch, AppState } from '../../app/AppStore';
import './DialogsContent.scss'
import MainWebSocket from '../../shared/WebSocket'
import { IMessage } from '../../entity/Message/MessageTypes';

const DialogsContent: React.FC = () => {
    const {dialogs, filteredDialogs} = useSelector((state: AppState) => state.dialogs);
    const {user} = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    /**
     * Adds messages movement in chat
     */
    useEffect(() => {
        MainWebSocket.addObserver('dialog-messages', (data: string) => {
            const message: IMessage = JSON.parse(data);
            
            switch (message.type) {
                case 'send_message':
                    if (dialogs !== undefined) {
                        const foundDialog = dialogs.find((dialog) => dialog.channel_id === message.channel_id);

                        if (foundDialog) {
                            dispatch(replaceNewMessage(message));
                        } else {
                            if (user !== undefined) {
                                dispatch(GetDialogs(user.id));
                            }
                        }
                    }
                    
                    break;
                case 'update_message':
                    dispatch(replaceUpdatedMessage(message));
                    break;
                case 'delete_message':
                    dispatch(GetLastMessage(message.channel_id!));
                    break;
            }
        });

        return () => {
            MainWebSocket.removeObserver('dialog-messages');
        };
    }, [dispatch, dialogs, user]);

    useEffect(() => {
        if (user !== undefined) {
            dispatch(GetDialogs(user.id));
        }

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