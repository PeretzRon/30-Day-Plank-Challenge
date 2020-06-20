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
    const [trainingsData, setTrainingsData] = useState([]) // global trainings data
    const [userUnDoneTrainings, setUserUnDoneTrainings] = useState([]) // user unFinished Trainings
    const [userDoneTrainings, SetUserDoneTrainings] = useState([]);  // user finished Trainings
    const [isCounterDown, setIsCounterDown] = useState(false); // show or hide counterDown
    const [selectedTraining, setSelectedTraining] = useState([]);
    const myRef = useRef();
    const starCountRef = firebase.database().ref();


    useEffect(() => {
        // set listener for update in user trainings
        starCountRef.child(`Trainings/${props.userId}/`).on("value", snap => {
            const final = Object.values(Object.values(snap.val())[0])[0];
            const completed = []
            const unCompleted = []
            final.forEach(item => item.isCompleted ? completed.push(item) : unCompleted.push(item));
            setUserUnDoneTrainings(unCompleted)
            SetUserDoneTrainings(completed)

        });

        // get global trainings data from firebase
        starCountRef.child('TrainingsData').once("value", snap => {
            const allTrainings = Object.values(Object.values(snap.val()));
            setTrainingsData(allTrainings);
            window.scrollTo(0, 0);

        });
    }, [props.userId, starCountRef])


    // cleanup listener when the component unmount
    useEffect(() => {
        const unMountFunc = () => {
            starCountRef.child(`Trainings/${props.userId}/`).off('value');
        }
        return () => unMountFunc();
    }, [props.userId, starCountRef])


    const onButtonDoneOrUndoneHandler = (event, id, target = null) => {

        // This function remove from one array and add to second array
        // then update the state of UndoneTraining data and doneTraining.
        const updateUI = (data, id, status, arrayTrainingType, updateStateAfterRemove, updateStateAfterAdd) => {
            const currentTrainingsData = [...data];
            const indexCompleted = currentTrainingsData.findIndex(value => value.id === id);
            const Obj = currentTrainingsData.splice(indexCompleted, 1);
            Obj[0].isCompleted = status;
            const currentTrainings = [...arrayTrainingType];
            currentTrainings.push(Obj[0]);
            currentTrainingsData.sort((a, b) => a.id - b.id);
            updateStateAfterRemove(currentTrainingsData);
            currentTrainings.sort((a, b) => a.id - b.id);
            updateStateAfterAdd(currentTrainings);
        }
        let currentTarget;
        if (event) {
            event.preventDefault();
            currentTarget = event.currentTarget.id
        } else {
            currentTarget = target;
        }

        // update data on firebase
        const updateServer = (status) => {
            firebase.database().ref().child(`Trainings/${props.userId}`).once('value', function (snapshot) {
                const subKey = Object.keys(snapshot.val()).pop();
                firebase.database().ref(`Trainings/${props.userId}/${subKey}`).child('trainingsData').child(id).update({isCompleted: status})
            })
        }

        switch (currentTarget) {
            case 'DONE' :
                updateUI(userUnDoneTrainings, id, true, userDoneTrainings, setUserUnDoneTrainings, SetUserDoneTrainings);
                updateServer(true);
                break;
            case 'UNDONE':
                updateUI(userDoneTrainings, id, false, userUnDoneTrainings, SetUserDoneTrainings, setUserUnDoneTrainings);
                updateServer(false);
                break;
            default:
                break;
        }
    }

    // handle with start training
    const startActionHandler = training => {
        const userSelectedTraining = trainingsData[training.id - 1];
        setSelectedTraining(userSelectedTraining); // update the state for the selected training
        setIsCounterDown(false);
        setTimeout(() => {
            setIsCounterDown(true);
            scrollToRef(myRef);
        }, 100)
    }

    // handle with stop training button
    const onStopTimerButtonHandler = () => {
        window.scrollTo({top: 0, behavior: "smooth"})
        setIsCounterDown(false)
    }

    // handle when training finish (scroll top page, move the training to finish list)
    const onFinishTraining = () => {
        window.scrollTo({top: 0, behavior: "smooth"})
        setIsCounterDown(false)
        onButtonDoneOrUndoneHandler(null, selectedTraining[0].TrainingID, 'DONE')
    };

    let data;
    if ((userUnDoneTrainings.length === 0 && userDoneTrainings.length === 0)) {
        data = <div className={classes.PageHeight}>
            <div className={classes.Center}>
                <CircularProgress size={'10rem'} style={{color: 'rgba(171,210,255,0.78)'}}/>
            </div>
        </div>
    } else {
        data =
            <div className={classes.TrainingsWrapper}>
                <section>
                    <p className={classes.Title}>Active Exercises</p>
                    <TransitionGroup className={classes.Trainings}>
                        {userUnDoneTrainings.map(training => {
                            return <CSSTransition
                                key={training.id}
                                timeout={370}
                                classNames='item'>
                                <Training action={training.name} day={training.id}
                                          isCompleted={training.isCompleted}
                                          duration={training.duration}
                                          startAction={() => startActionHandler(training)}
                                          completed={(event) => onButtonDoneOrUndoneHandler(event, training.id)}/>
                            </CSSTransition>
                        })}
                    </TransitionGroup>
                </section>
                <section>
                    {userDoneTrainings.length !== 0 && <React.Fragment>
                        <p className={classes.Title}>Finished Exercises</p>
                        <TransitionGroup className={classes.Trainings}>
                            {userDoneTrainings.map(training => {
                                return <CSSTransition
                                    key={training.id}
                                    timeout={370}
                                    classNames='item'>
                                    <Training key={training.id} action={training.name} day={training.id}
                                              isCompleted={training.isCompleted}
                                              completed={(event) => onButtonDoneOrUndoneHandler(event, training.id)}/>
                                </CSSTransition>
                            })}
                        </TransitionGroup>
                    </React.Fragment>}
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
        userId: state.auth.userId
    };
};

export default connect(mapStateToProps)(Trainings);
