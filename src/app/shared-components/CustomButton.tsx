import {Button} from "@mui/material";
import React from "react";
import {makeStyles} from "@mui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "2px 2px 2px rgba(0,0,0,0.2)",
        transition: "all .3s",
        "&:before": {
            content: '',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "0%",
            height: "100%",
            transition: "all .3s",
            zIndex: -1,
        }
    },
    mainColor: {
        "&:hover": {
            "&:after": {
                backgroundColor: 'black',
                color: 'rgb(25, 251, 155)',
                "& svg": {
                    color: 'black'
                }
            },
            "&:before": {
                backgroundColor: 'rgb(25, 251, 155)',
                color: 'black',
                "& svg": {
                    color: 'black'
                }
            },
            boxShadow: "2px 2px 2px rgba(0,0,0,0.2)",
        },
    },
    secondaryColor: {
        backgroundColor: '#6A1B9A',
        color: 'white',
        "&:after": {
            content: '',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -2
        },
        "&:hover": {
            "&:after": {
                backgroundColor: 'black',
                color: 'rgb(25, 251, 155)',
                "& svg": {
                    color: 'black'
                }
            },
            "&:before": {
                backgroundColor: 'rgb(25, 251, 155)',
                color: 'black',
                "& svg": {
                    color: 'black'
                },
                width: "100%"
            },
            boxShadow: "2px 2px 2px rgba(0,0,0,0.2)",
        },
    }
}));

const CustomButton = (props) => {
    const classes = useStyles();

    return (
        <Button
            variant='contained'
            type='button'
            size={'small'}
            className={clsx(classes.button, props.color === 'main' ? classes.mainColor : classes.secondaryColor)}
            {...props}
        >
            {props.children}
        </Button>
    );
}

export default CustomButton;