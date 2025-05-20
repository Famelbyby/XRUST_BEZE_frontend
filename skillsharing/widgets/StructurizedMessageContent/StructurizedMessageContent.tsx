import React from 'react';
import './StructurizedMessageContent.scss';
import ReactMarkdown from 'react-markdown';
import { IMessage } from '../../entity/Message/MessageTypes';
import { ReplaceHrefsToMarkDown } from '../../shared/Functions/FormatStrings';

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
                    <ReactMarkdown>
                        {ReplaceHrefsToMarkDown(message.structurized!, /http(s)?:\/\/(\S)*/g)}
                    </ReactMarkdown>
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
