import React, {useEffect} from 'react';
// import logo from './logo.svg';
import Layout from "./hoc/Layout/Layout";
import {Route, Switch, withRouter} from 'react-router-dom';
import Trainings from "./containers/Trainings/Trainings";
import Auth from './containers/Auth/Auth'
import Home from "./containers/Home/Home";
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import Logout from "./containers/Auth/Logout/Logout";

const App = props => {
    useEffect(() => {
        props.onTryAutoSignup();
    }, [])

    let routes;
    if (props.isAuthenticated) {
        routes = <Switch>
            <Route path='/auth' component={Auth}/>
            <Route path='/trainings' component={Trainings}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/" component={Home}/>
        </Switch>
    } else {
        routes = <Switch>
            <Route path='/auth' component={Auth}/>
            <Route path="/" component={Home}/>
        </Switch>
    }

    return (
        <div>
            <Layout>
                {routes}
            </Layout>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

