import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import jwtService from '../../../auth/services/jwtService';
import { showMessage } from '../../../store/fuse/messageSlice';
import axios from 'axios';
import jwtServiceConfig from '../../../auth/services/jwtService/jwtServiceConfig';
import HomeBackground from '../../../shared-components/HomeBackground';
import CustomTitle from '../../../shared-components/CustomTitle';
import { useParams } from 'react-router-dom';
import { selectUser } from '../../../store/userSlice';


const defaultValues = { name: '', email: '', subject: '', message: '' };
const schema = yup.object().shape({
    amount: yup.number().required('You must enter a amount'),
    address: yup.number().required('You must enter a address'),
});

function Transfer() {
    const { slug } = useParams();
    const user =useSelector(selectUser)
    const [nft, setNft] = useState(null);
    const dispatch = useDispatch();




    const { control, handleSubmit, watch, formState } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });
    const { isValid, dirtyFields, errors } = formState;
    const form = watch();

    function onSubmit({ amount }) {
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
            <div className='flex flex-col items-center p-24 sm:p-40 container'>
                <div className='flex flex-col w-full max-w-4xl'>
                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            Transfer
                        </CustomTitle>

                        <form onSubmit={handleSubmit(onSubmit)} className='px-0 sm:px-24'>
                            <div className='mb-24'>
                                <Typography color='text.secondary'>
                                    BEP20
                                </Typography>
                            </div>
                            <div className='space-y-32'>
                                <Controller
                                    name='address'
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className='mb-24'
                                            label='Address'
                                            type='text'
                                            error={!!errors.address}
                                            helperText={errors?.address?.message}
                                            variant='outlined'
                                            required
                                            fullWidth
                                        />
                                    )}
                                />

                                <Controller
                                    name='amount'
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className='mb-24'
                                            label='Amount'
                                            type='text'
                                            error={!!errors.amount}
                                            helperText={errors?.amount?.message}
                                            variant='outlined'
                                            required
                                            fullWidth
                                        />
                                    )}
                                />

                            </div>
                        </form>
                        <div className='flex items-center justify-end mt-32'>
                            <Button className='mx-8'>Cancel</Button>
                            <Button
                                className='mx-8'
                                variant='contained'
                                color='secondary'
                                disabled={_.isEmpty(dirtyFields) || !isValid}
                                onClick={handleSubmit(onSubmit)}
                            >
                                Transfer
                            </Button>
                        </div>

                    </Paper>
                </div>
            </div>
        </>
    );
}

export default Transfer;
