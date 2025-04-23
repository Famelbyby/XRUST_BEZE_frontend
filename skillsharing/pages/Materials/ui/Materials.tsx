import React from "react";
import MaterialsContent from '../../../widgets/MaterialsContent/MaterialsContent';
import MaterialsHeader from '../../../widgets/MaterialsHeader/MaterialsHeader';
import './Materials.scss'

const Materials: React.FC = () => {
    return (
        <div className="materials-page">
            <MaterialsHeader />
            <MaterialsContent />
        </div>
    )
};

export default Materials;