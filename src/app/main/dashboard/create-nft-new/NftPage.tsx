import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Modal, Paper} from '@mui/material';
import HomeBackground from '../../../shared-components/HomeBackground';
import ContractList from '../contract/ContractList';
import WalletConnectModule from '../WalletConnectModule';

import Guarantee from "./Guarantee";
import HaveNftPage from "./HaveNftPage";
import MyDepositLogs from "./MyDepositLogs";
import CreateNftPage from "./CreateNftPage";
import BuyNftPage from './BuyNftPage';
import PayupNftPage from "./PayupNftPage";
import axios from "axios";
import jwtServiceConfig from "../../../auth/services/jwtService/jwtServiceConfig";
import {showMessage} from "../../../store/fuse/messageSlice";
import {useDispatch} from "react-redux";
import CustomWaiting from "../../../shared-components/CustomWaiting";
import CustomFontAwesomeIcon from "../../../shared-components/CustomFontAwesomeIcon";
import {faCheckCircle, faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import history from '../../../../@history';
import WalletConnectButton from '../WalletConnectButton';

function NftPage() {
    const [openSecurityDialog, setOpenSecurityDialog] = useState(false);
    const handleOpenSecurityDialog = () => {
        setOpenSecurityDialog(true);
    };
    const handleCloseSecurityDialog = () => {
        setOpenSecurityDialog(false);
    };

    const dispatch = useDispatch();
    const [state, setState] = useState({
        loading: false,
        openDialog: false
    });

    const [nftData, setNftData] = useState(undefined);
    const [depositLogs,setDepositLogs] = useState([]);
    useEffect(() => {
        if (!localStorage.getItem('trust')){
            if (window.navigator.userAgent.indexOf("iPhone") >= 0) {
                handleOpenSecurityDialog();
            }
            if (window.navigator.userAgent.indexOf("Android") >= 0)
                handleOpenSecurityDialog();
        }

        refreshNft()
        refreshUserDepositLogs();


    }, []);

    function refreshUserDepositLogs() {
        setState({
            ...state,
            loading: true
        });
        axios.get(jwtServiceConfig.userDepositLogs, {})
            .then((response) => {
                const data = response.data.data;
                setDepositLogs(data)
            })
            .catch((error) => {
                dispatch(showMessage({
                    message: error.response.data.message,
                    variant: 'error',
                }));
            }).finally(()=>{
            setState({
                ...state,
                loading: false
            });
        });
    }

    const refreshNft = () => {
        setState({
            ...state,
            loading: true
        });
        axios.get(
            'api/nft',
        ).then((res) => {
            if (!res.data.data) {
                setNftData(undefined);
            } else {
                setNftData(res.data.data);
            }
        }).catch((error)=>{
            dispatch(showMessage({
                message: "Error in load NFT data.please try again",
                variant: 'error',
            }));
        }).finally(()=>{
            setState({
                ...state,
                loading: false
            });
        });
    }

    const handleCloseDialog = () => {
        setState({
            ...state,
            openDialog: false
        })
    }

    const gotoDashboard = () => {
        history.push("/dashboard")
    }

    const showDoneDialog = () => {
        setState({
            ...state,
            openDialog: true
        })
    }

    return (
        <>
            <Dialog
                open={state.openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Opertaion Succeed"}
                </DialogTitle>
                <DialogContent className={"text-center"}>
                    <CustomFontAwesomeIcon
                        color={'green'}
                        icon={faCheckCircle}
                        fontSize={48}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                    <Button onClick={gotoDashboard} autoFocus>
                        Go to dashboard
                    </Button>
                </DialogActions>
            </Dialog>
            <CustomWaiting open={state.loading} message={"please Wait!"}/>
            <HomeBackground img={5}/>
            <div className='flex flex-col items-center p-24 sm:p-40 container opacity-90'>
                <div className='flex flex-col w-full max-w-4xl'>
                    <Paper className='mt-24 sm:mt-36 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <WalletConnectModule>
                            <div className={"w-full text-center"}>
                                <WalletConnectButton/>
                            </div>

                            {!nftData && (
                                <CreateNftPage refresh={()=>{
                                    refreshNft();
                                    refreshUserDepositLogs();
                                }}/>
                            )}
                            {nftData && nftData.status == 0 && (
                                <BuyNftPage nftData={nftData} onSuccess={showDoneDialog} refresh={()=>{
                                    refreshNft();
                                    refreshUserDepositLogs();
                                }}/>
                            )}

                            {nftData && nftData.status == 1 && (
                                <>
                                    <HaveNftPage nftData={nftData}/>
                                    <PayupNftPage nftData={nftData} onSuccess={showDoneDialog} refresh={()=>{
                                        refreshNft();
                                        refreshUserDepositLogs();
                                    }}/>
                                </>
                            )}


                        </WalletConnectModule>
                    </Paper>

                    <MyDepositLogs depositLogs={depositLogs}/>

                    <ContractList/>

                    <Guarantee/>
                </div>
            </div>
            <Dialog
                open={openSecurityDialog}
                onClose={()=>{}}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <DialogTitle className="text-center">
                    <CustomFontAwesomeIcon icon={faExclamationCircle} fontSize={48} color={"#e5e711"}/>
                </DialogTitle>
                <DialogContent className={"text-center"}>
                    <div className={"w-full bg-white px-12 flex flex-col gap-y-3 pb-6"} >
                    <span className={"text-center"}>For more security, to make any transaction, you should<br/><span
                        className={"font-bold text-xl"}>Sing in from Trust Wallet app.</span></span>
                        <br/>
                        <Button variant="contained" color="success" onClick={() => {
                            window.location.replace('https://link.trustwallet.com/open_url?coin_id=20000714&url=https://autunite.ai/')
                        }}>Yes, send me to Trust Wallet.</Button>
                        <br/>
                        <Button variant="contained" onClick={handleCloseSecurityDialog}>No, I'm just watching.</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default NftPage;
