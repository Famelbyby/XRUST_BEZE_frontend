import React from "react";
import './RangeBar.scss'

export interface RangeBarPropTypes {
    id: string,
    min: number,
    max: number,
    step: number,
    changeFunc: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: number,
    width: number,
}

const RangeBar: React.FC<RangeBarPropTypes> = ({width, id, min, max, step, changeFunc, value}) => {
    return (
        <input id={id} style={{width, backgroundSize: `${(value - min) / (max - min) * 100}% 100%`}} type='range' min={min} max={max} value={value} step={step} className="range-bar" onChange={changeFunc}/>
    )
};

export default RangeBar;