import React from "react";
import classes from './Header.module.css'

const Header = props => {

    return (
        <section>
            <div className={classes.Header}>
                <div className={classes.TextBox}>
                    <h1 className={classes.HeadingPrimary}>
                            <span className={classes.HeadingPrimaryMain}>The <br/> <span
                                className={classes.HeadingPrimaryDay}>30-Days</span> <br/> Plank Challenge</span>
                        <span className={classes.HeadingPrimarySub}>Do Sport, Be Strong!</span>
                    </h1>
                </div>
            </div>
        </section>
    )

};

export default Header
