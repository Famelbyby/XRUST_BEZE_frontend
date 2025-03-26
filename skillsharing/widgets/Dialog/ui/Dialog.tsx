import { useNavigate } from "react-router";
import { DialogProps } from "./DialogTypes";
import React from "react";
import { FormatHoursMinutes } from "../../../shared/Functions/FormatDate";
import { ProfileType } from "../../../pages/Profile/ui/ProfileTypes";
import User from "../../../entity/User/User";

const Dialog: React.FC<DialogProps> = ({dialog}) => {
    const navigateTo = useNavigate();
    let companion: ProfileType | undefined = undefined;

    if (dialog !== undefined) {
        const dialogCompanion: ProfileType | undefined = dialog.users.find((user: ProfileType) => user.id != User.getUserID());

        if (dialogCompanion !== undefined) {
            companion = dialogCompanion;
        }
    }

    return (
        <div className="dialog" onClick={() => {
            if (dialog !== undefined) {
                navigateTo(`/chat/${companion?.id}?channel_id=${dialog?.channel_id}`)};
            }
        }>
            <div className="dialog-user">
                {dialog !== undefined && 
                    <img className="dialog-user__avatar" src='/Dialogs/mate.png' alt="" />
                }
                {dialog === undefined && 
                    <div className="dialog-user__avatar dialog-user__avatar-mock">
                        <div className="dialog-user__avatar-spinner">
                        </div>
                    </div>
                }
                <div className="dialog-user-info">
                    {dialog === undefined && 
                        <div className="dialog-user-info__name dialog-user-info__name-mock">
                            <div className="dialog-user-info__name-spinner">
                            </div>
                        </div>
                    }
                    {dialog !== undefined && 
                        <div className="dialog-user-info__name">
                            {companion?.username}
                        </div>
                    }
                    {dialog === undefined &&
                        <div className="dialog-user-info__last-message dialog-user-info__last-message-mock">
                            <div className="dialog-user-info__last-message-spinner">
                            </div>
                        </div>
                    }
                    {dialog !== undefined && 
                        <span className="dialog-user-info__last-message">
                            {dialog.last_message.payload}
                        </span>
                    }
                    
                    <div className="dialog-user-info__message-time">
                        {dialog !== undefined && 
                            <>
                                {FormatHoursMinutes(new Date(dialog.last_message.created_at))}
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className="dialog-info">
                {dialog !== undefined && 
                    <div className="dialog-info__tags">
                        {companion?.skills_to_share.join(' ')}
                    </div>
                }
                {dialog === undefined && 
                    <div className="dialog-info__tags dialog-info__tags-mock">
                        <div className="dialog-info__tags-spinner">
                        </div>
                    </div>
                }
                <div className="dialog-info__seen">
                </div>
            </div>
        </div>
    )
};

export default Dialog;