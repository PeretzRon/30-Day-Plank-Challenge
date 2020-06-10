import React, {useState} from "react";
import CounterDown from "./CounterDown/CounterDown";

const CounterDownControl = props => {
    const [isPlay, setIsPlay] = useState(false);

    const onStartButtonHandler = () => {
        setIsPlay(true);
    }

    return (
        <div>
            <button onClick={onStartButtonHandler}>Start</button>
            <CounterDown duration={props.duration} isPlayed={isPlay}/>
        </div>
    )
};

export default CounterDownControl;