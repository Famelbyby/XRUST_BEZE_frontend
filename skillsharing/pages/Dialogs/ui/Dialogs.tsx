import { DialogItem } from "../../../widgets/Dialog/ui/DialogTypes"
import Dialog from "../../../widgets/Dialog/ui/Dialog";
import React, { useEffect, useRef, useState } from 'react';
import './Dialogs.scss'
import DialogsTags from "../../../widgets/DialogsTags/DialogsTags";
import {GetDialogs} from '../api/Dialogs';
import User from "../../../entity/User/User";

const Dialogs: React.FC = () => {
    const [dialogs, setDialogs] = useState(Array<DialogItem>);
    const [filteredDialogs, setFilteredDialogs] = useState(dialogs);
    const componentIsMounted = useRef(true);
    const isRefreshed = useRef(false);

    useEffect(() => {
        const ownUserID: string = User.getUserID();

        function gotDialogs(dialogsData: DialogItem[]) {
            if (componentIsMounted) {
                setDialogs(dialogsData);
                setFilteredDialogs(dialogsData);
                isRefreshed.current = true;
            }
        }

        GetDialogs(ownUserID, gotDialogs);

        return () => {
            componentIsMounted.current = false;
        }
    }, [])

    function handleFilteringDialogs(tags: string[]) {
        if (tags.length === 0) {
            setFilteredDialogs(dialogs);
            return;
        }

        const sortedDialogs: DialogItem[] = [];

        dialogs.forEach((dialog) => {
            const isFiltered: boolean = false;

            // tags.forEach((tag) => {
            //     if (dialog.us.includes(tag)) {
            //         isFiltered = true;
            //     }
            // });

            if (isFiltered) {
                sortedDialogs.push(dialog);
            }
        });

        setFilteredDialogs(sortedDialogs);
    }

    return (
        <div className="dialogs-page">
            <div className="dialogs">
                {!isRefreshed.current && 
                    [0, 1, 2, 3, 4].map((index) => {
                        return <Dialog dialog={undefined} key={index} />
                    })}
                {filteredDialogs.length > 0 && 
                    filteredDialogs.map((dialog) => {
                        return <Dialog dialog={dialog} key={dialog.channel_id} />
                    })}
                {filteredDialogs.length === 0 && isRefreshed.current && 
                    <div className="dialogs__no-chats">
                        Чатов нет
                    </div>
                }
            </div>
            <DialogsTags handleCheckingTag={handleFilteringDialogs}/>
        </div>
    )
};

export default Dialogs;