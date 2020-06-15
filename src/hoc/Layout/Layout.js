import React, {useState} from "react";
import classes from './Layout.module.css'
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from 'react-redux';

const Layout = props => {
    const [showSideDrawer, setsShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setsShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setsShowSideDrawer(!showSideDrawer);
    }

    return (
        <React.Fragment>
            <div className={classes.Content}>
                <Toolbar
                    isAuth={props.isAuthenticated}
                    drawerToggleClicked={sideDrawerToggleHandler}/>
                <SideDrawer
                    isAuth={props.isAuthenticated}
                    open={showSideDrawer}
                    closed={sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {props.children}
                </main>
            </div>
        </React.Fragment>
    )
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);
