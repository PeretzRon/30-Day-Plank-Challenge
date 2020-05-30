import React, {useState} from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = props => {
    const [showSideDrawer, setsShowSideDrawer] = useState(false);
    const isAuth = false;

    const sideDrawerClosedHandler = () => {
        setsShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setsShowSideDrawer(!showSideDrawer);
    }

    return (
        <React.Fragment>
            <Toolbar
                isAuth={isAuth}
                drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer
                isAuth={isAuth}
                open={showSideDrawer}
                closed={sideDrawerClosedHandler}/>
        </React.Fragment>
    )

};

export default Layout;