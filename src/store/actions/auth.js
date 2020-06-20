import {trainingsData} from "../../Config/Config";
import * as actionTypes from './actionTypes';
import firebase from 'firebase/app';
import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2";
import {ErrorCodeFirebase} from "../../Error/Error";


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

const onSuccessfulAuth = (dispatch, data) => {
    const currentDate = new Date();
    const expireDate = currentDate.setHours(currentDate.getHours() + 48)
    localStorage.setItem('token', data.user.xa);
    localStorage.setItem('expirationDate', new Date(expireDate));
    localStorage.setItem('userId', data.user.uid);
    dispatch(authSuccess(data.user.xa, data.user.uid));
    dispatch(checkAuthTimeout(3600 * 48));
};

const massageAfterSignUp = (dispatch, data, firstName, lastName) => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        title: `Welcome ${firstName} ${lastName}`,
        text: `Your user created successfully`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Continue'
    }).then((result) => {
        onSuccessfulAuth(dispatch, data)
    })
}
const massageAuthError = (errorCode) => {
    const MySwal = withReactContent(Swal)
    const error = ErrorCodeFirebase[errorCode]
    MySwal.fire({
        title: `Oops...`,
        text: `${error ? error : "Unknown error"}`,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Try Again'
    })
}


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

export const auth = (inputFieldsData, isSignUp) => {
    const userDetails = {
        email: inputFieldsData.email.trim(),
        firstName: inputFieldsData.firstName.trim(),
        lastName: inputFieldsData.lastName.trim()
    }
    return dispatch => {
        dispatch(authStart());
        if (isSignUp) {
            firebase.auth().createUserWithEmailAndPassword(userDetails.email, inputFieldsData.password)
                .then(firebaseUser => {
                    firebase.database().ref('Users/' + firebaseUser.user.uid).set(userDetails);
                    firebase.database().ref('Trainings/' + firebaseUser.user.uid).push(
                        {trainingsData}
                    );
                    massageAfterSignUp(dispatch, firebaseUser, inputFieldsData.firstName, inputFieldsData.lastName);
                })
                .catch(error => {
                    dispatch(authFail(error.message));
                    massageAuthError(error.code);
                });
        } else {
            firebase.auth().signInWithEmailAndPassword(userDetails.email, inputFieldsData.password)
                .then(firebaseUser => {
                    onSuccessfulAuth(dispatch, firebaseUser)
                })
                .catch(function (error) {
                    dispatch(authFail(error.message));
                    massageAuthError(error.code);
                });
        }
    };
};


