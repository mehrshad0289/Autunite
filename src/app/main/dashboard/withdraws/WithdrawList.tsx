import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

import HomeBackground from '../../../shared-components/HomeBackground';
import CustomTitle from '../../../shared-components/CustomTitle';
import CustomFontAwesomeIcon from '../../../shared-components/CustomFontAwesomeIcon';
import { faBan, faCheckCircle, faExclamationCircle, faEye, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import themesConfig from '../../../configs/themesConfig';
import { Link } from 'react-router-dom';
import { Web3Button } from "@web3modal/react";
import PayValueModule from './PayValueModule';
import WalletConnectModule from '../WalletConnectModule';
import CustomWaiting from "../../../shared-components/CustomWaiting";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { showMessage } from "../../../store/fuse/messageSlice";
import { useDispatch } from "react-redux";
import WalletConnectButton from '../WalletConnectButton';


function WithdrawList() {
    const [loading, setLoading] = useState(false);
    const [openAlertDelet, setOpenAlertDelet] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        pendingList: [],
        confirmedList: [],
        rejectedList: [],
    });


    useEffect(() => {
        getAllWithdraws();
    }, []);

    const getAllWithdraws = () => {
        setLoading(true)
        axios.get(
            'api/all-withdraws',
        ).then((res) => {
            const data = res.data.data;
            setState({
                ...state,
                pendingList: data.pendingList,
                confirmedList: data.confirmedList,
                rejectedList: data.rejectedList,
            });
        }).finally(() => {
            setLoading(false)
        });
    }

    const showStatus = (status) => {
        if (status == 0)
            return "Pending";
        if (status == 1)
            return <><CustomFontAwesomeIcon
                color={'green'}
                icon={faCheckCircle}
            />Done</>;
        if (status == -1)
            return <><CustomFontAwesomeIcon
                color={'red'}
                icon={faBan}
            />Rejected</>;
        return "";
    }



    const cancelRejectedWithdraw = (id) => {
        setLoading(true)
        axios.post(
            'api/cancel-rejected-withdraw', { id: id }
        ).then((res) => {
            dispatch(showMessage({
                message: 'successfully canceled',
                variant: 'success',
            }));
            getAllWithdraws()
        }).finally(() => {
            setLoading(false)
        });
    }

    const rejectWithdraw = (id) => {
        setLoading(true)
        axios.post(
            'api/reject-withdraw', { id: id }
        ).then((res) => {
            dispatch(showMessage({
                message: 'successfully rejected',
                variant: 'success',
            }));
            getAllWithdraws()
        }).finally(() => {
            setLoading(false)
        });
    }
    const deleteWithdraw = (id) => {
        setLoading(true)
        axios.post(`api/delete-withdraw/${id}`).then((res) => {
            dispatch(showMessage({
                message: 'successfully deleted',
                variant: 'success',
            }));
            getAllWithdraws()
        }).finally(() => {
            setLoading(false)
            setOpenAlertDelet(false)
        });
    }

    const showOperations = (id, status) => {
        if (status == 0)
            return <>
                <Button className='mx-8'
                    onClick={() => {
                        rejectWithdraw(id)
                    }}
                    variant='contained'
                    color='secondary'>Reject</Button>
            </>;
        if (status == -1)
            return <div className=' flex justify-between '>
                <button onClick={() => {
                    cancelRejectedWithdraw(id)
                }} className=' rounded-full  border-2 bg-[#65278b] leading-[0] h-[36px] w-[36px]'>
                    <CustomFontAwesomeIcon
                        color={'white'}
                        icon={faXmark}
                    />
                </button>
                <button onClick={() => { setOpenAlertDelet(true), setDeleteId(id) }} className=' rounded-full border-[#b71c1c] border-2 bg-[#df4331] leading-[0] h-[36px] w-[36px] ml-2'>
                    <CustomFontAwesomeIcon
                        color={'white'}
                        icon={faTrashCan}
                    />
                </button>
            </div>;

        return <></>

    }



    const showWithdrawList = (list) => {
        return (
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>User ID</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Wallet Balance</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Operations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {list.map((item, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.amount}</TableCell>
                                    <TableCell>{item.user.referral_code}
                                        <Link to={`/admin/user-info/${item.user.id}`} className="mx-10 "
                                            style={{ backgroundColor: '#fff', border: 'none' }}>
                                            <CustomFontAwesomeIcon
                                                color={themesConfig.default.palette.secondary.main}
                                                icon={faEye}
                                            />
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {showStatus(item.status)}
                                    </TableCell>
                                    <TableCell>{item.wallet?.balance}</TableCell>
                                    <TableCell>
                                        {new Date(item.created_at).toLocaleDateString()} {new Date(item.created_at).toLocaleTimeString()}
                                    </TableCell>
                                    <TableCell>{showOperations(item.id, item.status)}</TableCell>
                                </TableRow>
                            );
                        })}
                        {list.length === 0 && (
                            <TableRow>
                                <TableCell className='text-center' colSpan={6}>No record found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    const onDistributionComplete = () => {
        getAllWithdraws()
    }

    return (
        <>
            <CustomWaiting open={loading} message={"please Wait!"} />
            <HomeBackground img={5} />
            <div className='flex flex-col items-center p-24 sm:p-40 container opacity-90'>
                <div className='flex flex-col w-full max-w-4xl'>
                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            Pending Withdraw List
                        </CustomTitle>
                        <WalletConnectModule>
                            {/* <div className='flex justify-center w-full'><Web3Button/></div> */}
                            <div className={"w-full text-center"}>
                                <WalletConnectButton />
                            </div>
                            <div className='flex justify-center my-4'>
                                <PayValueModule onDistributionComplete={onDistributionComplete} list={state.pendingList} />
                            </div>
                        </WalletConnectModule>
                        {showWithdrawList(state.pendingList)}
                    </Paper>


                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            Confirmed Withdraw List
                        </CustomTitle>
                        {showWithdrawList(state.confirmedList)}
                    </Paper>

                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            Rejected Withdraw List
                        </CustomTitle>
                        {showWithdrawList(state.rejectedList)}
                    </Paper>

                </div>
            </div>
            <Dialog
                open={openAlertDelet}
                onClose={() => { }}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <DialogTitle className="text-center">
                    <CustomFontAwesomeIcon icon={faTrashCan} fontSize={48} color={"#b71c1c"} />
                </DialogTitle>
                <DialogContent className={"text-center"}>
                    <div className={"w-full bg-white px-12 flex flex-col gap-y-3 pb-6"} >
                        <span
                            className={"text-center font-bold text-xl"}>Do you want to delete this item?</span>
                        <br />
                        <Button variant="contained" color="success" onClick={() => {
                            deleteWithdraw(deleteId)
                        }}>Yes, I am sure.</Button>
                        <br />
                        <Button variant="contained" onClick={() => setOpenAlertDelet(false)}>No, I don't want to delete.</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default WithdrawList;
