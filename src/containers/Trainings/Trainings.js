import React, {useEffect, useRef, useState} from "react";
import Training from "../../components/Training/Training";
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import CircularProgress from "@material-ui/core/CircularProgress";
import {connect} from 'react-redux';
import classes from './Trainings.module.css'
import CounterDownControl from "../../components/CounterDownControl/CounterDownControl";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import '../../Effects.css'


const scrollToRef = (ref) => {
    ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
    });
}

const Trainings = props => {
    const [trainingsData, setTrainingsData] = useState([])
    const [userUnDoneTrainings, setUserUnDoneTrainings] = useState([])
    const [userDoneTrainings, SetUserDoneTrainings] = useState([]);
    const [isCounterDown, setIsCounterDown] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState([]);
    const myRef = useRef();
    const starCountRef = firebase.database().ref();


    useEffect(() => {
        starCountRef.child(`Trainings/${props.userId}/`).on("value", snap => {
            const final = Object.values(Object.values(snap.val())[0])[0];
            const completed = []
            const unCompleted = []
            final.forEach(item => item.isCompleted ? completed.push(item) : unCompleted.push(item));
            setUserUnDoneTrainings(unCompleted)
            SetUserDoneTrainings(completed)

        });

        starCountRef.child('TrainingsData').once("value", snap => {
            const allTrainings = Object.values(Object.values(snap.val()));
            setTrainingsData(allTrainings);
            window.scrollTo(0, 0);

        });
    }, [props.userId, starCountRef])


    useEffect(() => {
        const unMountFunc = () => {
            starCountRef.child(`Trainings/${props.userId}/`).off('value');
        }
        return () => unMountFunc();
    }, [props.userId, starCountRef])

    const completedHandler = (event, id, target = null) => {
        let currentTarget;
        if (event) {
            event.preventDefault();
            currentTarget = event.currentTarget.id
        } else {
            currentTarget = target;
        }

        switch (currentTarget) {
            case 'DONE' :
                const currentTrainingsData = [...userUnDoneTrainings];
                const indexCompleted = currentTrainingsData.findIndex(value => value.id === id);
                const Obj = currentTrainingsData.splice(indexCompleted, 1);
                Obj[0].isCompleted = true;
                const currentTrainingsDataCompleted = [...userDoneTrainings];
                currentTrainingsDataCompleted.push(Obj[0]);
                currentTrainingsData.sort((a, b) => a.id - b.id);
                setUserUnDoneTrainings(currentTrainingsData);
                currentTrainingsDataCompleted.sort((a, b) => a.id - b.id);
                SetUserDoneTrainings(currentTrainingsDataCompleted);

                firebase.database().ref().child(`Trainings/${props.userId}`).once('value', function (snapshot) {
                    const subKey = Object.keys(snapshot.val()).pop();
                    firebase.database().ref(`Trainings/${props.userId}/${subKey}`).child('trainingsData').child(id).update({isCompleted: true})
                });
                break;
            case 'UNDONE':
                const currentTrainingsDataCompleted1 = [...userDoneTrainings];
                const index = currentTrainingsDataCompleted1.findIndex(value => value.id === id);
                const Obj1 = currentTrainingsDataCompleted1.splice(index, 1);
                Obj1[0].isCompleted = false;
                const currentTrainingsData1 = [...userUnDoneTrainings];
                currentTrainingsData1.push(Obj1[0]);
                currentTrainingsData1.sort((a, b) => a.id - b.id);
                currentTrainingsDataCompleted1.sort((a, b) => a.id - b.id);
                setUserUnDoneTrainings(currentTrainingsData1);
                SetUserDoneTrainings(currentTrainingsDataCompleted1);
                firebase.database().ref().child(`Trainings/${props.userId}`).once('value', function (snapshot) {
                    const subKey = Object.keys(snapshot.val()).pop();
                    firebase.database().ref(`Trainings/${props.userId}/${subKey}`).child('trainingsData').child(id).update({isCompleted: false})
                });
                break;
            default:
                break;
        }
    }

    const startActionHandler = training => {
        const userSelectedTraining = trainingsData[training.id - 1];
        setSelectedTraining(userSelectedTraining);
        setIsCounterDown(false);
        setTimeout(() => {
            setIsCounterDown(true);
            scrollToRef(myRef);
        }, 100)
    }

    const onStopTimerButtonHandler = () => {
        window.scrollTo({top: 0, behavior: "smooth"})
        setIsCounterDown(false)
    }

    const onFinishTraining = () => {
        window.scrollTo({top: 0, behavior: "smooth"})
        setIsCounterDown(false)
        completedHandler(null, selectedTraining[0].TrainingID, 'DONE')
    };

    let data = null
    if ((userUnDoneTrainings.length === 0 && userDoneTrainings.length === 0)) {
        data = <div className={classes.PageHeight}>
            <div className={classes.Center}>
                <CircularProgress size={'10rem'} style={{color: '#ac9e9e'}} />
            </div>
        </div>
    } else {
        data =
            <div className={classes.TrainingsWrapper}>
                <section>
                    <p className={classes.Title}>Active Exercises</p>
                    <TransitionGroup className={classes.Trainings}>
                        {userUnDoneTrainings.slice(0,10).map(training => {
                            return <CSSTransition
                                key={training.id}
                                timeout={370}
                                classNames='item'>
                                <Training action={training.name} day={training.id}
                                          isCompleted={training.isCompleted}
                                          duration={training.duration}
                                          startAction={() => startActionHandler(training)}
                                          completed={(event) => completedHandler(event, training.id)}/>
                            </CSSTransition>
                        })}
                    </TransitionGroup>
                </section>
                <section>
                    <p className={classes.Title}>Finished Exercises</p>
                    <TransitionGroup className={classes.Trainings}>
                        {userDoneTrainings.map(training => {
                            return <CSSTransition
                                key={training.id}
                                timeout={370}
                                classNames='item'>
                                <Training key={training.id} action={training.name} day={training.id}
                                          isCompleted={training.isCompleted}
                                          completed={(event) => completedHandler(event, training.id)}/>
                            </CSSTransition>
                        })}
                    </TransitionGroup>
                </section>
                {isCounterDown &&
                <div ref={myRef} className={classes.CounterDownSection}>
                    <CounterDownControl finishedTraining={onFinishTraining} cancelTraining={onStopTimerButtonHandler}
                                        timers={selectedTraining}/>
                </div>
                }
            </div>
    }

    return (
        <div>
            {data}
        </div>

    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

export default connect(mapStateToProps)(Trainings);
