import React, { useState } from "react";
import './DialogsTags.scss';
import { DialogTagsPropTypes } from "./DialogsTagsTypes";
import { Skill } from "../ProfileLeftColumn/ProfileLeftColumnTypes";

const tagsExamples: string[] = [
    'Golang',
    'JavaScript',
    'SQL',
    'Nginx',
    'Figma',
    'Docker',
    'Kafka',
];

const DialogsTags: React.FC<DialogTagsPropTypes> = ({handleCheckingTag, tags}) => {
    const [checkedTags, setCheckedTags] = useState<Skill[]>([]);

    return (
        <div className="dialogs-tags">
            <div className="dialogs-tags__title">
                Навыки
                <div className="dialogs-tags__count">
                    {tags.length}
                </div>
            </div>
            <div className="dialogs-tags-examples">
                {tags.map((tag: Skill) => {
                    const tagIndex: number = checkedTags.indexOf(tag);

                    return (
                        <div key={`${tag}id`}className={"dialogs-tags__tag" + (tagIndex !== -1 ? " dialogs-tags__tag_selected" : "")} onClick={() => {
                            let nextCheckedTags: Skill[] = [];
                            
                            if (tagIndex !== -1) {
                                nextCheckedTags = [...checkedTags.slice(0, tagIndex), ...checkedTags.slice(tagIndex + 1)];
                            } else {
                                nextCheckedTags = [tag, ...checkedTags];
                            }

                            handleCheckingTag(nextCheckedTags);
                            setCheckedTags(nextCheckedTags);
                        }}>
                            {tag.name}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default DialogsTags;