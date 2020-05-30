import React, {useState} from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const Layout = props => {
    const isAuth = false;

    return (
        <React.Fragment>
            <Toolbar
                isAuth={isAuth}/>
        </React.Fragment>
    )

};

export default Layout;