import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import authReducer from './store/reducers/auth';
import firebase from 'firebase/app';
import {fireBaseKey} from "./Config/Config";


const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;


const config = {
    apiKey: fireBaseKey,
    databaseURL: "https://days-plank-challenge.firebaseio.com/",

};

firebase.initializeApp(config);

const rootReducer = combineReducers({
    auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

// const store = createStore(rootReducer,
//     applyMiddleware(thunk)
// );

const app = (
    <Provider store={store}>
        <BrowserRouter>
                <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
