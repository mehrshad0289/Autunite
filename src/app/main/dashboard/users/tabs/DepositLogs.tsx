import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {motion} from 'framer-motion';
import React, {useEffect, useState} from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import CustomFontAwesomeIcon from "../../../../shared-components/CustomFontAwesomeIcon";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import TransactionInfoPage from "../../create-nft-new/TransactionInfoPage";
import CustomWaiting from "../../../../shared-components/CustomWaiting";
import {LoadingButton} from "@mui/lab";
import {CircularProgress} from "@mui/material";
import {useDispatch} from "react-redux";
import {showMessage} from "../../../../store/fuse/messageSlice";


function DepositLogs({userId}) {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        loading: false,
        isLoadingDeleteBtn: false,
    });
    const [data, setData] = useState([]);
    useEffect(() => {
        loadDeposits()
    }, []);

    const loadDeposits = () => {
        setState({
            ...state,
            loading: true
        })
        axios.get(`/api/user/${userId}/deposit-logs`).then((res) => {
            setData(res.data);
        }).finally(() => {
            setState({
                ...state,
                loading: false
            })
        });
    }

    const item = {
        hidden: {opacity: 0, y: 40},
        show: {opacity: 1, y: 0},
    };
    const getType = (type) => {
        if (type === "DEPOSIT_CREATE_NFT") {
            return "Buy NFT"
        } else if (type === "TOPUP") {
            return "Pay up"
        } else {
            return type
        }
    }

    const deleteOnClick = (id) => {
        setState({
            ...state,
            loading: true,
            isLoadingDeleteBtn: true
        })
        axios.post(`/api/delete-deposit`, {
            depositId: id
        }).then((res) => {
            dispatch(showMessage({
                variant: "success",
                message: 'Deleted Successfully'
            }))
            loadDeposits()
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
    return (
        <>
            <CustomWaiting open={state.loading} message={"please Wait!"}/>
            <Card component={motion.div} variants={item} className='w-full mb-32'>
                <div className='px-32 pt-24'>
                    <Typography className='text-2xl font-semibold leading-tight'>
                        Buy Nft & Pay Up History
                    </Typography>
                </div>

                <CardContent className='px-32 py-24'>
                    <TableContainer sx={{maxHeight: 440}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{textAlign: "center"}}>Operations</TableCell>
                                    <TableCell style={{textAlign: "center"}}>Status</TableCell>
                                    <TableCell style={{textAlign: "center"}}>Token ID</TableCell>
                                    <TableCell style={{textAlign: "center"}}>Creating Date</TableCell>
                                    <TableCell style={{textAlign: "center"}}>Amount</TableCell>
                                    <TableCell style={{textAlign: "center"}}>Type</TableCell>


                                    <TableCell style={{textAlign: "center"}}>Transaction Hash</TableCell>
                                    <TableCell style={{textAlign: "center"}}>Blockchain Query</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item, i) => {
                                    return (

                                        <TableRow key={i}>
                                            <TableCell style={{textAlign: "center"}}>
                                                <LoadingButton
                                                    className={'rounded-lg'}
                                                    loadingIndicator={<CircularProgress color="secondary"
                                                                                        size={16}/>}
                                                    loading={state.isLoadingDeleteBtn}
                                                    loadingPosition="end"
                                                    variant='contained'
                                                    color='info'
                                                    onClick={() => {
                                                        deleteOnClick(item.id)
                                                    }}
                                                    disabled={state.isLoadingDeleteBtn || item.status == 1}
                                                >
                                                    <span>Delete</span>
                                                </LoadingButton>
                                            </TableCell>
                                            <TableCell style={{textAlign: "center"}}>
                                                {item.status == 0 ?
                                                    (<>Pending</>) :
                                                    (item.status == 1 ?
                                                        <>Done<CustomFontAwesomeIcon
                                                            color={'green'}
                                                            icon={faCheckCircle}
                                                        /></> :
                                                        '')}
                                            </TableCell>
                                            <TableCell style={{textAlign: "center"}}>{item.user_id}</TableCell>
                                            <TableCell style={{textAlign: "center"}}>
                                                {new Date(item.created_at).toLocaleDateString()} {new Date(item.created_at).toLocaleTimeString()}
                                            </TableCell>
                                            <TableCell style={{textAlign: "center"}}>{item.amount}</TableCell>
                                            <TableCell
                                                style={{textAlign: "center"}}>{getType(item.type)}</TableCell>

                                            <TableCell style={{textAlign: "center"}}>
                                                <TransactionInfoPage transactionHash={item.transaction_hash}/>
                                            </TableCell>
                                            <TableCell style={{textAlign: "center"}}>
                                                {item.status == 1 ? "Confirmed" : "Waiting"}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </>
    );
}

export default DepositLogs;
