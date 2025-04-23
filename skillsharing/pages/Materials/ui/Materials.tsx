import React from "react";
import MaterialsContent from '../../../widgets/MaterialsContent/MaterialsContent';
import MaterialsHeader from '../../../widgets/MaterialsHeader/MaterialsHeader';
import './Materials.scss'
import { Helmet } from "react-helmet";

const Materials: React.FC = () => {
    return (
        <div className="materials-page">
            <Helmet>
                <title>Учебные материалы</title>
            </Helmet>
            <MaterialsHeader />
            <MaterialsContent />
        </div>
    )
};

export default Materials;