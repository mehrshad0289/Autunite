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
import FormHelperText from '@mui/material/FormHelperText';
import jwtService from '../../auth/services/jwtService';
import React, {useEffect, useRef, useState} from 'react';
import {Autocomplete, LoadingButton} from '@mui/lab';
import axios from 'axios';
import history from '@history';
import {showMessage} from '../../store/fuse/messageSlice';
import {useDispatch} from 'react-redux';
import {faRefresh, faSpinner} from '@fortawesome/free-solid-svg-icons';
import CustomFontAwesomeIcon from '../../shared-components/CustomFontAwesomeIcon';
import clsx from 'clsx';
import {makeStyles} from '@mui/styles';
import {CircularProgress, Hidden, IconButton, InputAdornment} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import jwtServiceConfig from '../../auth/services/jwtService/jwtServiceConfig';
import {useTimer} from 'react-timer-hook';


/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    first_name: yup.string().required('You must enter first name'),
    last_name: yup.string().required('You must enter last name'),
    email: yup.string().email('You must enter a valid email').required('You must enter a email'),
    confirmationCode: yup.string().required('Email confirmation code is required'),
    password: yup
        .string()
        .required('Please enter your password.')
        .min(3, 'Password is too short - should be 3 chars minimum.'),
    retype_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    acceptTermsConditions: yup.boolean().oneOf([true], 'The terms and conditions must be accepted.'),
    country_id: yup.object().required('You must Select One Country'),
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
    community: {
        backgroundImage: 'linear-gradient(to bottom right, black 40%, #6A1B9A)',
    },
    rotateObject: {
        width: 400,
        height: 400,
        transition: 'all 50s linear',
        animation: '$rotateObject 50s linear infinite',
        position: 'absolute',
    },
    mobileRotateObject: {
        width: 300,
        height: 300,
        transition: 'all 50s linear',
        animation: '$rotateObject 50s linear infinite',
        position: 'absolute',
    },
    '@keyframes rotateObject': {
        'from': {
            transform: 'rotate(0deg)',
        },
        'to': {
            transform: 'rotate(360deg)',
        },
    },
    logo: {
        width: 300,
        height: 300,
    },
}));


