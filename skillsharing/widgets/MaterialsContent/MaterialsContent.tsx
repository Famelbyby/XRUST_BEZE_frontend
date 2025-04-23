import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../app/AppStore";
import Material from "../../entity/Material/Material";
import { GetMaterialsByTags } from "../../pages/Materials/api/Materials";
import { clearMaterials } from "../../app/slices/MaterialsSlice";
import './MaterialsContent.scss'

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
    return (
        <div className="materials-content-right-side">
            <div className="materials-content-filter">
                Фильтр по 
                <select className="materials-content-filter-select">
                    <option className="materials-content-filter__option" value={"name"}>имени</option>
                    <option className="materials-content-filter__option" value={"skill"}>навыку</option>
                </select>
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