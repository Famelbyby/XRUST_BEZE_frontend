import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../app/AppStore';

interface SkillLevels {
    [index: string]: string;
}

const skillLevels: SkillLevels[] = [
    {
        lightColor: '#D8D8FF',
        'dark-greenColor': '#81c784',
        title: 'Начинающий',
    },
    {
        lightColor: '#AFAFFF',
        'dark-greenColor': '#43a047',
        title: 'Средний',
    },
    {
        lightColor: '#7978FF',
        'dark-greenColor': '#2e7d32',
        title: 'Продвинутый',
    },
];

const SkillLevelsExplaining: React.FC = () => {
    const { theme } = useSelector((state: AppState) => state.user);

    return (
        <div className="profile-skill-levels">
            {skillLevels.map((skillLevel) => {
                return (
                    <div key={skillLevel.title} className="profile-skill-level-row">
                        <div
                            className="profile-skill-level__color"
                            style={{ backgroundColor: skillLevel[theme + 'Color'] }}
                        ></div>
                        <div className="profile-skill-level__title">{skillLevel.title}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default SkillLevelsExplaining;
