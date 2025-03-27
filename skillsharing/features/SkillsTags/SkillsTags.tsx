import React, { useRef, useEffect, useState } from "react";
import './SkillsTags.scss';
import { Skill } from "../../widgets/ProfileLeftColumn/ProfileLeftColumnTypes";
import { useDispatch, useSelector } from "react-redux";
import { DialogsState } from "../../app/stores/DialogsStore";
import { ProfileType } from "../../pages/Profile/ui/ProfileTypes";
import { GetProfile } from "../../pages/Profile/api/Profile";
import {SkillsTagsPropTypes} from './SkillsTagsTypes';

const SkillsTags: React.FC<SkillsTagsPropTypes> = ({handleFilteringSomething}) => {
    const {userID} = useSelector((state: DialogsState) => state.dialogs);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const dispatch = useDispatch();
    const componentIsMounted = useRef(true);

    useEffect(() => {
        function gotProfile(profileData: ProfileType) {
            if (componentIsMounted.current) {
                setTags(profileData.skills_to_learn.map((skill: Skill) => skill.name));
                setSelectedTags([]);
            }
        }

        GetProfile(userID, gotProfile);

        return () => {
            componentIsMounted.current = false;
        }
    }, [userID, dispatch]);

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

                            handleFilteringSomething(newSelectedTags);
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