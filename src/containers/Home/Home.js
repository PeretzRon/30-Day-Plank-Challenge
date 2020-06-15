import React from "react";
import classes from './Home.module.css'

const Home = props => {
    return (
       <div className={classes.Header}>
           <div className={classes.TextBox}>
               <h1 className={classes.HeadingPrimary}>
                   <span className={classes.HeadingPrimaryMain}>The <span className={classes.HeadingPrimaryDay}>30-Days</span> Plank Challenge</span>
                   <span className={classes.HeadingPrimarySub}>Do Sport, Be Strong!</span>
               </h1>
           </div>
       </div>
    )
};

export default Home;
