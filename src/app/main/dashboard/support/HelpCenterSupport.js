import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import HomeBackground from '../../../shared-components/HomeBackground';
import CustomTitle from '../../../shared-components/CustomTitle';
import axios from 'axios';
import jwtServiceConfig from '../../../auth/services/jwtService/jwtServiceConfig';
import { showMessage } from '../../../store/fuse/messageSlice';
import { useDispatch } from 'react-redux';

const defaultValues = { name: '', email: '', subject: '', message: '' };
const schema = yup.object().shape({
    name: yup.string().required('You must enter a name'),
    subject: yup.string().required('You must enter a subject'),
    message: yup.string().required('You must enter a message'),
    email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});

function HelpCenterSupport() {
    const { control, handleSubmit, watch, formState } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();
    const { isValid, dirtyFields, errors } = formState;
    const form = watch();

    function onSubmit({name,email,message,subject}) {
        axios.post(jwtServiceConfig.saveTicket, {
            name,
            email,
            message,
            subject,
        })
            .then((response) => {
                dispatch(showMessage({
                    message: 'successfully saved',
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
            <HomeBackground img={7} />
            <div className='flex flex-col items-center p-24 sm:p-40 container opacity-90'>
                <div className='flex flex-col w-full max-w-4xl'>

                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            Contact support
                        </CustomTitle>

                        <form onSubmit={handleSubmit(onSubmit)} className='px-0 sm:px-24'>
                            <div className='mb-24'>
                                <Typography className='text-2xl font-bold tracking-tight'>
                                    Submit your request
                                </Typography>
                                <Typography color='text.secondary'>
                                    Your request will be processed and our support staff will get back to you in 24
                                    hours.
                                </Typography>
                            </div>
                            <div className='space-y-32'>
                                <Controller
                                    control={control}
                                    name='name'
                                    render={({ field }) => (
                                        <TextField
                                            className='w-full'
                                            {...field}
                                            label='Name'
                                            placeholder='Name'
                                            id='name'
                                            error={!!errors.name}
                                            helperText={errors?.name?.message}
                                            variant='outlined'
                                            required
                                            fullWidth
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name='email'
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className='mt-16 w-full'
                                            label='Email'
                                            placeholder='Email'
                                            variant='outlined'
                                            fullWidth
                                            error={!!errors.email}
                                            helperText={errors?.email?.message}
                                            required
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name='subject'
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className='mt-16 w-full'
                                            label='Subject'
                                            placeholder='Subject'
                                            variant='outlined'
                                            fullWidth
                                            error={!!errors.subject}
                                            helperText={errors?.subject?.message}
                                            required
                                        />
                                    )}
                                />

                                <Controller
                                    name='message'
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label='Message'
                                            className='mt-16 w-full'
                                            margin='normal'
                                            multiline
                                            minRows={4}
                                            variant='outlined'
                                            error={!!errors.message}
                                            helperText={errors?.message?.message}
                                            required
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
                                Save
                            </Button>
                        </div>
                    </Paper>
                </div>
            </div>
        </>
    );
}

export default HelpCenterSupport;
