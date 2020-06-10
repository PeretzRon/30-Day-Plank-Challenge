import React, {useState} from "react";
import CounterDown from "./CounterDown/CounterDown";
import classes from './CounterDownControl.module.css'

const CounterDownControl = props => {
    const [isPlay, setIsPlay] = useState(false);

    const onStartButtonHandler = () => {
        setIsPlay(true);
    }

    return (
        <div className={classes.CounterDownControlWrapper}>
            <div className={classes.CounterDownControl}>
                <CounterDown duration={props.duration} isPlayed={isPlay}/>
            </div>
            <button onClick={onStartButtonHandler}>Start</button>
        </div>
    )
};

export default CounterDownControl;