import React, { useRef, useEffect } from "react";
import './SkillsTags.scss';
import { Skill } from "../../widgets/ProfileLeftColumn/ProfileLeftColumnTypes";
import { useDispatch, useSelector } from "react-redux";
import { DialogsState } from "../../app/stores/DialogsStore";
import { ProfileType } from "../../pages/Profile/ui/ProfileTypes";
import { setSelectedTags, toggleSelectedTag } from "../../pages/Dialogs/ui/slice/DialogsSlice";
import { GetProfile } from "../../pages/Profile/api/Profile";

const SkillsTags: React.FC = () => {
    const {userID, selectedTags} = useSelector((state: DialogsState) => state.dialogs);
    const tags = useRef<string[]>([]);
    const dispatch = useDispatch();
    const componentIsMounted = useRef(true);

    useEffect(() => {
        dispatch(setSelectedTags([]));

        function gotProfile(profileData: ProfileType) {
            if (componentIsMounted.current) {
                tags.current = profileData.skills_to_learn.map((skill: Skill) => skill.name);
            }
        }

        GetProfile(userID, gotProfile);

        return () => {
            componentIsMounted.current = false;
            tags.current = [];
        }
    }, [userID, dispatch]);

    return (
        <div className="skills-tags">
            <div className="skills-tags__title">
                Навыки
                <div className="skills-tags__count">
                    {selectedTags.length}
                </div>
            </div>
            <div className="skills-tags-examples">
                {tags.current.map((tag: string) => {
                    const tagIndex: number = selectedTags.indexOf(tag);

                    return (
                        <div key={`${tag}id`} className={"skills-tags__tag" + (tagIndex !== -1 ? " skills-tags__tag_selected" : "")} onClick={() => {
                            dispatch(toggleSelectedTag(tag));
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