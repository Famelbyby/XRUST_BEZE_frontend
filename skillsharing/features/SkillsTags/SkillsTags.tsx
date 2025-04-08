import React, { useEffect, useState } from "react";
import './SkillsTags.scss';
import {SkillsTagsPropTypes} from './SkillsTagsTypes';
import { useSelector } from "react-redux";
import { AppState } from "../../app/AppStore";
import { Skill } from "../../shared/Consts/Interfaces";

const SkillsTags: React.FC<SkillsTagsPropTypes> = ({handleFilteringSomething}) => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const {user} = useSelector((state: AppState) => state.user);

    useEffect(() => {
        if (user !== undefined) {
            setTags(user.skills_to_learn.map((skill: Skill) => skill.name));
            setSelectedTags([]);
        }
    }, [user]);

    return (
        <div className="skills-tags">
            <div className="skills-tags__title">
                Навыки
                <div className="skills-tags__count">
                    {tags.length}
                </div>
            </div>
            <div className="skills-tags-examples">
                {tags.map((tag: string) => {
                    const tagIndex: number = selectedTags.indexOf(tag);

                    return (
                        <div key={`${tag}id`} className={"skills-tags__tag" + (tagIndex !== -1 ? " skills-tags__tag_selected" : "")} onClick={() => {
                            const tagIndex: number = selectedTags.indexOf(tag);
                            let newSelectedTags: string[];

                            if (tagIndex === -1) {
                                newSelectedTags = [...selectedTags, tag];
                            } else {
                                newSelectedTags = [...selectedTags.slice(0, tagIndex), ...selectedTags.slice(tagIndex + 1)];
                            }

                            handleFilteringSomething(newSelectedTags, user!);
                            setSelectedTags(newSelectedTags);
                        }}>
                            {tag}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default SkillsTags;