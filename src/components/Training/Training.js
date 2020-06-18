import React from "react";
// import classes from './Training.module.css'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import DoneIcon from '@material-ui/icons/Done';
import ReplayIcon from '@material-ui/icons/Replay';
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core/styles';
import CardActions from "@material-ui/core/CardActions";

const UseStyles = makeStyles({
    root: {
        width: 330,
        backgroundColor: '#efeff6bf',
        margin: '10px',
        textAlign: 'center',
        border: '1px solid #ccc'
    },
    media: {
        height: 140,
    },
    header: {
        textAlign: 'center',
    },
    day: {
        fontFamily: `"Anton", sans-serif`,
        color: 'gray',
        transform: 'translateY(30px)',
    },
    actionName: {
        fontFamily: `"Lato", sans-serif`,
        fontSize: '1.1rem',
        color: 'black',
        fontWeight: "bold",
        minHeight: '80px',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',

    },
    lineCross: {
        textDecoration: 'line-through',
    },
    headerWrapper: {
        backgroundColor: '#fff',

    }
});

const training = props => {
    // const classesStyleDoneBtn = UseStylesDoneBtn();
    // const classesStyleStartBtn = UseStylesStartBtn();
    const classes = UseStyles();

    // const styleTraining = [classes.Training];
    let isCompletedStyle = ""
    if (props.isCompleted) {
        // styleTraining.push(classes.lineCross);
        isCompletedStyle = classes.lineCross;
    }


    let title = null
    if (props.action) {
        title = <p className={[classes.actionName, isCompletedStyle].join(' ')}>{props.action}</p>
    }

    return (
        <Card className={classes.root}>
            <CardActionArea className={classes.headerWrapper}>
                <CardContent className={classes.header}>
                    <Typography className={[classes.day, isCompletedStyle].join(' ')} gutterBottom variant="h3"
                                component="h2">
                        Day {props.day}
                    </Typography>
                </CardContent>
                <CardContent>
                    {/*<Typography gutterBottom variant="h5" component="h2">*/}
                    {/*   */}
                    {/*</Typography>*/}
                    <Typography variant="body2"
                                color="textSecondary" component="div">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{height: '40px'}}>
                <Button startIcon={props.isCompleted ? <ReplayIcon/> : <DoneIcon/>}
                        id={props.isCompleted ? 'UNDONE' : 'DONE'}
                        onClick={props.completed}
                        style={{color: '#000', border: '1px solid #000'}}
                        variant="outlined"
                        size="small"
                        color="primary">
                    {props.isCompleted ? 'UNDONE' : 'DONE'}
                </Button>
                {!props.isCompleted && <Button
                    style={{color: '#000', border: '1px solid #000'}}
                    startIcon={<PlayArrowIcon/>}
                    onClick={props.startAction}
                    variant="outlined"
                    size="small"
                    color="primary">
                    Start
                </Button>}
            </CardActions>
        </Card>
    )
}

export default training;
