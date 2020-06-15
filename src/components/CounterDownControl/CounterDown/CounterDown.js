import React, {useRef, useState} from "react";
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import classes from './CounterDown.module.css';
import Button from "@material-ui/core/Button";
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
        activeTimer = 670; nonActiveTimer = 670
    }
    console.log();
    const [currentPlay, setCurrentPlay] = useState({1: false, 2: false, 3: false});
    const [isButtonsDisable, setIsButtonsDisable] = useState(false)
    const myRef = useRef([]);

    const onFinishAllTimers = () => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                MySwal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
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

    const onStopTimerButtonHandler = () => {

    }

    return (
        <div className={classes.TimerWrapper}>
            <div>
                <Button disabled={isButtonsDisable} style={{color: "#000", backgroundColor: "#03a9f4"}}
                        variant='contained'
                        onClick={onStartTimerButtonHandler}>Start</Button>
                <Button disabled={isButtonsDisable} style={{color: "#000", backgroundColor: "#b3e5fc"}}
                        variant='contained'
                        onClick={onStopTimerButtonHandler}>Stop</Button>
            </div>
            <div className={classes.Timers}>
                {props.timers.map(item => {
                    return <div key={item.id} ref={ref => myRef.current.push(ref)} className={classes.Counter}>
                        <CountdownCircleTimer
                            isPlaying={currentPlay[item.id]}
                            duration={item.duration}
                            size={currentPlay[item.id] ? activeTimer : nonActiveTimer}
                            colors={[["#0985bf", 0.33], ["#03a9f4", 0.33], ["#b3e5fc"]]}
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
