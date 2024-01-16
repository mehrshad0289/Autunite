import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {Link, useSearchParams} from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import jwtService from '../../auth/services/jwtService';
import {showMessage} from '../../store/fuse/messageSlice';
import {useDispatch} from 'react-redux';
import {CircularProgress, Hidden} from "@mui/material";
import clsx from "clsx";
import {LoadingButton} from "@mui/lab";
import React, {useState} from "react";
import {makeStyles} from "@mui/styles";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    password: yup
        .string()
        .required('Please enter your password.')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const defaultValues = {
    password: '',
    passwordConfirm: '',
};
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

function ModernResetPasswordPage() {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    const classes = useStyles();
    const [state, setState] = useState({
        loading: false
    });
    const {control, formState, handleSubmit, reset, setError} = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });

    const {isValid, dirtyFields, errors} = formState;

    function onSubmit({password}) {
        setState({
            ...state,
            loading: true
        })
        jwtService
            .resetPassword(email, password, token)
            .then((user) => {
                dispatch(showMessage({
                    message: 'Reset Password Successfully!',
                    variant: 'success',
                }));
                history.push('/sign-in');
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
            }).finally(() => {
            setState({
                ...state,
                loading: false
            });
        });
    }

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
                        <Typography className='title mt-32 text-4xl font-extrabold tracking-tight leading-tight'>
                            Reset your password
                        </Typography>
                        <div className='sub-title flex items-baseline mt-2 font-medium'>
                            <Typography>Create a new password for your account</Typography>
                        </div>

                        <form
                            name='registerForm'
                            noValidate
                            className='flex flex-col justify-center w-full mt-32'
                            onSubmit={handleSubmit(onSubmit)}
                            style={{backgroundColor: 'white', padding: 30, borderRadius: 10}}
                        >
                            <Controller
                                name='password'
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        className='mb-24'
                                        label='Password'
                                        type='password'
                                        error={!!errors.password}
                                        helperText={errors?.password?.message}
                                        variant='outlined'
                                        required
                                        fullWidth
                                    />
                                )}
                            />

                            <Controller
                                name='passwordConfirm'
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        className='mb-24'
                                        label='Password (Confirm)'
                                        type='password'
                                        error={!!errors.passwordConfirm}
                                        helperText={errors?.passwordConfirm?.message}
                                        variant='outlined'
                                        required
                                        fullWidth
                                    />
                                )}
                            />


                            <LoadingButton
                                className={'w-full mt-16'}
                                color='secondary'
                                aria-label='Send reset link'
                                disabled={_.isEmpty(dirtyFields) || !isValid}
                                loadingIndicator={<CircularProgress color="secondary" size={16}/>}
                                loadingPosition="center"
                                loading={state.loading}
                                type={'submit'}
                                variant='contained'
                                size='large'
                            >
                                <span>Reset your password</span>
                            </LoadingButton>


                            <Typography className='mt-32 text-md font-medium' color='text.secondary'>
                                <span>Return to</span>
                                <Link className='ml-4' to='/sign-in'>
                                    sign in
                                </Link>
                            </Typography>
                        </form>
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

export default ModernResetPasswordPage;
