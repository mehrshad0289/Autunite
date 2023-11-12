import Tooltip from '@mui/material/Tooltip';
import React, {useState} from 'react';
import {withStyles} from "@mui/styles";

const CustomTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
        boxShadow: theme.shadows[1],
        fontSize: 12,
        padding: 10,
        zIndex: 15000
    },
    arrow: {
        color: theme.palette.secondary.main,
    },
}))((props: any) => {
    const [show, setShow] = useState(false);

    return (
        <Tooltip {...props}
                 arrow
                 placement={"top"}
                 open={show}
                 onClick={() => setShow(true)}
                 onMouseEnter={() => setShow(true)}
                 onMouseLeave={() => setShow(false)}
                 children={props.children}
        />
    )
});

export default CustomTooltip;