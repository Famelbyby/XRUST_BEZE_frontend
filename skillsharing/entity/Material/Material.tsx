import React from "react";
import { MaterialItem } from "./MaterialTypes";
import { AVATAR_URL, MATERIALS_URL } from "../../shared/Consts/URLS";
import { FormatRelativeTimeInPastInDays } from "../../shared/Functions/FormatDate";
import { SECOND_IN_MILLISECONDS } from "../../shared/Consts/ValidatorsConts";
import './Material.scss'
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setIsCopied } from "../../app/slices/UserSlice";

const Material: React.FC<MaterialItem> = (material) => {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="material" onClick={() => navigateTo(`/materials/${material.id}`)}>
            <div className="material-header">
                <div className="material-header__title">
                    {material.name}
                </div>
                <div className="material-header__tags">
                    {material.tags.reduce((accum, currentTag) => accum + currentTag + ' ', '')}
                </div>
            </div>
            <div className="material-footer">
                <div className="material-footer-left">
                    <div className="material-footer-time">
                        <img className="material-footer-time__img" src='/shared/clock.png' alt="" />
                        {FormatRelativeTimeInPastInDays(new Date(material.created * SECOND_IN_MILLISECONDS))}
                    </div>
                    {material.author !== undefined && 
                        <div className="material-footer-author" onClick={(event) => {
                            event.stopPropagation();

                            navigateTo(`/profile/${material.author_id}`);
                        }}>
                            <img className="material-footer-author__avatar-img" src={AVATAR_URL + material.author.avatar} alt="" />
                            {material.author.username}
                        </div>
                    }
                </div>
                <div className="material-footer-right">
                    <a href={MATERIALS_URL + '/' + material.filename} download={material.name} onClick={(event) => {
                        event.stopPropagation();
                    }}>
                        <div className="material-footer-download">
                            скачать
                            <img className="material-footer-download__img" src="/UserMaterialsPage/download.png" alt="" />
                        </div>
                    </a>
                    <div className="material-footer-share" onClick={(event) => {
                        event.stopPropagation();

                        navigator.clipboard.writeText(`https://skill-sharing.ru/materials/${material.id}`);

                        dispatch(setIsCopied(true));
                    }}>
                        поделиться
                        <img className="material-footer-share__img" src="/UserMaterialsPage/share.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Material;