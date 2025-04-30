import React from 'react';
import './StructurizedMessageContent.scss';
import ReactMarkdown from 'react-markdown';
import { IMessage } from '../../entity/Message/MessageTypes';

interface StructurizedMessageContentPropTypes {
    message: IMessage | undefined;
    isOnPage: boolean;
}

const StructurizedMessageContent: React.FC<StructurizedMessageContentPropTypes> = ({
    message,
    isOnPage,
}) => {
    return (
        <div className={'str-message-content' + (isOnPage ? ' str-message-content_paddinged' : '')}>
            {message !== undefined && (
                <div className="str-message-markdown">
                    <ReactMarkdown>{message.structurized}</ReactMarkdown>
                </div>
            )}
            {message === undefined && (
                <div className="str-message-content__mock">
                    <div className="str-message-content__spinner"></div>
                </div>
            )}
        </div>
    );
};

export default StructurizedMessageContent;
