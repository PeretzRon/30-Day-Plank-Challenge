import React from "react";
import CounterDown from "./CounterDown/CounterDown";
import classes from './CounterDownControl.module.css'


const CounterDownControl = props => {
    return (
        <div className={classes.CounterDownControlWrapper}>
            <div className={classes.HeaderAction}>
                <p>{props.timers.map(elem=> elem.name).join(' + ')}</p>
            </div>
            <div className={classes.CounterDownControl}>
                <CounterDown timers={props.timers}/>
            </div>

        </div>
    )
};

export default CounterDownControl;
