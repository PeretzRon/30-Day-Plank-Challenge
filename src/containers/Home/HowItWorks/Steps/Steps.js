import React from "react";
import classes from './Steps.module.css'

const List = props => {
    return (
        <div className={classes.Steps}>
            <ol className={classes.List}>
                <li className={classes.Item}>
                    <h2 className={classes.Headline}>Sign Up</h2>
                    <span> Navigate to the registration screen and create a user to track your training.</span>
                </li>

                <li className={classes.Item}>
                    <h2 className={classes.Headline}>Start training</h2>
                    <span>Every day you have to do one workout.<br/>Just click Start and complete the workout.</span>
                </li>

                <li className={classes.Item}>
                    <h2 className={classes.Headline}>Only 1 rule</h2>
                    <span>If you did not succeed in the current training, try the same training tomorrow.</span>
                </li>
            </ol>
        </div>
    )
};

export default List;
