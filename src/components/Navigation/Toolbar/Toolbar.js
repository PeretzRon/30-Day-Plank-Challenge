import React from 'react';

import classes from './Toolbar.module.css';
// import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import {withRouter} from 'react-router-dom';

const toolbar = (props) => {

    const onLogoClickHandler = () => {
        if (props.location.pathname !== '/') {
            props.history.push('/')
        }
    };
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
            <div className={classes.Logo}>
                <img onClick={onLogoClickHandler} className={classes.Logo}
                     src={require('../../../resources/img/logo-black-outline.png')} alt='logo'/>
            </div>
        </header>
    )

}

export default withRouter(toolbar);
