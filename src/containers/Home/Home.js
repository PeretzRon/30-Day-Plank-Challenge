import React, {useEffect} from "react";
import classes from './Home.module.css'
import Steps from "./HowItWorks/Steps/Steps";
import Header from "./Header/Header";
import HowItWorks from "./HowItWorks/HowItWorks";
import TrainingTypes from "./TrainingTypes/TrainingTypes";

const Home = props => {
    useEffect(() => {
        window.scrollTo({top: 0});
    }, [])
    return (
        <React.Fragment>
            <Header/>
            <HowItWorks/>
        </React.Fragment>


    )
};

export default Home;
