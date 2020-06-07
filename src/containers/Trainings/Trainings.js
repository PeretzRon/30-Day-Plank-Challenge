import React, {useEffect, useState} from "react";
import Training from "../../components/Training/Training";
import * as firebase from "firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import {connect} from 'react-redux';

const Trainings = props => {
    const [trainingsData, setTrainingsData] = useState([])
    const [trainingsDataCompleted, setTrainingsDataCompleted] = useState([])


    useEffect(() => {
        const data = firebase.database().ref('Trainings/FOy4vfOn8taHYinSQtTk5hTU0nD3/').once("value", function (snap) {
            const final = Object.values(Object.values(snap.val())[0]).pop();
            const completed = []
            const unCompleted = []
            final.forEach(item => item.isCompleted ? completed.push(item) : unCompleted.push(item));
            setTrainingsData(unCompleted)
            setTrainingsDataCompleted(completed)
        });
    }, [])


    const completedHandler = (event, id) => {
        event.preventDefault();
        switch (event.target.id) {
            case 'Completed' :
                const currentTrainingsData = [...trainingsData];
                const indexCompleted = currentTrainingsData.findIndex(value => value.id === id);
                const Obj = currentTrainingsData.splice(indexCompleted, 1);
                Obj[0].isCompleted = true;
                const currentTrainingsDataCompleted = [...trainingsDataCompleted];
                currentTrainingsDataCompleted.push(Obj[0]);
                setTrainingsData(currentTrainingsData);
                setTrainingsDataCompleted(currentTrainingsDataCompleted);
                firebase.database().ref('Trainings/FOy4vfOn8taHYinSQtTk5hTU0nD3/').child("-M9AWZvnIJqGe6GjOfoM").child('trainingsData').child(id).update({isCompleted: true})
                break;
            case 'UnCompleted':
                const currentTrainingsDataCompleted1 = [...trainingsDataCompleted];
                const index = currentTrainingsDataCompleted1.findIndex(value => value.id === id);
                const Obj1 = currentTrainingsDataCompleted1.splice(index, 1);
                Obj1[0].isCompleted = false;
                const currentTrainingsData1 = [...trainingsData];
                currentTrainingsData1.push(Obj1[0]);
                setTrainingsData(currentTrainingsData1);
                setTrainingsDataCompleted(currentTrainingsDataCompleted1);
                firebase.database().ref('Trainings/FOy4vfOn8taHYinSQtTk5hTU0nD3/').child("-M9AWZvnIJqGe6GjOfoM").child('trainingsData').child(id).update({isCompleted: false})
                break;
        }


    }

    let data = null
    if (trainingsData.length === 0 && trainingsDataCompleted.length === 0) {
        data = <CircularProgress/>
    } else {
        data =
            <div>
                <section>
                    <h1>UnCompeted</h1>
                    {trainingsData.map((training, index) => {
                        return <Training key={training.id} action={training.name} day={training.id}
                                         isCompleted={training.isCompleted}
                                         completed={(event) => completedHandler(event, training.id)}/>
                    })}

                </section>
                <section>
                    <h1>Completed</h1>
                    {trainingsDataCompleted.map((training, index) => {
                        return <Training key={training.id} action={training.name} day={training.id}
                                         isCompleted={training.isCompleted}
                                         completed={(event) => completedHandler(event, training.id)}/>
                    })}
                </section>
            </div>
    }


    return (
        <React.Fragment>
            {data}
        </React.Fragment>
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