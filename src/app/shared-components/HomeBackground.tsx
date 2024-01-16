import {makeStyles} from "@mui/styles";
import React from "react";

let useStyles = makeStyles((theme) => ({
    box: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1
    }
}));

const HomeBackground = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.box} style={{backgroundImage: `url('assets/images/autunite/${props.img}.jpg')`}}/>
    );
}

export default HomeBackground;