import React, { useState } from "react";
import './DialogsTags.scss';
import { DialogTagsPropTypes } from "./DialogsTagsTypes";

const tagsExamples: string[] = [
    'Golang',
    'JavaScript',
    'SQL',
    'Nginx',
    'Figma',
    'Docker',
    'Kafka',
];

const DialogsTags: React.FC<DialogTagsPropTypes> = ({handleCheckingTag}) => {
    const [checkedTags, setCheckedTags] = useState<string[]>([]);

    return (
        <div className="dialogs-tags">
            <div className="dialogs-tags-title">
                Теги
            </div>
            <div className="dialogs-tags-examples">
                {tagsExamples.map((tag) => {
                    const tagIndex: number = checkedTags.indexOf(tag);

                    return (
                        <div key={`${tag}id`}className={"dialogs-tags__tag" + (tagIndex !== -1 ? " dialogs-tags__tag_selected" : "")} onClick={() => {
                            let nextCheckedTags: string[] = [];
                            
                            if (tagIndex !== -1) {
                                nextCheckedTags = [...checkedTags.slice(0, tagIndex), ...checkedTags.slice(tagIndex + 1)];
                            } else {
                                nextCheckedTags = [tag, ...checkedTags];
                            }

                            handleCheckingTag(nextCheckedTags);
                            setCheckedTags(nextCheckedTags);
                        }}>
                            {tag}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default DialogsTags;