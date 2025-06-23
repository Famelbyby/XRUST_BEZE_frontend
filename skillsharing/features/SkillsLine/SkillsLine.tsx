import React from 'react';
import { Skill } from '../../shared/Consts/Interfaces';
import './SkillsLine.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../app/AppStore';

interface TagsLinePropTypes {
    skills: Skill[];
}

const SkillsLine: React.FC<TagsLinePropTypes> = ({ skills }) => {
    const { theme } = useSelector((state: AppState) => state.user);

    return (
        <>
            {skills.map((skill: Skill) => {
                return (
                    <div
                        key={skill.name}
                        className={`skills-line__item skills-line__item_${skill.level} ${theme}-mode__${skill.level}-text`}
                        title={skill.name}
                    >
                        {skill.name}
                    </div>
                );
            })}
        </>
    );
};

export default SkillsLine;
