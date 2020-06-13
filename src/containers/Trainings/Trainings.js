import React, {useEffect, useRef, useState} from "react";
import Training from "../../components/Training/Training";
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import CircularProgress from "@material-ui/core/CircularProgress";
import {connect} from 'react-redux';
import classes from './Trainings.module.css'
import CounterDownControl from "../../components/CounterDownControl/CounterDownControl";

const scrollToRef = (ref) => window.scrollTo({top: ref.current.offsetTop, behavior: 'smooth'})

const Trainings = props => {
    const [trainingsData, setTrainingsData] = useState([])
    const [trainingsDataCompleted, setTrainingsDataCompleted] = useState([]);
    const [isCounterDown, setIsCounterDown] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState(null);
    const myRef = useRef();
    const starCountRef = firebase.database().ref();

    useEffect(() => {
        starCountRef.child(`Trainings/${props.userId}/`).on("value", function (snap) {
            const final = Object.values(Object.values(snap.val())[0]).pop();
            const completed = []
            const unCompleted = []
            final.forEach(item => item.isCompleted ? completed.push(item) : unCompleted.push(item));
            setTrainingsData(unCompleted)
            setTrainingsDataCompleted(completed)
        });
    }, [props.userId, starCountRef])

    useEffect(() => {
        const unMountFunc = () => {
            starCountRef.child(`Trainings/${props.userId}/`).off('value');
        }
        return () => unMountFunc();
    }, [props.userId, starCountRef])


    const completedHandler = (event, id) => {
        event.preventDefault();

        switch (event.currentTarget.id) {
            case 'DONE' :
                const currentTrainingsData = [...trainingsData];
                const indexCompleted = currentTrainingsData.findIndex(value => value.id === id);
                const Obj = currentTrainingsData.splice(indexCompleted, 1);
                Obj[0].isCompleted = true;
                const currentTrainingsDataCompleted = [...trainingsDataCompleted];
                currentTrainingsDataCompleted.push(Obj[0]);
                currentTrainingsData.sort((a, b) => a.id - b.id);
                setTrainingsData(currentTrainingsData);
                currentTrainingsDataCompleted.sort((a, b) => a.id - b.id);
                setTrainingsDataCompleted(currentTrainingsDataCompleted);

                firebase.database().ref().child(`Trainings/${props.userId}`).once('value', function (snapshot) {
                    const subKey = Object.keys(snapshot.val()).pop();
                    firebase.database().ref(`Trainings/${props.userId}/${subKey}`).child('trainingsData').child(id).update({isCompleted: true})
                });
                break;
            case 'UNDONE':
                const currentTrainingsDataCompleted1 = [...trainingsDataCompleted];
                const index = currentTrainingsDataCompleted1.findIndex(value => value.id === id);
                const Obj1 = currentTrainingsDataCompleted1.splice(index, 1);
                Obj1[0].isCompleted = false;
                const currentTrainingsData1 = [...trainingsData];
                currentTrainingsData1.push(Obj1[0]);
                currentTrainingsData1.sort((a, b) => a.id - b.id);
                currentTrainingsDataCompleted1.sort((a, b) => a.id - b.id);
                console.log(currentTrainingsData1);
                setTrainingsData(currentTrainingsData1);
                setTrainingsDataCompleted(currentTrainingsDataCompleted1);
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
        setSelectedTraining(training);
        setIsCounterDown(false);
        setTimeout(() => {
            setIsCounterDown(true);
            scrollToRef(myRef);
        }, 100)

    }

    let data = null
    if ((trainingsData.length === 0 && trainingsDataCompleted.length === 0)) {
        data = <div className={classes.Center}><CircularProgress size={'10rem'}/></div>
    } else {
        data =
            <div className={classes.TrainingsWrapper}>
                <section>
                    <p className={classes.Title}>Active Exercises</p>
                    <div className={classes.Trainings}>
                        {trainingsData.map(training => {
                            return <Training key={training.id} action={training.name} day={training.id}
                                             isCompleted={training.isCompleted}
                                             duration={training.duration}
                                             startAction={() => startActionHandler(training)}
                                             completed={(event) => completedHandler(event, training.id)}/>
                        })}
                    </div>
                </section>
                <section>
                    <p className={classes.Title}>Finished Exercises</p>
                    <div className={classes.Trainings}>
                        {trainingsDataCompleted.map(training => {
                            return <Training key={training.id} action={training.name} day={training.id}
                                             isCompleted={training.isCompleted}
                                             completed={(event) => completedHandler(event, training.id)}/>
                        })}
                    </div>
                </section>
                {isCounterDown &&
                <div className={classes.CounterDownSection} ref={myRef}>
                    <CounterDownControl actionName={selectedTraining.name} duration={selectedTraining.duration}/>
                </div>}


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