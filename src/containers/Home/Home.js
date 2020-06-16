import React, {useEffect} from "react";
import classes from './Home.module.css'

const Home = props => {
    useEffect(() => {
        window.scrollTo({top: 0});
    }, [])
    return (
        <React.Fragment>
            <section>
                <div className={classes.Header}>
                    <div className={classes.TextBox}>
                        <h1 className={classes.HeadingPrimary}>
                            <span className={classes.HeadingPrimaryMain}>The <span
                                className={classes.HeadingPrimaryDay}>30-Days</span> Plank Challenge</span>
                            <span className={classes.HeadingPrimarySub}>Do Sport, Be Strong!</span>
                        </h1>
                    </div>
                </div>
            </section>
            <section style={{height: '700px', backgroundColor: 'rgba(241,234,234,0.8)', marginTop: '-30vh'}}>

            </section>
        </React.Fragment>


    )
};

export default Home;
