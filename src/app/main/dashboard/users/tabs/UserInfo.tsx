import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../../store/userSlice';
import { showMessage } from '../../../../store/fuse/messageSlice';
import CustomCopyToClipboard from '../../../../shared-components/CustomCopyToClipboard';
import CustomWaiting from "../../../../shared-components/CustomWaiting";

function UserInfo({userId}) {
    const [data, setData] = useState(null);
    useEffect(() => {
        loadData();
    }, []);

    const [state, setState] = useState({
        loading: false,
    });
    const loadData = () => {
        setState({
            ...state,
            loading: true
        })
        axios.get(`/api/user/${userId}/info`).then((res) => {
            setData(res.data);
        }).finally(() => {
            setState({
                ...state,
                loading: false
            })
        });
    }
    if (!data) {
        return null;
    }


    const container = {
        show: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.div variants={container} initial='hidden' animate='show' className='w-full'>
            <CustomWaiting open={state.loading} message={"please Wait!"}/>
            <div className='md:flex'>
                <div className='flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32'>
                    <Card component={motion.div} variants={item} className='w-full mb-32'>
                        <div className='px-32 pt-24'>
                            <Typography className='text-2xl font-semibold leading-tight'>
                                User Information
                            </Typography>
                        </div>

                        <CardContent className='px-32 py-24'>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Referral Code</Typography>
                                <Typography>{data.referral_code}</Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>First Name</Typography>
                                <Typography>{data.first_name}</Typography>
                            </div>

                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Last Name</Typography>
                                <Typography>{data.first_name}</Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Email</Typography>
                                <Typography>{data.email}</Typography>
                            </div>

                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Left Referral Code</Typography>
                                <Typography>
                                    <CustomCopyToClipboard link={data.left_referral_code} text={data.left_referral_code} />
                                </Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Right Referral Code</Typography>
                                <Typography>
                                    <CustomCopyToClipboard link={data.right_referral_code} text={data.right_referral_code} />
                                </Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Country</Typography>
                                <Typography>{data.country.name}</Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Created At</Typography>
                                <Typography>{new Date(data.created_at).toLocaleDateString()} {new Date(data.created_at).toLocaleTimeString()}</Typography>
                            </div>
                        </CardContent>
                    </Card>


                </div>


            </div>
        </motion.div>
    );
}

export default UserInfo;
