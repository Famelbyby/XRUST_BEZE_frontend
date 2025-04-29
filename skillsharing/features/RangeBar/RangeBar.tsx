import React from "react";
import './RangeBar.scss'

export interface RangeBarPropTypes {
    id: string,
    min: number,
    max: number,
    step: number,
    changeFunc: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: number,
    rangeClassName: string,
}

const RangeBar: React.FC<RangeBarPropTypes> = ({rangeClassName, id, min, max, step, changeFunc, value}) => {
    return (
        <input id={id} style={{backgroundSize: `${(value - min) / (max - min) * 100}% 100%`}} type='range' min={min} max={max} value={value} step={step} className={`range-bar ${rangeClassName}`} onChange={changeFunc}/>
    )
};

export default RangeBar;