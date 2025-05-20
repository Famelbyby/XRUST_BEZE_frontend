import React from 'react';

const skillLevels = [
    {
        color: '#D8D8FF',
        title: 'Начинающий',
    },
    {
        color: '#AFAFFF',
        title: 'Средний',
    },
    {
        color: '#7978FF',
        title: 'Продвинутый',
    },
];

const SkillLevelsExplaining: React.FC = () => {
    return (
        <div className="profile-skill-levels">
            {skillLevels.map((skillLevel) => {
                return (
                    <div key={skillLevel.title} className="profile-skill-level-row">
                        <div
                            className="profile-skill-level__color"
                            style={{ backgroundColor: skillLevel.color }}
                        ></div>
                        <div className="profile-skill-level__title">{skillLevel.title}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default SkillLevelsExplaining;
