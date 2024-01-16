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

function RewardInfo({userId}) {
    const [data, setData] = useState(null);

    const user = useSelector(selectUser);
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
        axios.get(`/api/user/${userId}/reward`).then((res) => {
            setData(res.data);
        }).finally(() => {
            setState({
                ...state,
                loading: false
            })
        });
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
                                Award Information
                            </Typography>
                        </div>

                        <CardContent className='px-32 py-24'>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Left</Typography>
                                <Typography>{data?.left}</Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Right</Typography>
                                <Typography>{data?.right}</Typography>
                            </div>

                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Pending Reward</Typography>
                                <Typography>{data?.pending_reward}</Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Last Compute</Typography>
                                <Typography>{data?.last_compute}</Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Created At</Typography>
                                <Typography>
                                    {data ? `${new Date(data.created_at).toLocaleTimeString()} ${new Date(data.created_at).toLocaleTimeString()}`: ""}
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>


                </div>


            </div>
        </motion.div>
    );
}

export default RewardInfo;
