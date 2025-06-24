import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../app/AppStore';
import { useNavigate, useParams } from 'react-router';
import { GetMaterialByID } from '../api/CertainMaterial';
import { clearCertainMaterial } from '../../../app/slices/CertainMaterialSlice';
import NotFound from '../../../features/404/404';
import { MATERIALS_URL } from '../../../shared/Consts/URLS';
import './CertainMaterial.scss';

const CertainMaterial: React.FC = () => {
    const { theme } = useSelector((state: AppState) => state.user);
    const { isFetched, material } = useSelector((state: AppState) => state.certainMaterial);
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigateTo = useNavigate();

    useEffect(() => {
        if (material !== undefined) {
            document.title = material.name;
        }
    }, [material]);

    useEffect(() => {
        const materialID = params.materialID;

        if (materialID !== undefined) {
            dispatch(GetMaterialByID(materialID));
        }

        return () => {
            dispatch(clearCertainMaterial());
        };
    }, []);

    useEffect(() => {
        if (material === undefined && isFetched) {
            const noIndex = document.createElement('meta');

            noIndex.name = 'robots';
            noIndex.content = 'noindex';

            document.head.appendChild(noIndex);
        }

        return () => {
            document.querySelector('meta[content="noindex"]')?.remove();
        };
    }, [material, isFetched]);

    const isPdfFile = material !== undefined && material.filename.endsWith('.pdf');

    useEffect(() => {
        if (!isPdfFile && material !== undefined) {
            navigateTo(-1);
        }
    }, [material]);

    return (
        <div className="certain-material">
            <div className="user-materials-header-go-back">
                <div
                    className="user-materials-header-go-back-wrapper"
                    aria-label="Вернуться"
                    onClick={() => {
                        navigateTo(-1);
                    }}
                >
                    <img
                        className={'user-materials-header-go-back__img' + ` ${theme}-mode__img`}
                        src="/shared/go-back.png"
                        alt=""
                    />
                </div>
            </div>
            {!isFetched && <div className="certain-material__spinner"></div>}
            {isFetched && material !== undefined && (
                <div className="certain-material-content">
                    <div
                        className={
                            'certain-material-content_mobile' + ` ${theme}-mode__bright-text`
                        }
                    >
                        К сожалению, на вашем устройстве нельзя просмотреть PDF файл
                    </div>
                    {isPdfFile && (
                        <object
                            data={MATERIALS_URL + '/' + material.filename}
                            type={'application/pdf'}
                            width="550px"
                            height="1000px"
                            className="certain-material-viewer"
                        >
                            <p>
                                Your browser does not support this file extension.{' '}
                                <a
                                    href={MATERIALS_URL + material.filename}
                                    download={material.name}
                                >
                                    Download the PDF
                                </a>
                                .
                            </p>
                        </object>
                    )}
                </div>
            )}
            {isFetched && material === undefined && <NotFound />}
        </div>
    );
};

export default CertainMaterial;
