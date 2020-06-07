import React, {useEffect, useState} from "react";
import Training from "../../components/Training/Training";
import * as firebase from "firebase";

const Trainings = props => {
    const [trainingsData, setTrainingsData] = useState([
        {id: 1, name: '60 Sec Plank', isCompleted: false},
        {id: 2, name: '70 Sec Plank', isCompleted: false}
    ])


    const [trainingsDataCompleted, setTrainingsDataCompleted] = useState([])

    const completedHandler = (event, id) => {
        event.preventDefault();
        const currentTrainingsData = [...trainingsData];
        const indexCompleted = currentTrainingsData.findIndex(value => value.id === id);
        const Obj = currentTrainingsData.splice(indexCompleted, 1);
        Obj[0].isCompleted = true;
        const currentTrainingsDataCompleted = [...trainingsDataCompleted];
        currentTrainingsDataCompleted.push(Obj[0]);
        setTrainingsData(currentTrainingsData);
        setTrainingsDataCompleted(currentTrainingsDataCompleted);

    }

    return (
        <React.Fragment>
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
        </React.Fragment>
    )

}

export default Trainings;