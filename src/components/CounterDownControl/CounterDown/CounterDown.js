import React, {useRef, useState} from "react";
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import classes from './CounterDown.module.css';
import Button from "@material-ui/core/Button";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import soundGong from '../../../resources/sound/harp-strum-sound-effect.mp3';

// That component is for display data inside the counterDown
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

// Scroll to the active Timer
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
    const createObj = {};
    props.timers.forEach((el, index) => createObj[index] = false)
    const [currentPlay, setCurrentPlay] = useState(createObj);
    const myRef = useRef([]);

    const onFinishAllTimers = () => {
        const audio = new Audio(soundGong);
        audio.play(); // play sound
        MySwal.fire({
            title: 'Did you finish successfully?',
            text: `${props.timers.map(elem => elem.name).join(' + ')}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No',
            cancelButtonColor: 'rgba(3,116,253,0.32)',
            reverseButtons: true
        }).then((result) => {
            audio.pause();
            if (result.value) {
                // user press yes
                MySwal.fire({
                        title: 'Well done!',
                        icon: 'success',
                    }
                ).then(() => {
                    props.finishedTraining();
                })
            } else {
                // user press no or any place out from the dialog
                MySwal.fire({
                        title: 'You are great!',
                        text: 'Try tomorrow, you sure will succeed :)',
                        icon: 'info',
                    }
                ).then(() => {
                    props.cancelTraining();
                })
            }
        })
    }

    const onTimerCompletedHandler = (id) => {
        if (id === props.timers.length) {
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
                <Button
                    style={{color: "#000", backgroundColor: "#abd2ff52", border: '1px solid black'}}
                    variant="outlined"
                    className={classes.BtnStart}
                    startIcon={<PlayCircleFilledWhiteOutlinedIcon/>}
                    onClick={onStartTimerButtonHandler}>Start</Button>
                <Button style={{color: "#000", backgroundColor: '#fff', border: '1px solid black'}}
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
                            colors={[["#0985bf", 0.33], ["#03a9f4", 0.33], ["#b3e5fc"]]}
                            onComplete={() => onTimerCompletedHandler(item.id)}>
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
