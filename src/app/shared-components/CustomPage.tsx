import clsx from "clsx";
import {Typography} from "@mui/material";
import CustomBreadcrumbs from "./CustomBreadcrumbs";
import React from "react";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme: any) => ({
    root: {
        display:"flex",
        flexDirection:"column",
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.background.default,
        boxShadow: theme.shadows[2],
    },
    content:{
        width: '100%',
        height: '100%',
    }
}))
const customPage =(prop)=>{
    const classes = useStyles();
    const {title,content,breadcrumbs} =prop;
    return (
        <div className={clsx(classes.root,"p-20")}>
            <Typography variant="h3" gutterBottom>
                {title}
            </Typography>
            <CustomBreadcrumbs breadcrumbs={breadcrumbs}/>
            <div className={clsx(classes.content,"mt-20")}>
                {content}
            </div>
        </div>
    )
}

export default  customPage;