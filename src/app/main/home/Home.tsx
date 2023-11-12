import React, {useState} from 'react';
import './css/style.css';
import history from './../../../@history';
import Carousel from "react-material-ui-carousel";
import {CircularProgress, Hidden, IconButton, InputAdornment, Paper} from '@mui/material';
import Box from "@mui/material/Box";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {Controller} from "react-hook-form";
import TextField from "@mui/material/TextField";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import themesConfig from "../../configs/themesConfig";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {LoadingButton} from "@mui/lab";
import CoinsReadme from "../dashboard/CoinsReadme";
import {makeStyles} from "@mui/styles";

function Item(props) {
    return (
        <Paper>
            <img src={props.item.imageUrl} className="h-200 w-full rounded-lg"/>
        </Paper>
    )
}

const useStyles = makeStyles((theme) => ({
    community: {
        backgroundImage: 'linear-gradient(to bottom right, black 40%, #6A1B9A)'
    },
    rotateObject: {
        width: 400,
        height: 400,
        transition: "all 50s linear",
        animation: "$rotateObject 50s linear infinite",
        position: "absolute",
    },
    mobileRotateObject: {
        width: 300,
        height: 300,
        transition: "all 50s linear",
        animation: "$rotateObject 50s linear infinite",
        position: "absolute",
    },
    "@keyframes rotateObject": {
        "from": {
            transform: "rotate(0deg)"
        },
        "to": {
            transform: "rotate(360deg)"
        }
    },
    logo: {
        width: 300,
        height: 300
    }
}));

function HomePage(props) {
    const getStartedOnClick = () => {
        history.push('/sign-in');
    };
    const classes = useStyles();
    const [state, setState] = useState({
        sliderItems: [
            {
                "imageUrl": "assets/images/sliders/1.jpg"
            },
            {
                "imageUrl": "assets/images/sliders/2.jpg"
            }
        ]
    });
    return (
        <>
            <div
                className='flex flex-col sm:flex-row items-center content-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0'>
                <Paper style={{borderRadius: 0}}
                       className='auth-page h-full sm:h-auto md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-32 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none'>
                    <div className='w-full max-w-320 sm:w-320 mx-auto sm:mx-0'>
                        <Hidden lgUp>
                            <Box style={{width: 300, height: 300, position: 'absolute', top: -40}}
                                 className="m-auto flex items-center justify-center">
                                <img src='assets/images/logo/coins.png' className={classes.mobileRotateObject}/>
                                <img src="assets/images/logo/logo.png"
                                     style={{
                                         width: 200,
                                         height: 200
                                     }} className={clsx("m-0")}/>
                            </Box>
                        </Hidden>
                        <Hidden lgDown>
                            <img className='w-80' style={{borderRadius: "50%"}} src='assets/images/logo/logo.svg'
                                 alt='logo'/>
                        </Hidden>

                        <div className="form">

                            <div className='flex items-baseline mt-2 font-medium'>
                                <Typography style={{width: '70%'}}
                                            className='title mt-16 text-4xl font-extrabold tracking-tight leading-tight'>
                                    Autunite
                                </Typography>
                            </div>


                            <div className='mt-16 text-2xl font-extrabold tracking-tight leading-tight'>
                                <Carousel>
                                    {
                                        state.sliderItems.map((item, i) => <Item key={i} item={item}/>)
                                    }
                                </Carousel>
                            </div>

                            <div className='items-baseline mt-2 font-medium justify-around'
                                 style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
                                <CoinsReadme/>
                            </div>
                        </div>
                    </div>
                </Paper>

                <Box
                    className={clsx('relative hidden md:flex flex-auto items-center justify-center h-full p-20 lg:px-64 overflow-hidden', classes.community)}
                    sx={{backgroundColor: 'primary.main'}}
                >
                    <div className={clsx('z-10 relative w-full max-w-2xl text-center')}
                         style={{display: "block", position: "fixed", width: "100%", height: "100%", top: 100}}>
                        <Box style={{width: 400, height: 400}} className="m-auto flex items-center justify-center">
                            <img src='assets/images/logo/coins.png' className={classes.rotateObject}/>
                            <img src="assets/images/logo/logo.png" className={clsx("m-0", classes.logo)}/>
                        </Box>
                        <div className='text-7xl font-bold leading-none text-gray-100'>
                            <div style={{fontFamily: "cursive"}}>Welcome to</div>
                            <div style={{fontFamily: "cursive"}}>NFT Autunite Mine</div>
                        </div>
                    </div>
                </Box>

            </div>
        </>
    );
}

export default HomePage;