function SignUpPage() {
    const classes = useStyles();
    const [searchParams, setSearchParams] = useSearchParams();
    const sponsorId = searchParams.get('sponsorId');
    const emailRef = useRef('');
    const defaultValues = {
        first_name: '',
        last_name: '',
        country_id: '',
        sponsor_id: sponsorId,
        email: '',
        confirmationCode: '',
        password: '',
        retype_password: '',
        acceptTermsConditions: false,
        share_data_with_sponsor: true,
    };

    const [countries, setCountries] = useState([]);
    const [state, setState] = useState({
        isActiveConfirmButton: true,
        expiryTimestamp: new Date(),
        loading: false
    });
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
        expiryTimestamp: state.expiryTimestamp,
        onExpire: () => {
            setState({
                ...state,
                isActiveConfirmButton: true,
            });
        },
    });


    const dispatch = useDispatch();


    useEffect(() => {
        axios.get('api/countries', {}).then((response) => {
            setCountries(response.data.data.map(x => {
                return {
                    value: x.id,
                    label: x.name,
                };
            }));
        });
    }, []);
    const {control, formState, handleSubmit, reset} = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });

    const {isValid, dirtyFields, errors, setError, isSubmitting} = formState;


    function onSubmit({
                          first_name,
                          last_name,
                          country_id,
                          password,
                          email,
                          confirmationCode,
                          sponsor_id,
                          retype_password,
                          share_data_with_sponsor,
                      }) {
        setState({
            ...state,
            loading: true
        })
        jwtService
            .createUser({
                last_name,
                country_id: country_id.value,
                share_data_with_sponsor,
                retype_password,
                sponsor_id,
                first_name,
                password,
                email,
                confirmationCode,
            })
            .then((user) => {
                dispatch(showMessage({
                    message: 'Your Account Successfully Created',
                    variant: 'success',
                }));
                history.push({
                    pathname: '/sign-in',
                    search: `?email=${email}`,
                });
            })
            .catch((_errors) => {
                _errors.forEach((error) => {
                    dispatch(showMessage({
                        message: error.message,
                        variant: 'error',
                    }));
                });
            }).finally(() => {
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

    const [showRetypePassword, setShowRetypePassword] = useState(false);
    const handleClickShowRetypePassword = () => setShowRetypePassword((show) => !show);
    const handleMouseDownRetypePassword = (event) => {
        event.preventDefault();
    };

    const resetTimer = () => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 60);
        restart(time);

        setState({
            ...state,
            isActiveConfirmButton: false,
        });
    };

    function sendConfirmCode() {
        if (!emailRef.current.value) {
            dispatch(showMessage({
                message: 'Please enter your email',
                variant: 'warning',
            }));
            return;
        }
        axios.post(jwtServiceConfig.sendRegisterConfirmation, {
            email: emailRef.current.value,
        })
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

            });
    }

    return (
        <div
            className='flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0'>
            <Paper style={{borderRadius: 0}}
                   className='auth-page h-full sm:h-auto md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-32 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none'>
                <div className='w-full max-w-320 sm:w-320 mx-auto sm:mx-0'>
                    <Hidden lgUp>
                        <Box style={{width: 300, height: 300, position: 'absolute', top: -40}}
                             className='m-auto flex items-center justify-center'>
                            <img src='assets/images/logo/coins.png' className={classes.mobileRotateObject}/>
                            <img src='assets/images/logo/logo.png'
                                 style={{
                                     width: 200,
                                     height: 200,
                                 }} className={clsx('m-0')}/>
                        </Box>
                    </Hidden>
                    <Hidden lgDown>
                        <img className='w-80' style={{borderRadius: '50%'}} src='assets/images/logo/logo.svg'
                             alt='logo'/>
                    </Hidden>

                    <div className='form'>
                        <div className='flex items-baseline mt-2 font-medium justify-around'>
                            <Typography style={{width: '70%'}}
                                        className='title mt-16 text-4xl font-extrabold tracking-tight leading-tight'>
                                Sign up
                            </Typography>
                            <Link className='sub-title ml-4' to='/sign-in'>
                                Sign in
                            </Link>
                        </div>

                        <form
                            name='registerForm'
                            noValidate
                            className='flex flex-col justify-center w-full mt-16'
                            onSubmit={handleSubmit(onSubmit)}
                            style={{backgroundColor: 'white', padding: 30, borderRadius: 10}}
                        >
                            <Controller
                                name='sponsor_id'
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        className='mb-16'
                                        label='Sponsor ID'
                                        autoFocus
                                        type='name'
                                        error={!!errors.sponsor_id}
                                        helperText={errors?.sponsor_id?.message}
                                        variant='outlined'
                                        required
                                        fullWidth
                                    />
                                )}
                            />


                            <Controller
                                name='first_name'
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        className='mb-16'
                                        label='First Name'
                                        type='name'
                                        error={!!errors.first_name}
                                        helperText={errors?.first_name?.message}
                                        variant='outlined'
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                            <Controller
                                name='last_name'
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        className='mb-16'
                                        label='Last Name'
                                        type='name'
                                        error={!!errors.last_name}
                                        helperText={errors?.last_name?.message}
                                        variant='outlined'
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                            <Controller
                                name='email'
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        inputRef={emailRef}
                                        className='mb-16'
                                        label='Email'
                                        type='email'
                                        error={!!errors.email}
                                        helperText={errors?.email?.message}
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
                                                    {state.isActiveConfirmButton && (
                                                        <Button onClick={sendConfirmCode} color="secondary" size="small"
                                                                variant="contained">
                                                            Send
                                                        </Button>
                                                    )}
                                                    {!state.isActiveConfirmButton && (
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

                            <Controller
                                name='password'
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        className='mb-16'
                                        label='Password'
                                        type={showPassword ? 'text' : 'password'}
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

                            <Controller
                                name='retype_password'
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        className='mb-16'
                                        label='Password (Confirm)'
                                        type={showRetypePassword ? 'text' : 'password'}
                                        error={!!errors.retype_password}
                                        helperText={errors?.retype_password?.message}
                                        variant='outlined'
                                        required
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label='toggle password visibility'
                                                        onClick={handleClickShowRetypePassword}
                                                        onMouseDown={handleMouseDownRetypePassword}
                                                        edge='end'
                                                    >
                                                        {showRetypePassword ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                            <Controller
                                name='country_id'
                                control={control}
                                render={({field: {onChange, value}}) => {
                                    return <Autocomplete
                                        getOptionLabel={(option) => option ? option.label : ''}
                                        className='mb-16 w-full'
                                        required
                                        variant='outlined'
                                        onChange={(event, item) => {
                                            onChange(item);
                                        }}
                                        value={value}
                                        // {...field}
                                        options={countries}
                                        sx={{width: 300}}
                                        renderInput={(params) => <TextField {...params} label='Country'/>}
                                    />;
                                }}
                            />

                            <Controller
                                name='acceptTermsConditions'
                                control={control}
                                render={({field}) => (
                                    <FormControl className='items-center' error={!!errors.acceptTermsConditions}>
                                        <FormControlLabel
                                            label='I agree to the Terms of Service and Privacy Policy'
                                            control={<Checkbox size='small' {...field} />}
                                        />
                                        <FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
                                    </FormControl>
                                )}
                            />
                            <Controller
                                name='share_data_with_sponsor'
                                control={control}
                                render={({field}) => (
                                    <FormControl className='items-center' error={!!errors.share_data_with_sponsor}>
                                        <FormControlLabel
                                            label='Share Data With Sponsor'
                                            control={<Checkbox size='small' {...field} />}
                                        />
                                        <FormHelperText>{errors?.share_data_with_sponsor?.message}</FormHelperText>
                                    </FormControl>
                                )}
                            />

                            <LoadingButton
                                className='w-full mt-16'
                                color='secondary'
                                aria-label='Register'
                                disabled={_.isEmpty(dirtyFields) || !isValid || isSubmitting}
                                loadingIndicator={<CircularProgress color="secondary" size={16}/>}
                                loadingPosition="center"
                                loading={state.loading}
                                type={'submit'}
                                variant='contained'
                                size='large'
                            >
                                {isSubmitting && (
                                    <CustomFontAwesomeIcon color={'white'} icon={faSpinner}/>
                                )}
                                {isSubmitting && <span>Please wait!</span>}
                                {!isSubmitting && <span>Create your free account</span>}
                            </LoadingButton>

                        </form>
                    </div>
                </div>
            </Paper>

            <Box
                className={clsx('relative hidden md:flex flex-auto items-center justify-center h-full p-20 lg:px-64 overflow-hidden', classes.community)}
                sx={{backgroundColor: 'primary.main'}}
            >
                <div className={clsx('z-10 relative w-full max-w-2xl text-center')}
                     style={{display: 'block', position: 'fixed', width: '100%', height: '100%', top: 100}}>
                    <Box style={{width: 400, height: 400}} className='m-auto flex items-center justify-center'>
                        <img src='assets/images/logo/coins.png' className={classes.rotateObject}/>
                        <img src='assets/images/logo/logo.png' className={clsx('m-0', classes.logo)}/>
                    </Box>
                    <div className='text-7xl font-bold leading-none text-gray-100'>
                        <div style={{fontFamily: 'cursive'}}>Welcome to</div>
                        <div style={{fontFamily: 'cursive'}}>NFT Autunite Mine</div>
                    </div>
                </div>
            </Box>
        </div>
    );
}

export default SignUpPage;
