import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {Controller, useForm} from 'react-hook-form';
import _ from '@lodash';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../../../store/userSlice';
import HomeBackground from '../../../shared-components/HomeBackground';
import CustomTitle from '../../../shared-components/CustomTitle';

import axios from 'axios';
import jwtServiceConfig from '../../../auth/services/jwtService/jwtServiceConfig';
import {showMessage} from '../../../store/fuse/messageSlice';
import {useEffect, useState} from 'react';
import jwtService from '../../../auth/services/jwtService';
import CustomFontAwesomeIcon from '../../../shared-components/CustomFontAwesomeIcon';
import {faRefresh, faCheckCircle} from '@fortawesome/free-solid-svg-icons';

const defaultValues = {name: '', email: '', subject: '', message: ''};
const schema = yup.object().shape({
    confirmationCode: yup.string().required('Confirmation Code is required'),
});

function TwoFactorAuthenticator() {
    const dispatch = useDispatch()
    const [user, setUser] = useState(null);
    const [state, setState] = useState({
        code: "",
        barcode: ""
    })
    const {control, handleSubmit, watch, formState} = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });
    const {isValid, dirtyFields, errors} = formState;
    const form = watch();

    function onSubmit({confirmationCode}) {
        setAuth(confirmationCode)
    }

    const setAuth = (confirmationCode) => {
        axios.post(jwtServiceConfig.setTwoFactorAuth, {confirmationCode: confirmationCode})
            .then((response) => {
                setState({
                    code: response.data.data.code,
                    barcode: response.data.data.barcode
                })
                getUserData();
            })
            .catch((error) => {
                dispatch(showMessage({
                    message: error.response.data.message,
                    variant: 'error',
                }));

            });
    }

    const getAuth = () => {
        axios.post(jwtServiceConfig.getTwoFactorAuth, {})
            .then((response) => {
                setState({
                    code: response.data.data.code,
                    barcode: response.data.data.barcode
                })
            })
            .catch((error) => {
                dispatch(showMessage({
                    message: error.response.data.message,
                    variant: 'error',
                }));

            });
    }


    function sendConfirmCode() {
        axios.post(jwtServiceConfig.sendConfirmation, {})
            .then((response) => {
                dispatch(showMessage({
                    message: 'successfully sent',
                    variant: 'success',
                }));
            })
            .catch((error) => {
                dispatch(showMessage({
                    message: error.response.data.message,
                    variant: 'error',
                }));

            });
    }

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
        getAuth();
    }, []);


    if (_.isEmpty(form)) {
        return null;
    }


    return (
        <>
            <HomeBackground img={4}/>
            <div className='flex flex-col items-center p-24 sm:p-40 container opacity-90'>
                <div className='flex flex-col w-full max-w-4xl'>

                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            Two Factor Authenticator
                        </CustomTitle>
                        <div className='mb-24'>
                            {user?.data.isSetFundPassword === 1 && (<>
                                <Typography className='text-lg text-green-800 font-bold tracking-tight'>
                                    <CustomFontAwesomeIcon
                                        color={'green'}
                                        icon={faCheckCircle}
                                    />
                                    Your two factor authenticator has already been set
                                </Typography>
                            </>)}

                            <Typography className='text-lg font-bold tracking-tight'>
                                Set up your two factor authentication by scanning the barcode below.
                            </Typography>
                            <Typography className='text-lg font-bold tracking-tight'>
                                Alternatively, you can use the code :
                            </Typography>
                            <Typography color='text.secondary'>
                                {state.code}
                            </Typography>
                            <Typography color='text.secondary'>
                                You must set up your Google Authenticator app before continuing
                            </Typography>


                        </div>
                        <div className='space-y-32'>
                            <img src={state.barcode} className="w-128"/>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='px-0 sm:px-24'>
                            <div className='mb-24'>
                                <Typography className='text-2xl font-bold tracking-tight'>

                                </Typography>
                                <Typography color='text.secondary'>

                                </Typography>
                            </div>
                            <div className='space-y-32'>
                                <Controller
                                    name='confirmationCode'
                                    control={control}
                                    render={({field}) => (
                                        <div className="flex">
                                            <TextField
                                                {...field}
                                                className='mb-24'
                                                label='Confirmation Code'
                                                type='text'
                                                error={!!errors.confirmationCode}
                                                helperText={errors?.confirmationCode?.message}
                                                variant='outlined'
                                                required
                                                fullWidth
                                            />
                                            <Button
                                                className='mx-8'
                                                variant='contained'
                                                color='secondary'
                                                onClick={sendConfirmCode}
                                            >
                                               Send
                                            </Button>
                                        </div>


                                    )}
                                />

                            </div>
                        </form>


                        <div className='flex items-center justify-end mt-32'>

                            {user?.data.isSetTwoFactor === 1 && (
                                <Button
                                    className='mx-8'
                                    variant='contained'
                                    color='secondary'
                                    disabled={_.isEmpty(dirtyFields) || !isValid}
                                    onClick={handleSubmit(onSubmit)}
                                >Reset
                                </Button>
                            )}
                            {user?.data.isSetTwoFactor === 0 && (
                                <Button
                                    className='mx-8'
                                    variant='contained'
                                    color='secondary'
                                    disabled={_.isEmpty(dirtyFields) || !isValid}
                                    onClick={handleSubmit(onSubmit)}
                                >Set
                                </Button>
                            )}
                        </div>
                    </Paper>
                </div>
            </div>
        </>
    );
}

export default TwoFactorAuthenticator;
