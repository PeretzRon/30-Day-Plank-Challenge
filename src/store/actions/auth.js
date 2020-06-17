import {trainingsData} from "../../Config/Config";
import * as actionTypes from './actionTypes';
import firebase from 'firebase/app';
import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2";


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

export const authSignUpChangeStatus = (status) => {
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
const massageAuthError = () => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        title: `Oops...`,
        text: `Something went wrong!`,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Try Again'
    })
}



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

export const auth = (email, password, firstName, lastName, isSignUp) => {
    const userDetails = {
        email: email.trim(),
        password: password,
        firstName: firstName.trim(),
        lastName: lastName.trim()
    }
    return dispatch => {
        dispatch(authStart());
        if (isSignUp) {
            firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
                .then(firebaseUser => {
                    firebase.database().ref('Users/' + firebaseUser.user.uid).set(userDetails);
                    firebase.database().ref('Trainings/' + firebaseUser.user.uid).push(
                        {trainingsData}
                    );
                    massageAfterSignUp(dispatch, firebaseUser, firstName, lastName);
                })
                .catch(error => {
                    dispatch(authFail(error.message));
                    massageAuthError();
                });
        } else {
            firebase.auth().signInWithEmailAndPassword(userDetails.email, userDetails.password)
                .then(firebaseUser => {
                    onSuccessfulAuth(dispatch, firebaseUser)
                })
                .catch(function (error) {
                    dispatch(authFail(error.message));
                    massageAuthError();
                });
        }
    };
};


