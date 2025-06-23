import { useNavigate } from 'react-router';
import { DialogProps } from './DialogTypes';
import React from 'react';
import { FormatRelativeTimeInPastInDays } from '../../../shared/Functions/FormatDate';
import { ProfileType } from '../../../pages/Profile/ui/ProfileTypes';
import { useSelector } from 'react-redux';
import { AppState } from '../../../app/AppStore';
import './Dialog.scss';
import { AVATAR_URL } from '../../../shared/Consts/URLS';
import SkillsLine from '../../../features/SkillsLine/SkillsLine';
import { SECOND_IN_MILLISECONDS } from '../../../shared/Consts/ValidatorsConts';

const Dialog: React.FC<DialogProps> = ({ dialog }) => {
    const { user, theme } = useSelector((state: AppState) => state.user);
    const navigateTo = useNavigate();

    let companion: ProfileType | undefined = undefined;

    if (dialog !== undefined) {
        const dialogCompanion: ProfileType | undefined = dialog.users.find(
            (dialogUser: ProfileType) => dialogUser.id != user!.id,
        );

        if (dialogCompanion !== undefined) {
            companion = dialogCompanion;
        }
    }

    return (
        <div
            className={'dialog' + ` ${theme}-mode__middle-block_hovered`}
            aria-label="Перейти в чат"
            onClick={() => {
                if (dialog !== undefined) {
                    navigateTo(`/chat/${companion?.id}`);
                }
            }}
        >
            <div className="dialog-user">
                {dialog !== undefined && (
                    <img
                        className="dialog-user__avatar"
                        src={AVATAR_URL + companion?.avatar}
                        alt=""
                    />
                )}
                {dialog === undefined && (
                    <div className="dialog-user__avatar dialog-user__avatar-mock">
                        <div className="dialog-user__avatar-spinner"></div>
                    </div>
                )}
                <div className="dialog-user-info">
                    {dialog === undefined && (
                        <div className="dialog-user-info__name dialog-user-info__name-mock">
                            <div className="dialog-user-info__name-spinner"></div>
                        </div>
                    )}
                    {dialog !== undefined && (
                        <div className="dialog-user-info__name">{companion?.username}</div>
                    )}
                    {dialog === undefined && (
                        <div className="dialog-user-info__last-message dialog-user-info__last-message-mock">
                            <div className="dialog-user-info__last-message-spinner"></div>
                        </div>
                    )}
                    {dialog !== undefined && (
                        <span
                            className={
                                'dialog-user-info__last-message' +
                                (dialog.last_message!.voice ||
                                dialog.last_message!.payload === undefined
                                    ? ' dialog-user-info__last-message_voiced' +
                                      ` ${theme}-mode__dull-text`
                                    : '')
                            }
                        >
                            {dialog.last_message!.voice !== undefined
                                ? 'Голосовое сообщение'
                                : dialog.last_message!.payload === undefined
                                  ? 'Файлы'
                                  : dialog.last_message!.payload}
                        </span>
                    )}

                    <div
                        className={'dialog-user-info__message-time' + ` ${theme}-mode__bright-text`}
                    >
                        {dialog !== undefined && (
                            <>
                                {FormatRelativeTimeInPastInDays(
                                    new Date(
                                        dialog.last_message!.created_at * SECOND_IN_MILLISECONDS,
                                    ),
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="dialog-info">
                {dialog !== undefined && (
                    <div className="dialog-info__tags">
                        <SkillsLine skills={companion!.skills_to_share} />
                    </div>
                )}
                {dialog === undefined && (
                    <div className="dialog-info__tags dialog-info__tags-mock">
                        <div className="dialog-info__tags-spinner"></div>
                    </div>
                )}
                <div className="dialog-info__seen"></div>
            </div>
        </div>
    );
};

export default Dialog;
