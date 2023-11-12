import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import CustomFontAwesomeIcon from "./CustomFontAwesomeIcon";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

import React, {useEffect, useState} from "react";

const CustomWaiting =({open,message})=>{

    const [state,setState]=useState({
        open:open,
        message:message ? message :"Please wait!"
    })

    useEffect(()=>{
        setState({
            ...state,
            open:open,
            message: message ? message : "Please wait!"
        })
    },[open,message])


    return(
        <Dialog
            open={state.open}
            onClose={()=>{}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {state.message}
            </DialogTitle>
            <DialogContent className={"text-center"}>
                <CustomFontAwesomeIcon
                    color={'green'}
                    icon={faSpinner}
                    fontSize={48}
                    spin={true}
                />
            </DialogContent>
        </Dialog>
    )
}


export default CustomWaiting
