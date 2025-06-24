import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../app/AppStore';
import {
    finishVoiceMessage,
    setIsPLayingVoiceMessage,
    setSpeed,
    setVolume,
} from '../../app/slices/RecorderSlice';
import './RecorderBar.scss';
import RangeBar from '../../features/RangeBar/RangeBar';

const RecorderBarVolumeRange: React.FC = () => {
    const { volume } = useSelector((state: AppState) => state.recorder);
    const dispatch = useDispatch();

    return (
        <div className="recorder-bar-volume">
            <img className="recorder-bar-volume__img" src="/ChatPage/volume.png" alt="" />
            <RangeBar
                id="volume-range"
                rangeClassName="volume-range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                changeFunc={(event) => {
                    dispatch(setVolume(event.target.value));
                }}
            />
        </div>
    );
};

const RecorderBarSpeedRange: React.FC = () => {
    const { speed } = useSelector((state: AppState) => state.recorder);
    const dispatch = useDispatch();

    return (
        <div className="recorder-bar-speed">
            0.5x
            <RangeBar
                id="speed-range"
                rangeClassName="speed-range"
                min={0.5}
                max={1.5}
                step={0.25}
                value={speed}
                changeFunc={(event) => {
                    dispatch(setSpeed(event.target.value));
                }}
            />
            1.5x
        </div>
    );
};

const RecorderBar: React.FC = () => {
    const { theme } = useSelector((state: AppState) => state.user);
    const { isPlayingMessage } = useSelector((state: AppState) => state.recorder);
    const dispatch = useDispatch();

    return (
        <div className="recorder-field">
            <div className={'recorder-bar' + ` ${theme}-mode__bright-block`}>
                <img
                    className="recorder-bar__toggler"
                    src={'/shared/' + (isPlayingMessage ? 'pause' : 'play-button') + '_white.png'}
                    alt=""
                    onClick={() => {
                        dispatch(setIsPLayingVoiceMessage(!isPlayingMessage));
                    }}
                />
                <RecorderBarVolumeRange />
                <RecorderBarSpeedRange />
                <img
                    className="recorder-bar__close-img"
                    src="/shared/cancel.png"
                    alt=""
                    onClick={() => {
                        dispatch(finishVoiceMessage());
                    }}
                />
            </div>
        </div>
    );
};

export default RecorderBar;
