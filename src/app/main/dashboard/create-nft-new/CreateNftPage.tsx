import React, { useEffect, useRef, useState } from "react";
import CustomWaiting from "../../../shared-components/CustomWaiting";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import { LoadingButton } from "@mui/lab";
import { CircularProgress } from "@mui/material";
import { showMessage } from "../../../store/fuse/messageSlice";
import { getContractAbi, getContractAddress, getUSDContractAbi, getUSDContractAddress } from "../helper";
import { formatEther, parseEther } from "viem";
import { useDispatch, useSelector } from "react-redux";
import { useAccount, useContract, useSigner } from "wagmi";
import axios from "axios";
import { selectUser } from "../../../store/userSlice";
import NftImagePage from "./NftImagePage";
import { AutuniteLogError } from "../../../global/SharedFunctions";

const CreateNftPage = ({ refresh }) => {
    const [imagePreview, setImagePreview] = useState('./assets/images/dashboard/create-an-nft.jpg');
    const amountInputRef = useRef<any>(0);
    const [state, setState] = useState({
        isActiveCreateNftBtn: true,
        isLoadingCreateNftBtn: false,
        amountValue: undefined,
        imageSelected: false,
        amountInputHasError: false,
        createNftBtnText: 'Create Nft',
        loading: false,
        showCreateNftBtn: false
    });

    const singer = useSigner();
    const dispatch = useDispatch();
    const { address, isConnected } = useAccount();
    const USDContract = useContract({
        address: getUSDContractAddress(),
        abi: getUSDContractAbi(),
        signerOrProvider: singer.data,
    });

    const fileRef = useRef(null);
    const formRef = useRef(null);

    const checkImageIsSelected = () => {
        if (!state.imageSelected) {
            dispatch(showMessage({
                message: 'Please Select Nft Picture!',
                variant: "error"
            }));
            return false;
        }
        return true
    }

    const checkAmountIsValid = () => {
        setState({
            ...state,
            amountInputHasError: false
        });
        const amountValue = amountInputRef.current.value;
        if (!amountValue) {
            setState({
                ...state,
                amountInputHasError: true
            });
            dispatch(showMessage({
                message: 'Please Enter Valuation!',
                variant: "error"
            }));
            return false;
        }
        if (amountValue < 30) {
            setState({
                ...state,
                amountInputHasError: true,
            });
            dispatch(showMessage({
                message: 'Please Enter Valid Valuation! (Minimum Value 30$)',
                variant: 'error',
            }));
            return false;
        }
        return true
    }

    const checkWalletIsConnected = () => {
        if (!isConnected) {
            dispatch(showMessage({
                message: 'Wallet Not Connected!',
                variant: "error"
            }));
            return false;
        }
        return true
    }

    const checkAndApprove = async () => {
        const amountValue = amountInputRef.current.value;
        if (!checkImageIsSelected()) {
            return;
        }
        if (!checkAmountIsValid()) {
            return;
        }
        if (!checkWalletIsConnected()) {
            return;
        }
       

        try {
            setState({
                ...state,
                isActiveCreateNftBtn: false,
                isLoadingCreateNftBtn: true,
            });  
         const check = await USDContract.allowance(address, getContractAddress())
            if (parseInt(formatEther(check)) >= amountValue) {
                setState({
                    ...state,
                    createNftBtnText: 'Approved',
                    isActiveCreateNftBtn: false,
                    isLoadingCreateNftBtn: false,
                });
                submitForm();
                return;
            }

            setState({
                ...state,
                createNftBtnText: 'Approving',
                isLoadingCreateNftBtn: true,
                isActiveCreateNftBtn: false,
            });

            try {
                let approve = await USDContract.approve(getContractAddress(), parseEther(`${amountValue}`)).then(res => res);
                await approve.wait().then(r => {
                    setState({
                        ...state,
                        createNftBtnText: 'Approved',
                        isActiveCreateNftBtn: false,
                        isLoadingCreateNftBtn: false,
                    });
                    submitForm();
                }).catch((e) => {
                    AutuniteLogError("ERROR01", e)
                    setState({
                        ...state,
                        createNftBtnText: 'Create Nft',
                        isActiveCreateNftBtn: true,
                        isLoadingCreateNftBtn: false,
                    });
                    dispatch(showMessage({
                        message: 'Error in approving.please try again',
                        variant: 'error',
                    }));
                })
                USDContract.on('error', (event) => {
                    AutuniteLogError("ERROR02", event)
                    setState({
                        ...state,
                        createNftBtnText: 'Create Nft',
                        isActiveCreateNftBtn: true,
                        isLoadingCreateNftBtn: false,
                    });
                });
            } catch (e) {
                AutuniteLogError("ERROR03", e)
                if (e.code === 'ACTION_REJECTED') {
                    dispatch(showMessage({
                        message: 'User denied transaction signature.',
                        variant: 'error',
                    }));
                }
                setState({
                    ...state,
                    createNftBtnText: 'Create Nft',
                    isActiveCreateNftBtn: true,
                    isLoadingCreateNftBtn: false,
                });
            }
        } catch (e) {
            AutuniteLogError("ERROR04", e)
            setState({
                ...state,
                createNftBtnText: 'Create Nft',
                isActiveCreateNftBtn: true,
                isLoadingCreateNftBtn: false,
            });
        }


    };

    const createNFT = async (event) => {
        event.preventDefault();
        const amount = amountInputRef.current.value;
        if (!checkWalletIsConnected()) {
            return;
        }
        if (!checkAmountIsValid()) {
            return
        }
        if (!checkImageIsSelected()) {
            return;
        }

        try {
            setState({
                ...state,
                amountInputHasError: false,
                loading: true
            });

            const data = new FormData()
            data.append('image', event.target.image.files[0])
            data.append('amount', amount.toString())        
            axios.post(
                'api/deposit-and-create-nft',
                data,
            ).then(res => {              
                dispatch(showMessage({
                    message: res.data.message,
                    variant: "success"
                }))
                refresh()
            }).catch((e) => {
                AutuniteLogError("ERROR05", e)
                submitForm();
            }).finally(() => {
                setState({
                    ...state,
                    loading: false
                });
            });
        } catch (e) {
            AutuniteLogError("ERROR06", e)
        }
    };

    const changeImage = (event) => {
        let file = event.target.files[0]
        event.preventDefault();
        const fileSizeKiloBytes = file.size / 1024;
        const MAX_FILE_SIZE = 20480;
        if (!event.target.files || !file) {
            dispatch(showMessage({
                message: 'File invalid',
                variant: 'error',
            }));
            return;
        }
        if (fileSizeKiloBytes > MAX_FILE_SIZE) {
            setState({
                ...state,
                imageSelected: false,
            });
            dispatch(showMessage({
                message: 'Max File Size 20MB',
                variant: 'error',
            }));
            return;
        }
        setState({
            ...state,
            imageSelected: true,
        });
        setImagePreview(URL.createObjectURL(file));

    };


    const submitForm = () => {
        formRef.current.dispatchEvent(
            new Event("submit", { bubbles: true, cancelable: true })
        )
    }


    return (
        <>
            <CustomWaiting open={state.isLoadingCreateNftBtn || state.loading} message={"please Wait!"} />
            <div className={'text-center'}>
            </div>
            <br />
            <form onSubmit={createNFT} ref={formRef}>
                <div className={'text-center'}>
                    <h2>Create a NFT</h2>
                </div>
                <div className={'grid sm:grid-cols-1 md:grid-cols-2 max-w-sm:grid-flow-row gap-4'}>
                    <label className='hover11 column z-0 flex justify-center'>
                        <figure>
                            <NftImagePage previewImage={imagePreview} contentWidth={250} contentHeight={250} />
                        </figure>
                    </label>
                    <div className={'w-full text-center flex flex-col justify-center mt-8'}>
                        <div className={'pt-4 mt-10 mb-10'}>
                            <input type='file' className={'w-fit'} accept='image/png, image/gif, image/jpeg'
                                name='image'
                                id='image'
                                style={{ display: "none" }}
                                onChange={changeImage}
                                ref={fileRef}
                            />
                            <label
                                className={'rounded-lg pt-6 px-6 text-white p-4 font-bold text-xl bg-gradient-to-r from-green-400 duration-300 to-blue-500 hover:from-pink-500 hover:to-yellow-500'}
                                htmlFor='image'>Choose a NFT Image</label>
                        </div>
                        <br />
                        <br />
                        <br />
                        <FormControl fullWidth>
                            <InputLabel htmlFor='outlined-adornment-amount'
                                error={state.amountInputHasError}>Valuation</InputLabel>
                            <OutlinedInput
                                type='text'
                                inputProps={{
                                    min: '30',
                                }}
                                error={state.amountInputHasError}
                                name='amount'
                                inputRef={amountInputRef}
                                id='outlined-adornment-amount'
                                startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                                label='Amount'
                            />
                        </FormControl>

                        <br />
                        <div className='flex px-12'>
                            <Typography className='mb-4'>
                                Minimum Value
                            </Typography>
                            <Typography className='px-10' variant='caption' color='text.secondary'>
                                30$
                            </Typography>
                        </div>

                        <div className={'text-center mt-2 grid gap-3'}>
                            <LoadingButton
                                className={'rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'}
                                loadingIndicator={<CircularProgress color="secondary" size={16} />}
                                loading={state.isLoadingCreateNftBtn}
                                loadingPosition="end"
                                variant='contained'
                                color='info'
                                onClick={checkAndApprove}
                                disabled={!state.isActiveCreateNftBtn}
                            >
                                {/* successfully deposited */}
                                <span>{state.createNftBtnText}</span>
                            </LoadingButton>

                            {state.showCreateNftBtn ?
                                <LoadingButton
                                    className={'rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'}
                                    color='info'
                                    loadingIndicator={<CircularProgress color="secondary" size={16} />}
                                    loadingPosition="end"
                                    loading={state.loading}
                                    type={'submit'}
                                    variant='contained'
                                >
                                    <span>Try Again</span>
                                </LoadingButton>
                                : ''}
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateNftPage;
