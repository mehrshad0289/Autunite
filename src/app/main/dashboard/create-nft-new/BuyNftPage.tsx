import React, {useState} from "react";
import CustomWaiting from "../../../shared-components/CustomWaiting";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import {LoadingButton} from "@mui/lab";
import {CircularProgress} from "@mui/material";
import {faCheckCircle, faSpinner} from "@fortawesome/free-solid-svg-icons";
import CustomFontAwesomeIcon from "../../../shared-components/CustomFontAwesomeIcon";
import TextField from "@mui/material/TextField";
import {Controller} from "react-hook-form";
import {parseEther} from "viem";
import axios from "axios";
import {showMessage} from "../../../store/fuse/messageSlice";
import {useAccount, useContract, useSigner} from "wagmi";
import {getContractAbi, getContractAddress,getUSDContractAddress} from "../helper";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../../store/userSlice";
import NftImagePage from "./NftImagePage";
import {AutuniteLogError} from "../../../global/SharedFunctions";

const initialStatusText = "Waiting for payment";

const BuyNftPage = ({nftData, refresh, onSuccess}) => {
    const [state, setState] = useState({
        isLoadingBuyNftBtn: false,
        buyNftBtnText: 'Buy NFT',
        loading: false,
        retryCount: 0,
        statusText: initialStatusText
    });
    const [imagePreview, setImagePreview] = useState(`${process.env.REACT_APP_BACKEND_URL}/${nftData.image_url}`);
    const singer = useSigner();
    const contract = useContract({
        address: getContractAddress(),
        abi: getContractAbi(),
        signerOrProvider: singer.data,
    });


    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const {address, isConnected} = useAccount();

    const buyNft = async (event) => {
        event.preventDefault();
        const amount = nftData.amount;
        if (!isConnected) {
            dispatch(showMessage({
                message: 'Wallet Not Connected!',
                variant: "error"
            }));
            return;
        }
        if (!amount) {
            dispatch(showMessage({
                message: 'Please Enter Valuation!',
                variant: "error"
            }));
        }
        if (amount < 30) {
            dispatch(showMessage({
                message: 'Minimum Valuation 30$!',
                variant: "error"
            }));
            return;
        }

        try {
            setState({
                ...state,
                loading: true,
                statusText: "Waiting for blockchain confirmation"
            });
            let deposit = await contract.MintAndPay('1',user.data.id, parseEther(`${amount}`) ,getUSDContractAddress(),address).then(res => res)
            await deposit.wait().then(res => {
                setTimeout(() => {
                    depositCallBack(res.from, res.transactionHash)
                }, 2000);
            }).catch((e) => {
                AutuniteLogError("ERROR08", e)
                setState({
                    ...state,
                    loading: false,
                    statusText: initialStatusText
                });
                dispatch(showMessage({
                    message: 'Error in deposit',
                    variant: "error"
                }));
            })

        } catch (e) {
            AutuniteLogError("ERROR07", e)
            setState({
                ...state,
                loading: false,
                statusText: initialStatusText
            });
            dispatch(showMessage({
                message: 'Error in buy nft',
                variant: "error"
            }));

        }
    }


    const depositCallBack = (owner, transactionHash) => {

        try {
            setState({
                ...state,
                loading: true,
                retryCount: state.retryCount + 1
            });
            const data = new FormData()
            data.append('owner', owner)
            data.append('transaction_hash', transactionHash)
            axios.post(
                'api/deposit-callback',
                data,
            ).then(res => {
                dispatch(showMessage({
                    message: res.data.message,
                    variant: "success"
                }))
                if (res.data.data.status) {
                    refresh()
                    onSuccess()
                } else {
                    setTimeout(() => {
                        checkAlreadyPaid()
                    }, 2000);
                }
            }).catch((e) => {
                AutuniteLogError("ERROR10",e)
                if (state.retryCount < 10) {
                    setTimeout(() => {
                        depositCallBack(owner, transactionHash)
                    }, 2000);
                } else {
                    setState({
                        ...state,
                        loading: false
                    });
                    checkAlreadyPaid();
                }
            })
        }catch (err){
            setState({
                ...state,
                loading: false,
            });
            AutuniteLogError("ERROR09",err)
        }
    }

    const removeNftData = () => {
        setState({
            ...state,
            loading: true
        });
        axios.post(
            'api/remove-nft',
            {
                nftId: nftData.id
            },
        ).then(res => {
            dispatch(showMessage({
                message: "Successfully updated.create NFT again",
                variant: "success"
            }))
            refresh()
        }).catch((e) => {
            dispatch(showMessage({
                message: "Please try again",
                variant: "error"
            }));

        }).finally(() => {
            setState({
                ...state,
                loading: false
            });
        });

    }

    const checkAlreadyPaid = () => {
        setState({
            ...state,
            loading: true
        });
        axios.post(
            'api/check-nft',
            {
                nftId: nftData.id
            },
        ).then(res => {
            dispatch(showMessage({
                message: "blockchain confirmation is successfull.",
                variant: "success"
            }))
            refresh()
        }).catch((e) => {
            dispatch(showMessage({
                message: "Your NFT status is pending.please pay.",
                variant: "error"
            }));

        }).finally(() => {
            setState({
                ...state,
                loading: false
            });
        });
    }

    return (
        <>
            <CustomWaiting open={state.isLoadingBuyNftBtn || state.loading} message={"please Wait!"}/>
            <div className={'text-center'}>
            </div>
            <br/>
            <form onSubmit={buyNft}>
                <div className={'text-center'}>
                    <h2>Buy Nft</h2>
                </div>
                <div className={'grid sm:grid-cols-1 md:grid-cols-2 max-w-sm:grid-flow-row gap-4'}>
                    <label className='hover11 column z-0 flex justify-center'>
                        <figure>
                            <NftImagePage previewImage={imagePreview} contentWidth={250} contentHeight={250}/>
                        </figure>
                    </label>
                    <div className={'w-full text-center flex flex-col justify-center mt-8'}>

                        <br/>
                        <div className='flex px-12'>
                            <Typography className='mb-4'>
                                Status:
                            </Typography>
                            <Typography className='px-10' variant='caption' color='text.secondary'>
                                {state.statusText} <CustomFontAwesomeIcon
                                color={'green'}
                                icon={faSpinner}
                                fontSize={8}
                            />
                            </Typography>
                        </div>
                        <div className='flex px-12'>
                            <Typography className='mb-4'>
                                Creation Time:
                            </Typography>
                            <Typography className='px-10' variant='caption' color='text.secondary'>
                                {new Date(nftData.created_at).toLocaleDateString()} {new Date(nftData.created_at).toLocaleTimeString()}
                            </Typography>
                        </div>
                        <br/>

                        <FormControl fullWidth>
                            <InputLabel htmlFor='outlined-adornment-amount'>Valuation</InputLabel>
                            <OutlinedInput
                                type='text'
                                disabled={true}
                                name='amount'
                                value={nftData.amount}
                                id='outlined-adornment-amount'
                                startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <LoadingButton
                                            color='secondary'
                                            aria-label='Sign in'
                                            onClick={removeNftData}
                                            variant='contained'
                                            size='small'
                                        >
                                            <span>Change</span>
                                        </LoadingButton>
                                    </InputAdornment>
                                }
                                label='Amount'
                            />
                        </FormControl>

                        <br/>

                        <div className={'text-center mt-2 grid gap-3'}>
                            <LoadingButton
                                className={'rounded-lg  via-purple-500'}
                                variant='contained'
                                style={{backgroundColor: "#b1b1b1", color: "#000000ba"}}
                                disabled={true}
                            >
                                <span>Approved</span>
                            </LoadingButton>
                            <LoadingButton
                                className={'rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'}
                                color='info'
                                loadingIndicator={<CircularProgress color="secondary" size={16}/>}
                                loadingPosition="end"
                                //loading={state.loading}
                                type={'submit'}
                                variant='contained'
                            >
                                <span>{state.buyNftBtnText}</span>
                            </LoadingButton>


                        </div>
                        <br/>
                        <br/>
                        <div className='grid px-12 gap-3'>
                            <Typography className='mb-4'>
                                You have already paid?
                            </Typography>
                            <LoadingButton
                                className={'rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'}
                                color='info'
                                loadingIndicator={<CircularProgress color="secondary" size={16}/>}
                                onClick={checkAlreadyPaid}
                                loadingPosition="end"
                                variant='contained'
                                size={"small"}
                            >
                                <span>Check now</span>
                            </LoadingButton>
                        </div>

                    </div>
                </div>

                <br/>
            </form>
        </>
    )
}


export default BuyNftPage;
