import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {Controller, useForm} from 'react-hook-form';

import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useDispatch} from 'react-redux';

import jwtService from '../../../auth/services/jwtService';
import {showMessage} from '../../../store/fuse/messageSlice';
import axios from 'axios';
import jwtServiceConfig from '../../../auth/services/jwtService/jwtServiceConfig';
import CustomFontAwesomeIcon from '../../../shared-components/CustomFontAwesomeIcon';
import {faRefresh} from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from 'react';
import HomeBackground from '../../../shared-components/HomeBackground';
import CustomTitle from '../../../shared-components/CustomTitle';
import {CircularProgress, InputAdornment} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useTimer} from "react-timer-hook";
import {LoadingButton} from "@mui/lab";

const defaultValues = {name: '', email: '', subject: '', message: ''};
const schema = yup.object().shape({
    oldPassword: yup.string().required('You must enter old password'),
    newPassword: yup
        .string()
        .required('Please enter your password.')
        .min(3, 'Password is too short - should be 3 chars minimum.'),
    retypePassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
    confirmationCode: yup.string().required('confirmation code is required'),
});
const useStyles = makeStyles((theme) => ({
    timer: {
        width: 50,
        margin: 5,
    },
    timerValue: {
        width: '100%',
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
        borderRadius: 5,
        color: '#6a1b9a',
    },
}));

function ChangePassword() {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        loading: false,
        sendConfirmCodeLoading: false,
    });
    const [timerState, setTimerState] = useState({
        isActiveConfirmButton: true,
        expiryTimestamp: new Date(),
    });

    const getUserData = () => {
        jwtService
            .getUserInfo()
            .then((user) => {
                setUser(user);
            })
            .catch((error) => {
                dispatch(showMessage({
                    message: error.message,
                    variant: 'error',
                }));

            });
    };
    useEffect(() => {
        getUserData();
    }, []);
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
    } = useTimer({
        expiryTimestamp: timerState.expiryTimestamp,
        onExpire: () => {
            setTimerState({
                ...timerState,
                isActiveConfirmButton: true,
            });
        },
    });
    const classes = useStyles();
    const {control, handleSubmit, watch, formState} = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });
    const {isValid, dirtyFields, errors} = formState;
    const form = watch();

    function onSubmit({oldPassword, newPassword, retypePassword, confirmationCode}) {
        setState({
            ...state,
            loading: true
        })
        axios.post(jwtServiceConfig.changePassword, {
            oldPassword: oldPassword,
            newPassword: newPassword,
            retypePassword: retypePassword,
            confirmationCode: confirmationCode,
        })
            .then((response) => {
                dispatch(showMessage({
                    message: 'successfully changed',
                    variant: 'success',
                }));
            })
            .catch((error) => {
                dispatch(showMessage({
                    message: error.response.data.message,
                    variant: 'error',
                }));

            }).finally(() => {
            setState({
                ...state,
                loading: false
            });
        })
    }

    function sendConfirmCode() {
        setState({
            ...state,
            sendConfirmCodeLoading: true
        })
        axios.post(jwtServiceConfig.sendConfirmation, {})
            .then((response) => {
                dispatch(showMessage({
                    message: 'successfully sent',
                    variant: 'success',
                }));
                resetTimer();
            })
            .catch((error) => {
                dispatch(showMessage({
                    message: error.response.data.message,
                    variant: 'error',
                }));

            }).finally(() => {
            setState({
                ...state,
                sendConfirmCodeLoading: false
            })
        });
    }
    const resetTimer = () => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 60);
        restart(time);

        setTimerState({
            ...timerState,
            isActiveConfirmButton: false,
        });
    };

    if (_.isEmpty(form)) {
        return null;
    }

    return (
        <>
            <HomeBackground img={2}/>
            <div className='flex flex-col items-center p-24 sm:p-40 container opacity-90'>
                <div className='flex flex-col w-full max-w-4xl'>

                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            Change Password
                        </CustomTitle>
                        {!user?.isSetFundPassword && (<>
                                <form onSubmit={handleSubmit(onSubmit)} className='px-0 sm:px-24'>
                                    <div className='mb-24'>
                                        <Typography className='text-2xl font-bold tracking-tight'>

                                        </Typography>
                                        <Typography color='text.secondary'>

                                        </Typography>
                                    </div>
                                    <div className='space-y-32'>
                                        <Controller
                                            name='oldPassword'
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    className='mb-24'
                                                    label='Old Password'
                                                    type='oldPassword'
                                                    error={!!errors.oldPassword}
                                                    helperText={errors?.oldPassword?.message}
                                                    variant='outlined'
                                                    required
                                                    fullWidth
                                                />
                                            )}
                                        />
                                        <Controller
                                            name='newPassword'
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    className='mb-24'
                                                    label='New Password'
                                                    type='newPassword'
                                                    error={!!errors.newPassword}
                                                    helperText={errors?.newPassword?.message}
                                                    variant='outlined'
                                                    required
                                                    fullWidth
                                                />
                                            )}
                                        />
                                        <Controller
                                            name='retypePassword'
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    className='mb-24'
                                                    label='Retype Password'
                                                    type='retypePassword'
                                                    error={!!errors.retypePassword}
                                                    helperText={errors?.retypePassword?.message}
                                                    variant='outlined'
                                                    required
                                                    fullWidth
                                                />
                                            )}
                                        />

                                        <Controller
                                            name='confirmationCode'
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    className='mb-24'
                                                    label='Email Confirm Code'
                                                    type='text'
                                                    error={!!errors.confirmationCode}
                                                    helperText={errors?.confirmationCode?.message}
                                                    variant='outlined'
                                                    required
                                                    fullWidth
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position='end'>
                                                                {timerState.isActiveConfirmButton && (

                                                                    <LoadingButton
                                                                        color='secondary'
                                                                        aria-label='Sign in'
                                                                        disabled={state.sendConfirmCodeLoading}
                                                                        onClick={sendConfirmCode}
                                                                        loadingIndicator={<CircularProgress
                                                                            color="secondary" size={16}/>}
                                                                        loadingPosition="center"
                                                                        loading={state.sendConfirmCodeLoading}
                                                                        variant='contained'
                                                                        size='small'
                                                                    >
                                                                        <span>Send</span>
                                                                    </LoadingButton>

                                                                )}
                                                                {!timerState.isActiveConfirmButton && (
                                                                    <div className={classes.timer}>
                                                                        <div className={classes.timerValue}>
                                                                            <span className="p-2 mx-2">{seconds}</span>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </InputAdornment>
                                                        ),
                                                    }}

                                                />

                                            )}
                                        />


                                    </div>
                                </form>
                                <div className='flex items-center justify-end mt-32'>
                                    <LoadingButton
                                        className={'w-full mt-16 mx-8'}
                                        color='secondary'
                                        aria-label='Sign in'
                                        disabled={_.isEmpty(dirtyFields) || !isValid}
                                        onClick={handleSubmit(onSubmit)}
                                        loadingIndicator={<CircularProgress color="secondary" size={16}/>}
                                        loadingPosition="center"
                                        loading={state.loading}
                                        variant='contained'
                                        size='large'
                                    >
                                        <span>Save</span>
                                    </LoadingButton>

                                </div>
                            </>
                        )}
                        {user?.isSetFundPassword && (<>

                        </>)}
                    </Paper>
                </div>
            </div>
        </>
    );
}

export default ChangePassword;
