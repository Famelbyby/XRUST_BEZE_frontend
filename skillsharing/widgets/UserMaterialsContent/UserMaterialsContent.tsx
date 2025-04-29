import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../app/AppStore";
import Material from '../../entity/Material/Material'
import './UserMaterialsContent.scss'

const UserMaterialsContent: React.FC = () => {
    const {isFetched, materials} = useSelector((state: AppState) => state.userMaterials);

    useEffect(() => {
        if (materials.length === 0 && isFetched) {
            const noIndex = document.createElement('meta');
            
            noIndex.name = 'robots';
            noIndex.content = 'noindex';

            document.head.appendChild(noIndex);
        }

        return () => {
            document.querySelector('meta[content="noindex"]')?.remove();
        }
    }, [materials, isFetched]);

    return (
        <div className="user-materials-content">
            {!isFetched && 
                <div className="user-materials-content-waiting">
                    <div className="user-materials-content__spinner">
                    </div>
                </div>
            }
            {isFetched && materials.length === 0 && 
                <div className="user-materials-content__no-materials">
                    Материалов нет
                </div>
            }
            {isFetched && materials.length > 0 && 
                <div className="user-materials-content-list">
                    {materials.map(({id, name, filename, author, author_id, tags, created, updated}) => {
                        return (
                            <Material key={id} id={id} name={name} filename={filename} author={author} author_id={author_id} tags={tags} created={created} updated={updated}/>
                        )
                    })}
                </div>
            }
        </div>
    );
};

export default UserMaterialsContent;