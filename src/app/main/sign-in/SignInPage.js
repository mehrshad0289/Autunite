import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {Link, useSearchParams} from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import jwtService from '../../auth/services/jwtService';
import {setNavigation} from '../../store/fuse/navigationSlice';
import {useDispatch} from 'react-redux';
import {showMessage} from '../../store/fuse/messageSlice';
import history from '@history';
import {LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha} from 'react-simple-captcha';
import React, {useEffect, useState} from 'react';
import themesConfig from '../../configs/themesConfig';
import {makeStyles} from "@mui/styles";
import clsx from "clsx";
import {CircularProgress, Hidden, IconButton, InputAdornment} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import CoinsReadme from "../dashboard/CoinsReadme";
import {LoadingButton} from "@mui/lab";


/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    email: yup.string().email('You must enter a valid email').required('You must enter a username'),
    captcha: yup.string().required('You must enter captcha'),
    password: yup
        .string()
        .required('Please enter your password.')
        .min(3, 'Password is too short - must be at least 3 chars.'),
});


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

function SignInPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const email = searchParams.get('email');
    const defaultValues = {
        email: email,
        password: '',
        remember: true,
    };
    const [state, setState] = useState({
        loading: false
    });
    const classes = useStyles();
    const {control, formState, handleSubmit, setError, setValue} = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();
    const {isValid, dirtyFields, errors} = formState;

    useEffect(() => {
        if (window?.ethereum?.isTrust) {
            localStorage.setItem("trust", "true")
        } else
            localStorage.removeItem("trust")

        loadCaptchaEnginge(6, themesConfig.default.palette.secondary.main, '#fff', 'numbers');
    }, [])



    function onSubmit({email, password, captcha}) {
        if (!validateCaptcha(captcha)) {
            dispatch(showMessage({
                message: "Captcha is invalid",
                variant: 'error',
            }));
            return;
        }
        setState({
            ...state,
            loading: true
        })
        jwtService
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user)
                jwtService.getUserNavigations(user.role)
                    .then((navigations) => {
                        dispatch(setNavigation(navigations));
                    }).catch((error) => {
                    dispatch(showMessage({
                        message: error.message,
                    }));
                });
                history.push('/profile');

                // No need to do anything, user data will be set at app/auth/AuthContext
            })
            .catch((_errors) => {
                _errors.forEach((error) => {
                    setError(error.type, {
                        type: 'manual',
                        message: error.message,
                    });
                    dispatch(showMessage({
                        message: error.message,
                        variant: 'error',
                    }));
                });
                loadCaptchaEnginge(6, themesConfig.default.palette.secondary.main, '#fff', 'numbers');
            }).finally(()=>{
            setState({
                ...state,
                loading: false
            })
        });
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
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

                        <div className='flex items-baseline mt-2 font-medium justify-around'>
                            <Typography style={{width: '70%'}}
                                        className='title mt-16 text-4xl font-extrabold tracking-tight leading-tight'>
                                Sign in
                            </Typography>
                            <Link className='sub-title ml-4' to='/sign-up'>
                                Sign up
                            </Link>
                        </div>

                        <form
                            name='loginForm'
                            noValidate
                            className='flex flex-col justify-center w-full mt-16'
                            onSubmit={handleSubmit(onSubmit)}
                            style={{backgroundColor: 'white', padding: 30, borderRadius: 10}}
                        >
                            <Controller
                                name='email'
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        className='mb-16'
                                        label='Email'
                                        autoFocus
                                        type='text'
                                        error={!!errors.email}
                                        helperText={errors?.email?.message}
                                        variant='outlined'
                                        required
                                        fullWidth
                                    />
                                )}
                            />

                            <Controller
                                name='password'
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        className='mb-16'
                                        label='Password'
                                        type={showPassword ? "text" : "password"}
                                        error={!!errors.password}
                                        helperText={errors?.password?.message}
                                        variant='outlined'
                                        required
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label='toggle password visibility'
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge='end'
                                                    >
                                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />


                            <LoadCanvasTemplate  reloadColor={themesConfig.default.palette.secondary.main}
                                                className='mb-8'/>
                            <Controller
                                name='captcha'
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        className='mb-16 mt-16'
                                        label='Captcha'
                                        autoFocus
                                        type='text'
                                        error={!!errors.captcha}
                                        helperText={errors?.captcha?.message}
                                        variant='outlined'
                                        required
                                        fullWidth
                                    />
                                )}
                            />

                            <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-between'>
                                <Controller
                                    name='remember'
                                    control={control}
                                    render={({field}) => (
                                        <FormControl>
                                            <FormControlLabel
                                                label='Remember me'
                                                control={<Checkbox size='small' {...field} />}
                                            />
                                        </FormControl>
                                    )}
                                />

                                <Link className='text-md font-medium' to='/forgot-password'>
                                    Forgot password?
                                </Link>
                            </div>
                            <LoadingButton
                                className={'w-full mt-16'}
                                color='secondary'
                                aria-label='Sign in'
                                disabled={_.isEmpty(dirtyFields) || !isValid}
                                loadingIndicator={<CircularProgress color="secondary" size={16} />}
                                loadingPosition="center"
                                loading={state.loading}
                                type={'submit'}
                                variant='contained'
                                size='large'
                            >
                                <span>Sign in</span>
                            </LoadingButton>
                        </form>
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
    );
}

export default SignInPage;
