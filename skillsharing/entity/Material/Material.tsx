import React from 'react';
import { MaterialItem } from './MaterialTypes';
import { AVATAR_URL, MATERIALS_URL } from '../../shared/Consts/URLS';
import { FormatRelativeTimeInPastInDays } from '../../shared/Functions/FormatDate';
import { SECOND_IN_MILLISECONDS } from '../../shared/Consts/ValidatorsConts';
import './Material.scss';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCopied } from '../../app/slices/UserSlice';
import { AppState } from '../../app/AppStore';
import { setIsHiddenDeleteMaterial } from '../../app/slices/UserMaterialsSlice';

const Material: React.FC<MaterialItem> = (material) => {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const { user, theme } = useSelector((state: AppState) => state.user);
    const location = useLocation();
    const onUserMaterialsPage = location.pathname.includes('profile-materials');

    return (
        <div
            className={'material' + ` ${theme}-mode__midlle-block_hovered`}
            onClick={() => {
                const isPdfFile = material !== undefined && material.filename.endsWith('.pdf');

                if (isPdfFile) {
                    navigateTo(`/materials/${material.id}`);
                } else {
                    const hrefToDownload = document.getElementById(
                        `download-material-${material.id}`,
                    );

                    if (hrefToDownload !== null) {
                        hrefToDownload.click();
                    }
                }
            }}
        >
            <div className="material-header">
                <div className="material-header__title">{material.name}</div>
                <div className="material-header-tags">
                    {material.tags.map((tag) => {
                        return (
                            <div
                                className={
                                    'material-header-tags__item' + ` ${theme}-mode__advanced-block`
                                }
                            >
                                {tag}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="material-footer">
                <div className="material-footer-left">
                    <div className={'material-footer-time' + ` ${theme}-mode__bright-text`}>
                        <img
                            className={'material-footer-time__img' + ` ${theme}-mode__img`}
                            src="/shared/clock.png"
                            alt=""
                        />
                        {FormatRelativeTimeInPastInDays(
                            new Date(material.created * SECOND_IN_MILLISECONDS),
                        )}
                    </div>
                    {material.author !== undefined && (
                        <div
                            className="material-footer-author"
                            aria-label="Перейти на автора"
                            onClick={(event) => {
                                event.stopPropagation();

                                navigateTo(`/profile/${material.author_id}`);
                            }}
                        >
                            <img
                                className="material-footer-author__avatar-img"
                                src={AVATAR_URL + material.author.avatar}
                                alt=""
                            />
                            {material.author.username}
                        </div>
                    )}
                </div>
                <div className="material-footer-right">
                    <a
                        id={`download-material-${material.id}`}
                        href={MATERIALS_URL + '/' + material.filename}
                        aria-label=""
                        download={material.name}
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                    >
                        <div className="material-footer-download">
                            скачать
                            <img
                                className={'material-footer-download__img' + ` ${theme}-mode__img`}
                                src="/UserMaterialsPage/download.png"
                                alt=""
                            />
                        </div>
                    </a>
                    <div
                        className="material-footer-share"
                        onClick={(event) => {
                            event.stopPropagation();

                            navigator.clipboard.writeText(
                                `https://skill-sharing.ru/materials/${material.id}`,
                            );

                            dispatch(setIsCopied(true));
                        }}
                    >
                        поделиться
                        <img
                            className={'material-footer-share__img' + ` ${theme}-mode__img`}
                            src="/UserMaterialsPage/share.png"
                            alt=""
                        />
                    </div>
                    {user !== undefined &&
                        user.id === material.author_id &&
                        onUserMaterialsPage && (
                            <div className="material-footer-delete">
                                <img
                                    className={
                                        'material-footer-delete__img' + ` ${theme}-mode__img`
                                    }
                                    src="/shared/delete.png"
                                    alt="Удалить материал"
                                    onClick={(event) => {
                                        event.stopPropagation();

                                        dispatch(
                                            setIsHiddenDeleteMaterial({
                                                id: material.id,
                                                bool: false,
                                            }),
                                        );
                                    }}
                                />
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default Material;
