import React from "react";
import { useNavigate } from "react-router";

const SettingsFooter: React.FC = () => {
    const navigatoTo = useNavigate();

    return (
        <div className="settings-footer">
            <div className="settings-footer-buttons">
                <div className="settings-footer__cancel" onClick={() => navigatoTo(-1)}>
                    Отменить
                </div>
                <div className="settings-footer__save" onClick={() => navigatoTo(-1)}>
                    Сохранить
                </div>
            </div>
        </div>
    );
};

export default SettingsFooter;