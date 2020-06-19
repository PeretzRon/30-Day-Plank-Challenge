import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SportsHandballOutlinedIcon from '@material-ui/icons/SportsHandballOutlined';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact> <HomeOutlinedIcon className={classes.Icon}/>Home</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/trainings"> <SportsHandballOutlinedIcon
            className={classes.Icon}/>Trainings</NavigationItem> : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth"> <LockOutlinedIcon className={classes.Icon}/>Login</NavigationItem>
            : <NavigationItem link="/logout"> <LockOpenOutlinedIcon className={classes.Icon}/>Logout</NavigationItem>}
    </ul>
);

export default navigationItems;
