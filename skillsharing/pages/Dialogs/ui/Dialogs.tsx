import { DialogItem } from "../../../widgets/Dialog/ui/DialogTypes"
import { ProfileType } from "../../Profile/ui/ProfileTypes";
import { Skill } from "../../../widgets/ProfileLeftColumn/ProfileLeftColumnTypes";
import Dialog from "../../../widgets/Dialog/ui/Dialog";
import React, { useEffect, useRef, useState } from 'react';
import './Dialogs.scss'
import SkillsTags from "../../../features/SkillsTags/SkillsTags";
import {GetDialogs} from '../api/Dialogs';
import User from "../../../entity/User/User";
import { GetProfile } from "../../Profile/api/Profile";
import MainWebSocket from '../../../shared/WebSocket/WebSocket'
import { IMessage } from "../../../entity/Message/MessageTypes";


const Dialogs: React.FC = () => {
    const [dialogs, setDialogs] = useState(Array<DialogItem>);
    const [tags, setTags] = useState<Skill[]>([]);
    const [filteredDialogs, setFilteredDialogs] = useState(dialogs);
    const componentIsMounted = useRef(true);
    const isRefreshed = useRef(false);
    const ownUserID: string = User.getUserID();

    function handleSendingMessage(message: IMessage) {
        const foundDialog: number = dialogs.findIndex((dialog: DialogItem) => dialog.channel_id === message.channel_id);

        if (foundDialog === -1) {
            return;
        }

        const updatedDialog: DialogItem = {
            ...dialogs[foundDialog],
            last_message: message,
        };

        setDialogs([...dialogs.slice(0, foundDialog), updatedDialog, ...dialogs.slice(foundDialog + 1)]);
    }

    function handleUpdatingMessage(message: IMessage) {
        const foundDialog: number = dialogs.findIndex((dialog: DialogItem) => {
            if (dialog.last_message === null) {
                return false;
            }

            if (dialog.last_message.message_id === message.message_id) {
                return true;
            }
        });

        if (foundDialog === -1) {
            return;
        }

        const updatedDialog: DialogItem = {
            ...dialogs[foundDialog],
            last_message: message,
        };

        setDialogs([...dialogs.slice(0, foundDialog), updatedDialog, ...dialogs.slice(foundDialog + 1)]);
    }
    
    /**
     * Adds messages movement in chat
     */
    useEffect(() => {
        MainWebSocket.addObserver('dialogs-messages', (data: string) => {
            const message: IMessage = JSON.parse(data);
            
            switch (message.type) {
                case 'send_message':
                    handleSendingMessage(message);
                    break;
                case 'update_message':
                    handleUpdatingMessage(message);
                    break;
                case 'delete_message':
                    break;
            }
        });

        return () => {
            MainWebSocket.removeObserver('chat-messages');
        };
    }, []);

    useEffect(() => {
        function gotDialogs(dialogsData: DialogItem[]) {
            if (componentIsMounted.current) {
                setDialogs(dialogsData);
                setFilteredDialogs(dialogsData);
                isRefreshed.current = true;
            }
        }

        GetDialogs(ownUserID, gotDialogs);

        return () => {
            componentIsMounted.current = false;
        }
    }, [ownUserID])

    useEffect(() => {
        function gotProfile(profileData: ProfileType) {
            if (componentIsMounted.current) {
                setTags(profileData.skills_to_learn);
            }
        }

        GetProfile(ownUserID, gotProfile);
    }, [ownUserID]);

    function handleFilteringDialogs(tags: Skill[]) {
        if (tags.length === 0) {
            setFilteredDialogs(dialogs);
            return;
        }

        const sortedDialogs: DialogItem[] = [];

        dialogs.forEach((dialog: DialogItem) => {
            let isFiltered: boolean = false;
            const companion: ProfileType | undefined= dialog.users.find((user: ProfileType) => user.id !== ownUserID);

            if (companion !== undefined) {
                tags.forEach((tag: Skill) => {
                    if (companion.skills_to_share.includes(tag)) {
                        isFiltered = true;
                    }
                });
            }

            if (isFiltered) {
                sortedDialogs.push(dialog);
            }
        });

        setFilteredDialogs(sortedDialogs);
    }

    const sortedDialogs: DialogItem[] = filteredDialogs.filter((dialog: DialogItem) => dialog.last_message !== null);

    return (
        <div className="dialogs-page">
            <div className="dialogs">
                {!isRefreshed.current && 
                    [0, 1, 2, 3, 4].map((index) => {
                        return <Dialog dialog={undefined} key={index} />
                    })}
                {sortedDialogs.length > 0 && 
                    sortedDialogs.map((dialog) => {
                        return <Dialog dialog={dialog} key={dialog.channel_id} />
                    })}
                {sortedDialogs.length === 0 && isRefreshed.current && 
                    <div className="dialogs__no-chats">
                        Чатов нет
                    </div>
                }
            </div>
            <SkillsTags handleCheckingTag={handleFilteringDialogs} tags={tags}/>
        </div>
    )
};

export default Dialogs;