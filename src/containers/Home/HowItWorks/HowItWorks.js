import React from "react";
import classes from './HowItWorks.module.css';
import Steps from "./Steps/Steps";

const HowItWorks = props => {
    return (
        <section className={classes.HowItWorksSection}>
            <div>
                <div className={classes.SectionHeader}>
                    <h1>HOW IT WORKS <br/> <span className={classes.Simple}>SIMPLE AS 1, 2, 3</span></h1>
                </div>
                <Steps/>
            </div>
        </section>
    )
};

export default HowItWorks;
