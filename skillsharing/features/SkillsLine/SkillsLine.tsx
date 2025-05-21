import React from 'react';
import { Skill } from '../../shared/Consts/Interfaces';
import './SkillsLine.scss';

interface TagsLinePropTypes {
    skills: Skill[];
}

const SkillsLine: React.FC<TagsLinePropTypes> = ({ skills }) => {
    return (
        <>
            {skills.map((skill: Skill) => {
                return (
                    <div
                        key={skill.name}
                        className={`skills-line__item skills-line__item_${skill.level}`}
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
