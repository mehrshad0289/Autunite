import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import {
    getContractAbi,
    getContractAddress,
    getUSDContractAbi,
    getUSDContractAddress,
} from "../helper";
import {
    useAccount,
    useContract,
    useSigner,
} from "wagmi";
import { useDispatch } from "react-redux";
import { showMessage } from "../../../store/fuse/messageSlice";
import { LoadingButton } from "@mui/lab";

import axios from "axios";
import { parseEther, parseUnits } from "viem";

function PayValueModule({ list, onDistributionComplete }) {
    const amountInputRef = useRef(null);
    const dispatch = useDispatch();
    const account = useAccount();
    const singer = useSigner();
    const [amountsValue, setAmountsValue] = useState<string>('')
    const computeDefaultValue = () => {
        let amount = 0;
        list.forEach(x => {
            amount += parseFloat(x.amount) - 1;
        })
        setAmountsValue(parseEther(amount.toString()).toString())
        return amount
    }

    useEffect(() => {
        computeDefaultValue()
        setState({
            ...state,
            amountValue: computeDefaultValue()
        })
    }, [list])
    const [state, setState] = useState({
        approveBtnStatus: true,
        approveBtnLoading: false,
        showCreateBtn: false,
        amountValue: undefined,
        imageSelected: false,
        inputError: false,
        approveBtnText: "Approve Pay",
        loading: false,
    });

    const USDContract = useContract({
        address: getUSDContractAddress(),
        abi: getUSDContractAbi(),
        signerOrProvider: singer.data,
    });
    const contract = useContract({
        address: getContractAddress(),
        abi: getContractAbi(),
        signerOrProvider: singer.data,
    });

    const checkAndApprove = async () => {
        const amountValue = parseEther(amountInputRef.current.value);

        if (!amountValue) {
            dispatch(
                showMessage({
                    message: "Enter Value !",
                    variant: "error",
                })
            );
            return;
        }

        if (!account.address) {
            dispatch(
                showMessage({
                    message: "Wallet Not Connected!",
                    variant: "error",
                })
            );
            return;
        }

        setState({
            ...state,
            approveBtnStatus: false,
            approveBtnLoading: true,
        });
        const allowance = await USDContract.allowance(
            account.address,
            getContractAddress()
        );

        if (BigInt(allowance.toString()) >= amountValue) {
            setState({
                ...state,
                approveBtnText: "Approved",
                showCreateBtn: true,
                approveBtnStatus: false,
                approveBtnLoading: false,
            });
            return;
        }
        setState({
            ...state,
            approveBtnText: "Approving",
        });

        try {
            let approve = await USDContract.approve(
                getContractAddress(),
                amountValue
            ).then((res) => res);
            await approve.wait().then((r) => {
                setState({
                    ...state,
                    approveBtnText: "Approved",
                    approveBtnStatus: false,
                    approveBtnLoading: false,
                    showCreateBtn: true,
                });
            });
            USDContract.on("error", (event) => {
                setState({
                    ...state,
                    approveBtnText: "Approve",
                    approveBtnStatus: true,
                    approveBtnLoading: false,
                });
            });
        } catch (e) {
            if (e.code === "ACTION_REJECTED") {
                dispatch(
                    showMessage({
                        message: "User denied transaction signature.",
                        variant: "error",
                    })
                );
            }
            setState({
                ...state,
                approveBtnText: "Approve",
                approveBtnStatus: true,
                approveBtnLoading: false,
            });
        }
    };

    const CallToPay = async (event) => {

        if (!account.address) {
            dispatch(
                showMessage({
                    message: "Wallet Not Connected!",
                    variant: "error",
                })
            );
            return;
        }

        let listOfId = [];
        let listOfAmount = [];
        list.forEach(item => {
            listOfId.push(item.user_id);
            let formattedAmount = parseEther(item.amount) - parseEther('1')
            listOfAmount.push(formattedAmount);
        });
        try {
            let distribute = await contract.distribute(listOfId, listOfAmount, amountsValue, getUSDContractAddress()).then((res) => res);
            await distribute.wait().then((r) => {
                setTimeout(() => {
                    axios
                        .post("api/done-withdraws", {
                            withdraws: list.map(x => x.id)
                        })
                        .then((res) => {
                            setState({
                                ...state,
                                loading: false,
                            });
                            dispatch(
                                showMessage({
                                    message: "Pay Out Successful.",
                                    variant: "success",
                                })
                            );
                            onDistributionComplete && onDistributionComplete()
                        })
                        .catch((err) => {
                            dispatch(
                                showMessage({
                                    variant: "error",
                                    message: err.response.data.message,
                                })
                            );
                            setState({
                                ...state,
                                loading: false,
                            });
                        });
                }, 2000);
            });
        } catch (e) {
            if (e.code === "ACTION_REJECTED") {
                dispatch(
                    showMessage({
                        message: "User denied transaction signature.",
                        variant: "error",
                    })
                );
            } else {
                console.log(e)
                dispatch(
                    showMessage({
                        message: "Something went wrong.",
                        variant: "error",
                    })
                );
            }
        }
    };

    return (
        <>
            <div className="flex justify-center w-full">
                <div className="border rounded-lg p-4 flex flex-col sm:flex-row items-center sm:gap-3 gap-5">
                    <OutlinedInput
                        type="number"
                        name="amount"
                        value={state.amountValue}
                        inputRef={amountInputRef}
                        disabled={true}
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                    />
                    <FormControl variant="standard">
                        <InputLabel htmlFor="sum">Sum Transaction Fee</InputLabel>
                        <OutlinedInput
                            value={list.length}
                            disabled={true}
                            id="sum"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl>
                    <LoadingButton
                        className={
                            "rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full sm:w-[unset]"
                        }
                        loadingIndicator="Approve…"
                        loading={state.approveBtnLoading}
                        variant="contained"
                        color="info"
                        onClick={checkAndApprove}
                        disabled={!state.approveBtnStatus}
                    >
                        <span className="text-sm md:text-md">{state.approveBtnText}</span>
                    </LoadingButton>

                    <LoadingButton
                        className={
                            "rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full sm:w-[unset]"
                        }
                        loading={state.loading}
                        loadingIndicator="Approve…"
                        variant="contained"
                        color="info"
                        onClick={CallToPay}
                    >
                        <span className="text-sm md:text-md">Call Payment</span>
                    </LoadingButton>
                </div>
            </div>
        </>
    );
}
export default PayValueModule;
