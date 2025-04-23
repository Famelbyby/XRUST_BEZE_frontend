import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../app/AppStore";
import Material from "../../entity/Material/Material";
import { GetMaterialsByName, GetMaterialsByTags } from "../../pages/Materials/api/Materials";
import { changeFilterType, clearMaterials } from "../../app/slices/MaterialsSlice";
import './MaterialsContent.scss'
import { GetCategories } from "../../pages/Auth/api/Auth";

const LeftSide: React.FC = () => {
    const {isFetched, materials} = useSelector((state: AppState) => state.materials);

    return (
        <div className="materials-content-left-side">
            {!isFetched && 
                <div className="materials-content-mock">
                    <div className="materials-content__spinner">
                    </div>
                </div>
            }
            {isFetched && materials.length === 0 && 
                <div className="materials-content__no-materials">
                    Подходящих материалов не найдено
                </div>
            }
            {isFetched && materials.length > 0 && 
                <div className="materials-content-list">
                    {materials.map(({id, name, filename, author, author_id, tags, created, updated}) => {
                        return (
                            <Material key={id} id={id} name={name} filename={filename} author={author} author_id={author_id} tags={tags} created={created} updated={updated}/>
                        )
                    })}
                </div>
            }
        </div>
    )
}

const RightSide: React.FC = () => {
    const {user} = useSelector((state: AppState) => state.user);
    const {filterType, globalSkills} = useSelector((state: AppState) => state.materials);
    const [materialNameInput, setMaterialNameInput] = useState("");
    const [materialSkillInput, setMaterialSkillInput] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(GetCategories());
    }, []);

    useEffect(() => {
        if (materialNameInput === '') {
            if (user !== undefined) {
                dispatch(GetMaterialsByTags(user.skills_to_learn.map((skill) => skill.name)));
            }
        } else {
            dispatch(GetMaterialsByName(materialNameInput));
        }
    }, [materialNameInput]);

    useEffect(() => {
        if (materialSkillInput === '') {
            if (user !== undefined) {
                dispatch(GetMaterialsByTags(user.skills_to_learn.map((skill) => skill.name)));
            }
        } else {
            dispatch(GetMaterialsByTags([materialSkillInput]));
        }
    }, [materialSkillInput]);

    return (
        <div className="materials-content-right-side">
            <div className="materials-content-filter">
                Фильтр по 
                <select className="materials-content-filter-select" onChange={(event) => {
                    setMaterialNameInput("");
                    setMaterialSkillInput("");
                    dispatch(changeFilterType(event.target.value));
                }}>
                    <option className="materials-content-filter__option" value={"name"} selected>названию</option>
                    <option className="materials-content-filter__option" value={"skill"}>навыку</option>
                </select>
            </div>
            <div className="materials-content-inputs">
                {filterType === "name" && 
                    <input type="text" className="materials-content__name-input" value={materialNameInput} placeholder="Название материала" onChange={(event) => {
                        setMaterialNameInput(event.target.value);
                    }}/>
                }
                {filterType === "skill" && 
                    <select className='materials-content__skill-select' onChange={(event) => {
                        setMaterialSkillInput(event.target.value);
                    }}>
                        <option value={""} selected key={"nothing"}>...</option>
                        {globalSkills.map((glSkill, index) => {
                            return (
                                <>
                                    <option value={glSkill} key={index}>{glSkill}</option>
                                </>
                            )
                        })}
                    </select>
                }
            </div>
        </div>
    )
}

const MaterialsContent: React.FC = () => {
    const {user} = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (user !== undefined) {
            dispatch(GetMaterialsByTags(user.skills_to_learn.map((skill) => skill.name)));
        }

         return () => {
            dispatch(clearMaterials());
         }
    }, []);

    return (
        <div className="materials-content">
            <LeftSide />
            <RightSide />
        </div>
    )
};

export default MaterialsContent;