import React, { useEffect, useState } from 'react';
import { FilterType } from '../../shared/Consts/Interfaces';
import './FilterByNameAndSkills.scss';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { useSearchParams } from 'react-router';

interface FilterProps {
    globalSkills: string[];
    changedName: (name: string) => void;
    changedSkill: (skill: string[]) => void;
    placeholder: string;
}

const FilterByNameAndSkills: React.FC<FilterProps> = ({
    changedSkill,
    changedName,
    globalSkills,
    placeholder,
}) => {
    const [query, setQuery] = useSearchParams();
    const [skills, setSkills] = useState<string[]>(query.getAll('skill') || []);
    const [materialNameInput, setMaterialNameInput] = useState(query.get('name') || '');
    const [filterType, setFilterType] = useState<FilterType>(
        materialNameInput === '' && skills.length !== 0 ? 'skill' : 'name',
    );

    const enabledSkills = globalSkills.filter(
        (globalSkill) => !skills.find((skill) => skill === globalSkill),
    );

    useEffect(() => {
        if (filterType === 'name') {
            changedName(materialNameInput);

            if (materialNameInput === '') {
                setQuery(undefined);
            } else {
                setQuery({ name: materialNameInput });
            }
        }
    }, [materialNameInput]);

    useEffect(() => {
        if (filterType === 'skill') {
            changedSkill(skills);

            if (skills.length === 0) {
                setQuery(undefined);
            } else {
                setQuery({ skill: skills });
            }
        }
    }, [skills]);

    return (
        <div className="filter-layout">
            <div className="filter-layout-filter">
                Фильтр по
                <select
                    className="filter-layout-filter-select"
                    onChange={(event) => {
                        setMaterialNameInput('');
                        setSkills([]);
                        setFilterType(event.target.value as FilterType);
                    }}
                >
                    <option className="filter-layout-filter__option" value={'name'} selected>
                        названию
                    </option>
                    <option className="filter-layout-filter__option" value={'skill'}>
                        навыку
                    </option>
                </select>
            </div>
            <div className="filter-layout-inputs">
                {filterType === 'name' && (
                    <input
                        type="text"
                        className="filter-layout__name-input"
                        value={materialNameInput}
                        placeholder={placeholder}
                        onChange={(event) => {
                            setMaterialNameInput(event.target.value);
                        }}
                    />
                )}
                {filterType === 'skill' && (
                    <>
                        <DropdownMenu
                            menu={enabledSkills}
                            callback={(newSkill) => setSkills([...skills, newSkill])}
                        />
                        <div className="filter-layout-added-skills">
                            {skills.map((skill) => {
                                return (
                                    <div className="filter-layout-added-skills-item">
                                        {skill}
                                        <img
                                            className="filter-layout__delete-skill"
                                            src="/shared/cancel.png"
                                            alt="Удалить"
                                            onClick={() => {
                                                setSkills(
                                                    skills.filter(
                                                        (prevSkill) => prevSkill !== skill,
                                                    ),
                                                );
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FilterByNameAndSkills;
