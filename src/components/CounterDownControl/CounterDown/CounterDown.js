import React from "react";
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import classes from './CounterDown.module.css';

const RenderTime = ({remainingTime}) => {
    if (remainingTime === 0) {
        return <div className={classes.Text}>Finish!!</div>;
    }

    return (
        <div className={classes.Timer}>
            <div className={classes.Text}>Remaining</div>
            <div className={classes.Value}>{remainingTime}</div>
            <div className={classes.Text}>seconds</div>
        </div>
    );
};

const counterDown = props => {
    return (
        <CountdownCircleTimer
            isPlaying={props.isPlayed}
            duration={props.duration}
            colors={[["#0985bf", 0.33], ["#03a9f4", 0.33], ["#b3e5fc"]]}
            onComplete={() => console.log("Finish")}
        >
            {RenderTime}
        </CountdownCircleTimer>
    )
}

export default counterDown;