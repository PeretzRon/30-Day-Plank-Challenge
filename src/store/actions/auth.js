import {trainingsData} from "../../Config/Config";
import * as actionTypes from './actionTypes';
import firebase from 'firebase/app';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authSignUpSuccess = (status) => {
    return {
        type: actionTypes.AUTH_SUCCESSFUL_SIGN_UP,
        status: status
    };
};


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, firstName, lastName, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        if (isSignUp) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(firebaseUser => {
                    firebase.database().ref('Users/' + firebaseUser.user.uid).set({
                        userID: firebaseUser.user.uid,
                        firstName: firstName,
                        lastName: lastName,
                        email: email
                    });
                    firebase.database().ref('Trainings/' + firebaseUser.user.uid).push(
                        {trainingsData}
                    );
                    dispatch(authSignUpSuccess(true))
                })
                .catch(error => {
                    dispatch(authFail(error.message));
                });
        } else {
            // TODO: auto direct to trainings after signUp
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(firebaseUser => {
                    try {
                        localStorage.setItem('token', firebaseUser.user.xa);
                        const currentDate = new Date();
                        const expireDate = currentDate.setHours(currentDate.getHours() + 24)
                        localStorage.setItem('expirationDate', new Date(expireDate)); // TODO: get this data from the object
                        localStorage.setItem('userId', firebaseUser.user.uid);
                        dispatch(authSuccess(firebaseUser.user.xa, firebaseUser.user.uid));
                        dispatch(checkAuthTimeout(3600 * 24));
                    } catch (e) {
                        console.log(e);
                    }

                })
                .catch(function (error) {
                    dispatch(authFail(error.message));
                    console.log(error);
                });
        }
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};

