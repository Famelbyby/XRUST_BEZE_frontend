import React, { useRef, useState } from "react";
import './SkillsTags.scss';
import { SkillsTagsPropTypes } from "./SkillsTagsTypes";
import { Skill } from "../../widgets/ProfileLeftColumn/ProfileLeftColumnTypes";
import {SELECTED_TAG_COLOR} from '../../shared/Consts/Colors'
import {Shuffle} from '../../shared/Functions/EditArrays'

const SkillsTags: React.FC<SkillsTagsPropTypes> = ({handleCheckingTag, tags}) => {
    const [checkedTags, setCheckedTags] = useState<Skill[]>([]);
    const shuffledColors = useRef(Shuffle(SELECTED_TAG_COLOR));

    return (
        <div className="skills-tags">
            <div className="skills-tags__title">
                Навыки
                <div className="skills-tags__count">
                    {tags.length}
                </div>
            </div>
            <div className="skills-tags-examples">
                {tags.map((tag: Skill, index: number) => {
                    const tagIndex: number = checkedTags.indexOf(tag);

                    return (
                        <div key={`${tag.name}id`} className={"skills-tags__tag" + (tagIndex !== -1 ? " skills-tags__tag_selected" : "")} onClick={() => {
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

export default SkillsTags;