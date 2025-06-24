import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../app/AppStore';
import Material from '../../entity/Material/Material';
import './UserMaterialsContent.scss';
import { createPortal } from 'react-dom';
import ModalWindow from '../../features/ModalWindow/ModalWindow';
import { setIsHiddenDeleteMaterial } from '../../app/slices/UserMaterialsSlice';
import { DeleteMaterial } from '../../pages/UserMaterials/api/UserMaterials';

const UserMaterialsContent: React.FC = () => {
    const { theme } = useSelector((state: AppState) => state.user);
    const { isFetched, materials, isHiddenDeleteWindow, deletedMaterialId } = useSelector(
        (state: AppState) => state.userMaterials,
    );
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (materials.length === 0 && isFetched) {
            const noIndex = document.createElement('meta');

            noIndex.name = 'robots';
            noIndex.content = 'noindex';

            document.head.appendChild(noIndex);
        }

        return () => {
            document.querySelector('meta[content="noindex"]')?.remove();
        };
    }, [materials, isFetched]);

    return (
        <div className="user-materials-content">
            {!isFetched && (
                <div className="user-materials-content-waiting">
                    <div className="user-materials-content__spinner"></div>
                </div>
            )}
            {isFetched && materials.length === 0 && (
                <div
                    className={
                        'user-materials-content__no-materials' + ` ${theme}-mode__bright-text`
                    }
                >
                    Материалов нет
                </div>
            )}
            {isFetched && materials.length > 0 && (
                <div className="user-materials-content-list">
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
            {!isHiddenDeleteWindow &&
                createPortal(
                    <ModalWindow
                        theme={theme}
                        modalType={'delete'}
                        closeModal={() => dispatch(setIsHiddenDeleteMaterial({ bool: true }))}
                        agreeTitle="Да"
                        cancelTitle="Отменить"
                        agreeFunc={() => dispatch(DeleteMaterial(deletedMaterialId))}
                        windowTitle="Вы уверены, что хотите удалить учебный материал?"
                    />,
                    document.querySelector('#root')!,
                )}
        </div>
    );
};

export default UserMaterialsContent;
