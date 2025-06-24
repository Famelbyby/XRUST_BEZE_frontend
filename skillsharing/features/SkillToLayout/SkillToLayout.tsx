import React from 'react';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { Skill } from '../../shared/Consts/Interfaces';

interface SkillToLayoutProps {
    title: string;
    skills: Skill[];
    globalSkills: string[];
    error: string | undefined;
    addSkill: (skill: string) => void;
    editedLevel: ([index, level]: [number, string]) => void;
    deleteSkill: (name: string) => void;
    theme?: string;
}

const SkillToLayout: React.FC<SkillToLayoutProps> = ({
    title,
    skills,
    globalSkills,
    error,
    addSkill,
    editedLevel,
    deleteSkill,
    theme = 'light',
}) => {
    const enabledSkills = globalSkills.filter(
        (globalSkill) => !skills.find((skill) => skill.name === globalSkill),
    );

    return (
        <div className={'sign-up-sktl' + ` ${theme}-mode__bright-text`}>
            {title}
            {skills.length < 5 && (
                <DropdownMenu menu={enabledSkills} callback={(newSkill) => addSkill(newSkill)} />
            )}
            {error !== undefined && (
                <div className={'sign-up-sktl__no-skills-error' + ` ${theme}-mode__error-text`}>
                    {error}
                </div>
            )}
            <div className="sign-up-sktl-cases">
                {skills.map((skill, index) => {
                    return (
                        <div className="sign-up-sktl-case" key={index}>
                            <div className="sign-up-sktl-case-select-skill">{skill.name}</div>
                            <select
                                className="sign-up-sktl-case-select-level"
                                onChange={(event) => {
                                    editedLevel([index, event.target.value]);
                                }}
                            >
                                {['beginner', 'intermediate', 'advanced'].map((level) => {
                                    return (
                                        <>
                                            {level === skill.level && (
                                                <option value={level} selected key={index}>
                                                    {level}
                                                </option>
                                            )}
                                            {level !== skill.level && (
                                                <option value={level} key={index}>
                                                    {level}
                                                </option>
                                            )}
                                        </>
                                    );
                                })}
                            </select>
                            <img
                                className={'sign-up-sktl-case__delete-img' + ` ${theme}-mode__img`}
                                src="/shared/cancel.png"
                                alt="Удалить навык"
                                onClick={() => deleteSkill(skill.name)}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SkillToLayout;
