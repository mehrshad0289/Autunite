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
import {CircularProgress} from "@mui/material";
import {LoadingButton} from "@mui/lab";

function NftInfo({userId}) {
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    useEffect(() => {
        loadData();
    }, []);
    const [state, setState] = useState({
        loading: false,
        isLoadingDeleteBtn :false
    });

    const loadData = () => {
        setState({
            ...state,
            loading: true
        })
        axios.get(`/api/user/${userId}/nft`).then((res) => {
            setData(res.data);
        }).finally(() => {
            setState({
                ...state,
                loading: false
            })
        });
    }

    const deleteOnClick = (id)=>{
        setState({
            ...state,
            loading: true,
            isLoadingDeleteBtn: true
        })
        axios.post(`/api/delete-nft`, {
            nftId: id
        }).then((res) => {
            dispatch(showMessage({
                variant: "success",
                message: 'Deleted Successfully'
            }))
            loadData()
        }).catch((e) => {
            dispatch(showMessage({
                variant: "error",
                message: e.response.data.message
            }))
        }).finally(() => {
            setState({
                ...state,
                loading: false,
                isLoadingDeleteBtn: false
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
                                Nft Information
                            </Typography>
                        </div>

                        <CardContent className='px-32 py-24'>
                            <div className='mb-24'>
                                <LoadingButton
                                    className={'rounded-lg'}
                                    loadingIndicator={<CircularProgress color="secondary"
                                                                        size={16}/>}
                                    loading={state.isLoadingDeleteBtn}
                                    loadingPosition="end"
                                    variant='contained'
                                    color='info'
                                    onClick={() => {
                                        deleteOnClick(data?.id)
                                    }}
                                    disabled={state.isLoadingDeleteBtn || data?.status == 1}
                                >
                                    <span>Delete Nft</span>
                                </LoadingButton>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Owner</Typography>
                                <Typography>{data?.owner}</Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Status</Typography>
                                <Typography>{data?.status ==0 ? "Pending" : "Done"}</Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Amount</Typography>
                                <Typography>{data?.amount}</Typography>
                            </div>

                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Transaction Hash</Typography>
                                <Typography>{data?.transaction_hash}</Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Token ID</Typography>
                                <Typography>{data?.token_id}</Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Created At</Typography>
                                <Typography>
                                    {data ? `${new Date(data.created_at).toLocaleTimeString()} ${new Date(data.created_at).toLocaleTimeString()}`: ""}
                                </Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Image</Typography>
                                <Typography>
                                    <img src={data?.image_url} className="w-48"/>
                                </Typography>
                            </div>

                        </CardContent>
                    </Card>


                </div>


            </div>
        </motion.div>
    );
}

export default NftInfo;
