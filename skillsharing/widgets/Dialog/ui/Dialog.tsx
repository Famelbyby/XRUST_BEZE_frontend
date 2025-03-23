import { useNavigate } from "react-router";
import { DialogProps } from "./DialogTypes";
import React from "react";

const Dialog: React.FC<DialogProps> = ({dialog}) => {
    const dialogTime = new Date();
    const navigateTo = useNavigate();

    return (
        <div className="dialog" onClick={() => {
            if (dialog !== undefined) {
                navigateTo(`/chat/${dialog?.id}`)};
            }
        }>
            <div className="dialog-user">
                {dialog !== undefined && 
                    <img className="dialog-user__avatar" src={dialog.avatar} alt="" />
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
                            {dialog.name}
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
                            {dialog.text}
                        </span>
                    }
                    
                    <div className="dialog-user-info__message-time">
                        {dialogTime.getHours()} : {dialogTime.getMinutes()}
                    </div>
                </div>
            </div>
            <div className="dialog-info">
                {dialog !== undefined && 
                    <div className="dialog-info__tags">
                        {dialog.tags.join(' ')}
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