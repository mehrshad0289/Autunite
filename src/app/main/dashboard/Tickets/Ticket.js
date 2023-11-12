import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import HomeBackground from '../../../shared-components/HomeBackground';
import axios from 'axios';
import jwtServiceConfig from '../../../auth/services/jwtService/jwtServiceConfig';
import { showMessage } from '../../../store/fuse/messageSlice';
import { useDispatch } from 'react-redux';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@mui/material';
import CustomFontAwesomeIcon from '../../../shared-components/CustomFontAwesomeIcon';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const defaultValues = { response: '' };
const schema = yup.object().shape({
    response: yup.string().required('You must enter a response'),
});

function Ticket() {
    const params = useParams();
    const id = params.id;
    const [data, setData] = useState(null);
    useEffect(() => {
        axios.get(`/api/ticket/${id}`).then((res) => {
            setData(res.data.data);
        });
    }, []);


    const { control, handleSubmit, watch, formState } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();
    const { isValid, dirtyFields, errors } = formState;
    const form = watch();

    function onSubmit({ response }) {
        axios.post(jwtServiceConfig.saveTicketResponse, {
            id,
            response,
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
    const item = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0 },
    };
    return (
        <>
            <HomeBackground img={7} />
            <div className='flex flex-col items-center p-24 sm:p-40 container opacity-90'>
                <div className='flex flex-col w-full max-w-4xl'>
                    <Card component={motion.div} variants={item} className='w-full mb-32'>
                        <div className='px-32 pt-24'>
                            <Typography className='text-2xl font-semibold leading-tight'>
                                Contact support
                            </Typography>
                        </div>

                        <CardContent className='px-32 py-24'>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>ID</Typography>
                                <Typography>{data?.id}</Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>User Id</Typography>
                                <Typography>{data?.user?.referral_code}</Typography>
                            </div>

                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Name</Typography>
                                <Typography>{data?.name}</Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Message</Typography>
                                <Typography>{data?.message}</Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Email</Typography>
                                <Typography>{data?.email}</Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Status</Typography>
                                <Typography> {data && data?.status === 0 && <>Unknown</>}
                                    {data && data?.status === 1 && (<>
                                        <CustomFontAwesomeIcon
                                            color={'green'}
                                            icon={faCheckCircle}
                                        />
                                        Answered</>)}</Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Created At</Typography>
                                <Typography>{data && data?.created_at ? (
                                    <>{new Date(data?.created_at).toLocaleDateString()} {new Date(data?.created_at).toLocaleTimeString()}
                                    </>
                                ) : ''}</Typography>
                            </div>

                        </CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className='px-0 sm:px-24'>
                            <div className='mb-24'>
                                <Typography className='text-2xl font-bold tracking-tight'>
                                    Response to ticket
                                </Typography>

                            </div>
                            <div className='space-y-32'>
                                <Controller
                                    control={control}
                                    name='response'
                                    render={({ field }) => (
                                        <TextField
                                            className='w-full'
                                            {...field}
                                            label='Response'
                                            placeholder='Response'
                                            id='response'
                                            error={!!errors.response}
                                            helperText={errors?.response?.message}
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
                                Save
                            </Button>
                        </div>

                    </Card>
                </div>
            </div>
        </>
    );
}

export default Ticket;
