import React from "react";
import classes from './Training.module.css'
import Button from "@material-ui/core/Button";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import DoneIcon from '@material-ui/icons/Done';
import ReplayIcon from '@material-ui/icons/Replay';
import makeStyles from "@material-ui/core/styles/makeStyles";

const styleBtn = {

}

const UseStylesDoneBtn = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            color: "#000", backgroundColor: "#b3e5fc",
            height: '70%',
            width: '70%',
            fontSize: 'inherit',
        },
        [theme.breakpoints.up('sm')]: {
            color: "#000", backgroundColor: "#b3e5fc",
        }
    },
}));

const UseStylesStartBtn = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            color: "#000", backgroundColor: "#03a9f4",
            height: '70%',
            width: '70%',
            fontSize: 'inherit',
        },
        [theme.breakpoints.up('sm')]: {
            color: "#000", backgroundColor: "#03a9f4",
        }
    },
}));

const training = props => {
    const classesStyleDoneBtn = UseStylesDoneBtn();
    const classesStyleStartBtn = UseStylesStartBtn();
    const styleTraining = [classes.Training];
    if (props.isCompleted) {
        styleTraining.push(classes.Completed);
    }
    return (
        <div className={styleTraining.join(" ")}>
            <div className={classes.Day}>
                <h1>Day {props.day}</h1>
            </div>
            <div className={classes.Title}>
                <h2>{props.action}</h2>
            </div>
            <div className={classes.Action}>
                <div className={classes.Btn} id={props.isCompleted ? 'UNDONE' : 'DONE'} onClick={props.completed}>
                    <Button
                        className={classesStyleDoneBtn.root}
                        size="medium"
                        variant="contained"
                        startIcon={props.isCompleted ? <ReplayIcon/> : <DoneIcon/>}
                        color="secondary"
                        // style={styleBtn}
                    >
                        {props.isCompleted ? 'UNDONE' : 'DONE'}
                    </Button>
                </div>

                <div className={classes.Btn}>
                    {!props.isCompleted && <Button className={classesStyleStartBtn.root}
                        onClick={props.startAction}
                        // style={}
                        variant="contained"
                        color="primary"
                        size="medium"
                        startIcon={<PlayArrowIcon/>}
                    >
                        START!
                    </Button>}
                </div>
            </div>
        </div>

    )
}

export default training;