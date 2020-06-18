import React from "react";
import classes from './Steps.module.css'
import ScrollAnimation from "react-animate-on-scroll";

const List = props => {
    return (
        <div className={classes.Steps}>
            <ol className={classes.List}>
                <ScrollAnimation className={classes.ScrollItem} animateOnce={true} offset={50} animateIn='fadeInLeft'>
                    <li className={classes.Item}>
                        <h2 className={classes.Headline}>Sign Up</h2>
                        <span> Navigate to the registration screen and create a user to track your training.</span>
                    </li>
                </ScrollAnimation>

                <ScrollAnimation className={classes.ScrollItem} animateOnce={true} offset={50} animateIn='fadeInLeft'>
                    <li className={classes.Item}>
                        <h2 className={classes.Headline}>Start training</h2>
                        <span>Every day you have to do one workout.<br/>Just click Start and complete the workout.</span>
                    </li>
                </ScrollAnimation>

                <ScrollAnimation className={classes.ScrollItem} animateOnce={true} offset={50} animateIn='fadeInLeft'>
                    <li className={classes.Item}>
                        <h2 className={classes.Headline}>Only 1 rule</h2>
                        <span>If you did not succeed in the current training, try the same training tomorrow.</span>
                    </li>
                </ScrollAnimation>
            </ol>
        </div>
    )
};

export default List;
