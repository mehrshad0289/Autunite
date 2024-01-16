import React from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard/src';
import Button from '@mui/material/Button';
import {faCopy} from '@fortawesome/free-solid-svg-icons';
import CustomFontAwesomeIcon from './CustomFontAwesomeIcon';
import {showMessage} from "../store/fuse/messageSlice";
import {useDispatch} from 'react-redux';
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    copyButton: {
        backgroundColor: 'black',
        color: 'rgb(25, 251, 155)',
        width: 40,
        minWidth: 40,
        height: 40,
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "2px 2px 2px rgba(0,0,0,0.2)",
        "&:hover": {
            backgroundColor: 'rgb(25, 251, 155)',
            color: 'black',
            boxShadow: "2px 2px 2px rgba(0,0,0,0.2)",
            "& svg": {
                color: 'black'
            }
        }
    },
}));

const CustomCopyToClipboard = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const copyOnSuccess = () => {
        dispatch(showMessage({
            message: 'copied to clipboard',
            variant: 'success',
        }));
    };

    console.log(props);

    return (
        <div className={"flex items-center justify-around p-5"}>
            <CopyToClipboard className={"p-5 mr-5"}
                text={props.link}
                onCopy={copyOnSuccess}>
                <span>{props.text} </span>
            </CopyToClipboard>
            <CopyToClipboard text={props.link} onCopy={copyOnSuccess}>
                <CustomFontAwesomeIcon
                    color={'black'}
                    icon={faCopy}
                />
                {/*<Button
                    variant='contained'
                    color='secondary'
                    aria-label='Copy to clipboard'
                    type='button'
                    // endIcon={}
                    size={'small'}
                    className={classes.copyButton}
                >

                </Button>*/}
            </CopyToClipboard>

        </div>
    )
}

export default CustomCopyToClipboard;
