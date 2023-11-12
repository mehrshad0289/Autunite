import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import jwtService from '../../../auth/services/jwtService';
import { showMessage } from '../../../store/fuse/messageSlice';
import axios from 'axios';
import jwtServiceConfig from '../../../auth/services/jwtService/jwtServiceConfig';
import { faCheckCircle, faRefresh } from '@fortawesome/free-solid-svg-icons';
import CustomFontAwesomeIcon from '../../../shared-components/CustomFontAwesomeIcon';
import HomeBackground from '../../../shared-components/HomeBackground';
import CustomTitle from '../../../shared-components/CustomTitle';


const defaultValues = { name: '', email: '', subject: '', message: '' };
const schema = yup.object().shape({
    password: yup.string().required('You must enter a password'),
    confirmationCode: yup.string().required('confirmation code is required'),

});

function FundPassword() {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

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


    const { control, handleSubmit, watch, formState } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });
    const { isValid, dirtyFields, errors } = formState;
    const form = watch();

    function onSubmit({ password, confirmationCode }) {
        axios.post(jwtServiceConfig.setFundPassword, {
            password: password,
            confirmationCode: confirmationCode,
        })
            .then((response) => {
                getUserData();
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

    if (_.isEmpty(form)) {
        return null;
    }

    return (
        <>
            <HomeBackground img={6} />
            <div className='flex flex-col items-center p-24 sm:p-40 container opacity-90'>
                <div className='flex flex-col w-full max-w-4xl'>

                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            Fund Password
                        </CustomTitle>
                        {user?.data.isSetFundPassword===1 && (<>
                            <Typography className='text-lg text-green-800 font-bold tracking-tight'>
                                <CustomFontAwesomeIcon
                                    color={'green'}
                                    icon={faCheckCircle}
                                />
                                Your fund password has already been set
                            </Typography>
                        </>)}

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
                                            name='password'
                                            control={control}
                                            render={({ field }) => (
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
                                        {user?.data.isSetFundPassword===1 && (<>Reset Fund Password</>)}
                                        {user?.data.isSetFundPassword===0 && (<>Set Fund Password</>)}
                                    </Button>
                                </div>
                            </>
                        )}

                    </Paper>
                </div>
            </div>
        </>
    );
}

export default FundPassword;
