import React, {useEffect} from "react";
import Header from "./Header/Header";
import HowItWorks from "./HowItWorks/HowItWorks";

const Home = props => {
    window.scrollTo({top: 0});
    return (
        <React.Fragment>
            <Header/>
            <HowItWorks/>
        </React.Fragment>


    )
};

export default Home;
