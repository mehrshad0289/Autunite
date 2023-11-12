import React, {useRef, useState} from "react";
import CustomWaiting from "../../../shared-components/CustomWaiting";
import {CircularProgress, Paper} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import {LoadingButton} from "@mui/lab";
import {showMessage} from "../../../store/fuse/messageSlice";
import {parseEther} from "viem";
import axios from "axios";
import {useAccount, useContract, useSigner} from "wagmi";
import {useDispatch} from "react-redux";
import {getContractAbi, getContractAddress, getUSDContractAbi, getUSDContractAddress} from "../helper";

const PayupNftPage = ({nftData, refresh, onSuccess}) => {
    const [state, setState] = useState({
        approveBtnStatus: true,
        approveBtnLoading: false,
        loading: false,
        approveBtnText: 'Pay Up',
        showCreateBtn: false,
        isSuccess: false,
        inputError: false,
        showWaiting: false
    });
    const {address, isConnected} = useAccount();
    const amountInputRef = useRef<any>(0);
    const dispatch = useDispatch();
    const singer = useSigner();
    const contract = useContract({
        address: getContractAddress(),
        abi: getContractAbi(),
        signerOrProvider: singer.data,
    });
    const USDContract = useContract({
        address: getUSDContractAddress(),
        abi: getUSDContractAbi(),
        signerOrProvider: singer.data,
    });

    const topUp = async (event) => {
        event.preventDefault();
        const amount = event.target.amount.value;
        if (!isConnected) {
            dispatch(showMessage({
                message: 'Wallet Not Connected!',
                variant: 'error',
            }));
            return;
        }
        setState({
            ...state,
            inputError: false,
        });
        if (!amount) {
            setState({
                ...state,
                inputError: true,
            });
            dispatch(showMessage({
                message: 'Please Enter Valuation!',
                variant: 'error',
            }));
            return;
        }
        if (amount < 30) {
            setState({
                ...state,
                inputError: true,
            });
            dispatch(showMessage({
                message: 'Minimum Valuation 30$!',
                variant: "error"
            }));
        }

        setState({
            ...state,
            loading: true,
            showWaiting: true
        });
        try {
            let topUpDeposit = await contract.PayUp(nftData.user_id, parseEther(amount),getUSDContractAddress()).then(res => res);
            await topUpDeposit.wait().then(res => {
                const depositData = new FormData();
                depositData.append('transaction_hash', res.transactionHash);
                depositData.append('amount', amount);

                setTimeout(() => {
                    axios.post(
                        'api/topup',
                        depositData,
                    ).then(res => {
                        setState({
                            ...state,
                            loading: false,
                            showWaiting: false
                        });
                        dispatch(showMessage({
                            message: 'Pay Up Successful.',
                            variant: "success"
                        }));
                        refresh()
                        onSuccess();
                    }).catch((err) => {

                        dispatch(showMessage({
                            variant: 'error',
                            message: err.response.data.message,
                        }));
                        setState({
                            ...state,
                            loading: false,
                            showWaiting: false
                        });

                    });
                }, 2000);

            });

        } catch (e) {
            setState({
                ...state,
                loading: false,
                showWaiting: false
            });
        }


    };

    const checkAndApprove = async () => {
        const amountValue = amountInputRef.current.value;
        if (!isConnected) {
            dispatch(showMessage({
                message: 'Wallet Not Connected!',
                variant: 'error',
            }));
            return;
        }
        if (!amountValue) {
            setState({
                ...state,
                inputError: true,
            });
            dispatch(showMessage({
                message: 'Please Enter Valuation!',
                variant: 'error',
            }));
            return;
        }
        setState({
            ...state,
            approveBtnLoading: true,
            approveBtnStatus: false,
            showWaiting: true
        });
        const check = await USDContract.allowance(address, getContractAddress());
        if (parseInt(String(check._hex / 10 ** 18)) >= amountValue) {//TODO string isnew
            setState({
                ...state,
                approveBtnText: 'Approved',
                showCreateBtn: true,
                approveBtnLoading: false,
                approveBtnStatus: false,
                showWaiting: false
            });
            return;
        }
        setState({
            ...state,
            approveBtnLoading: true,
            approveBtnText: 'Approving',
            showWaiting: true
        });
        try {
            let approve = await USDContract.approve(getContractAddress(), parseEther(`${amountValue}`)).then(res => res);
            await approve.wait().then(r => {
                setState({
                    ...state,
                    approveBtnText: 'Approved',
                    approveBtnLoading: false,
                    approveBtnStatus: false,
                    showCreateBtn: true,
                    showWaiting: false
                });
            })
            USDContract.on('error', (event) => {
                setState({
                    ...state,
                    approveBtnText: 'Pay Up',
                    approveBtnLoading: false,
                    approveBtnStatus: true,
                    showWaiting: false
                });

            });
        } catch (e) {
            if (e.code === 'ACTION_REJECTED') {
                dispatch(showMessage({
                    message: 'User denied transaction signature.',
                    variant: 'error',
                }));
            }
            setState({
                ...state,
                approveBtnText: 'Pay Up',
                approveBtnLoading: false,
                approveBtnStatus: true,
                showWaiting: false
            });

        }


    };

    return (
        <>
            <CustomWaiting open={state.showWaiting} message={"please Wait!"}/>
            <div className='flex flex-col items-center sm:p-32 container'>
                <div className='flex flex-col w-full max-w-4xl'>
                    {nftData ? (<>
                        <Paper className='mt-32 sm:mt-40 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                            <div className={'text-center'}>
                                {/*<Web3Button/>*/}
                            </div>
                            <form onSubmit={topUp}>
                                <h2>Pay Up</h2>
                                <br/>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor='outlined-adornment-amount'
                                                error={state.inputError}>Valuation</InputLabel>
                                    <OutlinedInput
                                        error={state.inputError}
                                        name='amount'
                                        inputRef={amountInputRef}
                                        id='outlined-adornment-amount'
                                        startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                                        label='Amount'
                                    />
                                </FormControl>

                                <br/>
                                <br/>
                                <div className={'text-center mt-2 grid gap-3'}>
                                    <LoadingButton
                                        className={'rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'}
                                        loadingIndicator={<CircularProgress color="secondary" size={16}/>}
                                        loadingPosition="end"
                                        loading={state.approveBtnLoading}
                                        variant='contained'
                                        color='info'
                                        onClick={checkAndApprove}
                                        disabled={!state.approveBtnStatus}
                                    >
                                        <span>{state.approveBtnText}</span>
                                    </LoadingButton>


                                    {state.showCreateBtn ?
                                        <LoadingButton
                                            className={'rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'}
                                            loadingIndicator={<CircularProgress color="secondary" size={16}/>}
                                            loadingPosition="end"
                                            color='info'
                                            loading={state.loading}
                                            type={'submit'}
                                            variant='contained'
                                        >
                                            <span>Deposit</span>
                                        </LoadingButton>
                                        : ''}
                                </div>
                            </form>
                        </Paper>
                    </>) : (
                        <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                            <div className={'text-center'}>
                                <h2>You have not NFT, please create a NFT</h2>
                            </div>
                        </Paper>
                    )}


                    {/* <button onClick={testContract}>Test Button</button> */}

                </div>
            </div>
        </>
    )
}


export default PayupNftPage;
