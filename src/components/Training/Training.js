import React from "react";
import classes from './Training.module.css'

const training = props => {
    const style = [classes.Action];
    if (props.isCompleted) {
        style.push(classes.Completed);
    }
    return (
        <div className={classes.Training}>
            <div className={classes.Day}>
                {props.day}
            </div>
            <div className={style.join(" ")}>
                <h4>{props.action}</h4>
                <button onClick={props.completed}>Complete</button>
            </div>
        </div>

    )
}

export default training;