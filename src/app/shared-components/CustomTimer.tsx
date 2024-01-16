import React from 'react';
import { useTimer } from 'react-timer-hook';
import {makeStyles} from "@mui/styles";

const styles = makeStyles((theme) => ({
    timer: {
        width: 50,
        margin: 5,
    },
    timerValue: {
        backgroundColor: "black",
        width: "100%",
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
        borderRadius: 5,
        color: "rgb(25, 251, 155)"
    }
}));

const CustomTimer = ({ expiryTimestamp }) => {
    const classes = styles();
  const time = new Date(expiryTimestamp);
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp:time, onExpire: () => console.warn('onExpire called') });


  return (
    <div className="flex">
        <div className={classes.timer}>
            <div className={classes.timerValue}>
                <span className="p-2 mx-2">{days}</span>
            </div>
            <div className="text-center">
                <span className="p-2 mx-2">Days</span>
            </div>
        </div>
        <div className={classes.timer}>
            <div className={classes.timerValue}>
                <span className="p-2 mx-2">{hours}</span>
            </div>
            <div className="text-center">
                <span className="p-2 mx-2">Hours</span>
            </div>
        </div>
        <div className={classes.timer}>
            <div className={classes.timerValue}>
                <span className="p-2 mx-2">{minutes}</span>
            </div>
            <div className="text-center">
                <span className="p-2 mx-2">Min</span>
            </div>
        </div>
        <div className={classes.timer}>
            <div className={classes.timerValue}>
                <span className="p-2 mx-2">{seconds}</span>
            </div>
            <div className="text-center">
                <span className="p-2 mx-2">Sec</span>
            </div>
        </div>
    </div>
  );
};

export default CustomTimer;
