import React from 'react';
import MaterialsContent from '../../../widgets/MaterialsContent/MaterialsContent';
import MaterialsHeader from '../../../widgets/MaterialsHeader/MaterialsHeader';
import './Materials.scss';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { AppState } from '../../../app/AppStore';

const Materials: React.FC = () => {
    const { theme } = useSelector((state: AppState) => state.user);

    return (
        <div
            className={'materials-page' + (theme === 'light' ? '' : ` ${theme}-mode__bright-text`)}
        >
            <Helmet>
                <title>Учебные материалы</title>
            </Helmet>
            <MaterialsHeader />
            <MaterialsContent />
        </div>
    );
};

export default Materials;
