import React from "react";
import classes from './HowItWorks.module.css';
import Steps from "./Steps/Steps";
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

const HowItWorks = props => {
    return (
        <section className={classes.HowItWorksSection}>
            <div>
                <ScrollAnimation duration={0.5} animateOnce={true} offset={500} animateIn='fadeInDown'
                >
                    <div className={classes.SectionHeader}>
                        <h1>HOW IT WORKS <br/> <span className={classes.Simple}>SIMPLE AS 1, 2, 3</span></h1>
                    </div>
                </ScrollAnimation>

                <Steps/>
            </div>
        </section>
    )
};

export default HowItWorks;
