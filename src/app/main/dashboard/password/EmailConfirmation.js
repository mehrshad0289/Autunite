import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useDispatch } from 'react-redux';
import CustomFontAwesomeIcon from '../../../shared-components/CustomFontAwesomeIcon';
import { faCheckCircle, faRefresh } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import jwtServiceConfig from '../../../auth/services/jwtService/jwtServiceConfig';
import { showMessage } from '../../../store/fuse/messageSlice';
import HomeBackground from '../../../shared-components/HomeBackground';
import CustomTitle from '../../../shared-components/CustomTitle';
import jwtService from '../../../auth/services/jwtService';
import { useEffect, useState } from 'react';


const defaultValues = { name: '', email: '', subject: '', message: '' };
const schema = yup.object().shape({
    confirmationCode: yup.string().required('confirmation code is required'),

});

function EmailConfirmation() {
    const [user, setUser] = useState(null);
    const { control, handleSubmit, watch, formState } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });
    const { isValid, dirtyFields, errors } = formState;
    const form = watch();

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

    function onSubmit({ confirmationCode }) {
        axios.post(jwtServiceConfig.confirmEmail, {
            confirmationCode: confirmationCode,
        })
            .then((response) => {
                dispatch(showMessage({
                    message: 'successfully confirmed',
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

    if (_.isEmpty(form)) {
        return null;
    }
    const dispatch = useDispatch();

    function sendConfirmCode() {
        axios.post(jwtServiceConfig.sendConfirmation, {})
            .then((response) => {
                getUserData();
                dispatch(showMessage({
                    message: 'successfully confirmed',
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

    return (
        <>
            <HomeBackground img={3} />
            <div className='flex flex-col items-center p-24 sm:p-40 container opacity-90'>
                <div className='flex flex-col w-full max-w-4xl'>
                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            Email Confirmation
                        </CustomTitle>
                        {user?.data.isConfirmedEmail ===0 && (<>
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
                                        render={({ field }) => (
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

                                <Button
                                    className='mx-8'
                                    variant='contained'
                                    color='secondary'
                                    disabled={_.isEmpty(dirtyFields) || !isValid}
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Save
                                </Button>
                            </div>
                        </>)}
                        {user?.data.isConfirmedEmail===1 && (<>
                            <Typography className='text-lg text-green-800 font-bold tracking-tight'>
                                <CustomFontAwesomeIcon
                                    color={'green'}
                                    icon={faCheckCircle}
                                />
                                Your Email Is Confirmed
                            </Typography>
                            <Typography className='text-sm font-bold tracking-tight'>
                                Verified At
                            </Typography>
                            <Typography>
                                {new Date(user?.data.emailVerifiedAt).toLocaleDateString()} {new Date(user?.data.emailVerifiedAt).toLocaleTimeString()}
                            </Typography>
                        </>)}
                    </Paper>
                </div>
            </div>
        </>
    );
}

export default EmailConfirmation;
