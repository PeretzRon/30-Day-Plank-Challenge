import React, {useState} from "react";
import CounterDown from "./CounterDown/CounterDown";
import classes from './CounterDownControl.module.css'
import Button from "@material-ui/core/Button";

const CounterDownControl = props => {
    const [isPlay, setIsPlay] = useState(false);

    const onStartTimerButtonHandler = () => {
        setIsPlay(true);
    }

    const onStopTimerButtonHandler = () =>{
        setIsPlay(false)
    }


    return (
        <div className={classes.CounterDownControlWrapper}>
            <div>
                <h3>{props.actionName}</h3>
            </div>
            <div className={classes.CounterDownControl}>
                <CounterDown duration={props.duration} isPlayed={isPlay}/>
            </div>
            <Button style={{ color: "#000", backgroundColor: "#03a9f4"}} variant='contained' onClick={onStartTimerButtonHandler}>Start</Button>
            <Button style={{ color: "#000", backgroundColor: "#b3e5fc"}} variant='contained' onClick={onStopTimerButtonHandler}>Stop</Button>
        </div>
    )
};

export default CounterDownControl;