import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../app/AppStore';
import Material from '../../entity/Material/Material';
import { GetMaterialsByName, GetMaterialsByTags } from '../../pages/Materials/api/Materials';
import { clearMaterials } from '../../app/slices/MaterialsSlice';
import FilterByNameAndSkills from '../../features/FilterByNameAndSkills/FilterByNameAndSkills';
import './MaterialsContent.scss';
import { GetCategories } from '../../pages/Auth/api/Auth';

const LeftSide: React.FC = () => {
    const { isFetched, materials } = useSelector((state: AppState) => state.materials);

    return (
        <div className="materials-content-left-side">
            {!isFetched && (
                <div className="materials-content-mock">
                    <div className="materials-content__spinner"></div>
                </div>
            )}
            {isFetched && materials.length === 0 && (
                <div className="materials-content__no-materials">
                    Подходящих материалов не найдено
                </div>
            )}
            {isFetched && materials.length > 0 && (
                <div className="materials-content-list">
                    {materials.map(
                        ({ id, name, filename, author, author_id, tags, created, updated }) => {
                            return (
                                <Material
                                    key={id}
                                    id={id}
                                    name={name}
                                    filename={filename}
                                    author={author}
                                    author_id={author_id}
                                    tags={tags}
                                    created={created}
                                    updated={updated}
                                />
                            );
                        },
                    )}
                </div>
            )}
        </div>
    );
};

const RightSide: React.FC = () => {
    const { user } = useSelector((state: AppState) => state.user);
    const { globalSkills } = useSelector((state: AppState) => state.materials);
    const dispatch = useDispatch<AppDispatch>();

    function changedNameInput(nameInput: string) {
        if (nameInput === '') {
            if (user !== undefined) {
                dispatch(GetMaterialsByTags(user.skills_to_learn.map((skill) => skill.name)));
            }
        } else {
            dispatch(GetMaterialsByName(nameInput));
        }
    }

    function changedSkillInput(tagInput: string[]) {
        if (tagInput.length === 0) {
            if (user !== undefined) {
                dispatch(GetMaterialsByTags(user.skills_to_learn.map((skill) => skill.name)));
            }
        } else {
            dispatch(GetMaterialsByTags(tagInput));
        }
    }

    useEffect(() => {
        dispatch(GetCategories());
    }, []);

    return (
        <div className="materials-content-right-side">
            <FilterByNameAndSkills
                changedSkill={(skill) => changedSkillInput(skill)}
                changedName={(nameInput) => changedNameInput(nameInput)}
                globalSkills={globalSkills}
            />
        </div>
    );
};

const MaterialsContent: React.FC = () => {
    const { user } = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (user !== undefined) {
            dispatch(GetMaterialsByTags(user.skills_to_learn.map((skill) => skill.name)));
        }

        return () => {
            dispatch(clearMaterials());
        };
    }, []);

    return (
        <div className="materials-content">
            <LeftSide />
            <RightSide />
        </div>
    );
};

export default MaterialsContent;
