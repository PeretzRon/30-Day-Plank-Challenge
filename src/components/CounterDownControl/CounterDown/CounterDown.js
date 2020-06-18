import React, {useRef, useState} from "react";
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import classes from './CounterDown.module.css';
import Button from "@material-ui/core/Button";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const RenderTime = (type, time) => {

    if (time === 0) {
        return <div className={classes.Timer}>Finish!!</div>;
    }

    return (
        <div className={classes.Timer}>
            <div className={classes.Text}>{type}</div>
            <div className={classes.Value}>{time}</div>
            <div className={classes.Text}>seconds remaining</div>
        </div>
    );
};

const scrollToRef = (ref, i) => {
    const refElement = ref.current[i];
    if (refElement) {
        refElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'start',
        });
    }
}

const CounterDown = props => {
    const MySwal = withReactContent(Swal)
    let activeTimer = window.innerWidth / 1.5;
    let nonActiveTimer = window.innerWidth / 1.5;
    if (activeTimer > 670 || nonActiveTimer > 670) {
        activeTimer = 670;
        nonActiveTimer = 670
    }

    const [currentPlay, setCurrentPlay] = useState({1: false, 2: false, 3: false});
    const [isButtonsDisable, setIsButtonsDisable] = useState(false)
    const myRef = useRef([]);

    const onFinishAllTimers = () => {
        MySwal.fire({
            title: 'Did you finish successfully?',
            text: `${props.timers.map(elem => elem.name).join(' + ')}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                MySwal.fire({
                        title: 'Well done!',
                        icon: 'success',
                    }
                ).then(value => {
                    props.finishedTraining();
                })
            } else {
                MySwal.fire({
                        title: 'You are great!',
                        text: 'Try tomorrow, you sure will succeed :)',
                        icon: 'info',
                    }
                ).then(value => {
                 props.cancelTraining();
                })
            }
        })
    }

    const onTimerCompletedHandler = (id) => {
        if (id === props.timers.length) {
            setIsButtonsDisable(true)
            onFinishAllTimers();
            return;
        }
        scrollToRef(myRef, id);
        const currentState = {...currentPlay};
        currentState[id] = false;
        currentState[id + 1] = true;
        setCurrentPlay(currentState);
    }

    const onStartTimerButtonHandler = () => {
        onTimerCompletedHandler(0);
    }

    return (
        <div className={classes.TimerWrapper}>
            <div>
                <Button disabled={isButtonsDisable} style={{color: "#000", backgroundColor: "#dbdfe2"}}
                        variant="outlined"
                        startIcon={<PlayCircleFilledWhiteOutlinedIcon/>}
                        onClick={onStartTimerButtonHandler}>Start</Button>
                <Button disabled={isButtonsDisable} style={{color: "#000", backgroundColor: "#dbdfe2"}}
                        variant="outlined"
                        startIcon={<CancelOutlinedIcon/>}
                        onClick={props.cancelTraining}>ABORT!</Button>
            </div>
            <div className={classes.Timers}>
                {props.timers.map(item => {
                    return <div key={item.id} ref={ref => myRef.current.push(ref)} className={classes.Counter}>
                        <CountdownCircleTimer
                            isPlaying={currentPlay[item.id]}
                            duration={item.duration}
                            size={currentPlay[item.id] ? activeTimer : nonActiveTimer}
                            colors={[["#2c5d74", 0.33], ["#1a729c", 0.33], ["#2786b1"]]}
                            onComplete={() => onTimerCompletedHandler(item.id)}
                        >
                            {({remainingTime}) =>
                                RenderTime(item.type, remainingTime)
                            }
                        </CountdownCircleTimer>
                    </div>
                })}
            </div>

        </div>
    )
}

export default CounterDown;
