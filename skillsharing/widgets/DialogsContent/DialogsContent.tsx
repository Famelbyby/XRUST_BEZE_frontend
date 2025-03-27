import React, { useEffect, useRef } from 'react';
import Dialog from '../../entity/Dialog/ui/Dialog';
import { DialogItem } from '../../entity/Dialog/ui/DialogTypes';
import { useDispatch, useSelector } from 'react-redux';
import { DialogsState } from '../../app/stores/DialogsStore';
import { clearAll, setDialogs } from '../../pages/Dialogs/ui/slice/DialogsSlice';
import { GetDialogs } from '../../pages/Dialogs/api/Dialogs';

const DialogsContent: React.FC = () => {
    const {userID, filteredDialogs} = useSelector((state: DialogsState) => state.dialogs);
    const dispatch = useDispatch();
    const isRefreshed = useRef(false);
    const componentIsMounted = useRef(true);

    useEffect(() => {
        function gotDialogs(dialogsData: DialogItem[]) {
            if (componentIsMounted.current) {
                dispatch(setDialogs(dialogsData));

                isRefreshed.current = true;
            }
        }

        GetDialogs(userID, gotDialogs);

        return () => {
            componentIsMounted.current = false;
            isRefreshed.current = false;

            dispatch(clearAll());
        }
    }, [dispatch, userID]);

    return (
        <div className="dialogs">
            {!isRefreshed.current && 
                [0, 1, 2, 3, 4].map((index) => {
                    return <Dialog dialog={undefined} key={index} />
                })}
            {filteredDialogs.length > 0 && 
                filteredDialogs.map((dialog: DialogItem) => {
                    return <Dialog dialog={dialog} key={dialog.channel_id} />
                })}
            {filteredDialogs.length === 0 && isRefreshed.current && 
                <div className="dialogs__no-chats">
                    Чатов нет
                </div>
            }
        </div>
    );
};

export default DialogsContent;