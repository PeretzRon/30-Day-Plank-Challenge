import React from 'react';
import logo from './logo.svg';
import Layout from "./hoc/Layout/Layout";
import {Route} from 'react-router-dom';
import Trainings from "./containers/Trainings/Trainings";

function App() {
  return (
    <div>
      <Layout>
        <Route path="/" component={Trainings}/>
      </Layout>
    </div>
  );
}

export default App;
