import React from 'react';
// import logo from './logo.svg';
import Layout from "./hoc/Layout/Layout";
import {Route, Switch} from 'react-router-dom';
import Trainings from "./containers/Trainings/Trainings";
import Auth from './containers/Auth/Auth'

function App() {
    return (
        <div>
            <Layout>
                <Switch>
                    <Route path='/auth' component={Auth}/>
                    <Route path="/" component={Trainings}/>
                </Switch>
            </Layout>
        </div>
    );
}

export default App;
