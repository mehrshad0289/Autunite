import { useAccount, useContract, useSigner } from "wagmi";
import CustomWaiting from "app/shared-components/CustomWaiting";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { showMessage } from "app/store/fuse/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import WalletConnectButton from "app/main/dashboard/WalletConnectButton";
import WalletConnectModule from "app/main/dashboard/WalletConnectModule";
import Web3 from 'web3';
import AppContext from "app/AppContext";
import { selectUser } from 'app/store/userSlice';
import { getOldCollectionAbi, getOldCollectionAddress, getProviderAddress, getTransporterAbi, getTransporterAddress } from "app/main/dashboard/helper";
import { LoadingButton } from "@mui/lab";
function CheckNewContract({ canTransport, setCanTransport }) {
  const { address, isConnected } = useAccount();
  const dispatch = useDispatch();
  const [transportLoading, setTransportLoading] = useState(false);
  const [approveAndTransportLoading, setApproveAndTransportLoading] = useState(false);
  const [showeTransport, setShoweTransport] = useState(false);
  const oldCollectionAbi = getOldCollectionAbi()
  const oldCollectionAddress = getOldCollectionAddress()
  const transporterAddress = getTransporterAddress()
  const transporterAbi = getTransporterAbi()
  const providerAddress = getProviderAddress()
  const user = useSelector(selectUser);
  const web3 = new Web3(providerAddress);

  const singer = useSigner();
  const oldCollection = useContract({
    address: oldCollectionAddress,
    abi: oldCollectionAbi,
    signerOrProvider: singer.data,
  });
  const transporter = useContract({
    address: transporterAddress,
    abi: transporterAbi,
    signerOrProvider: singer.data,
  });

  const checkWalletIsConnected = () => {
    if (!isConnected) {
      dispatch(
        showMessage({
          message: "Wallet Not Connected!",
          variant: "error",
        })
      );
      return false;
    }
    return true;
  };

  useEffect(() => {
    async function checkTransportNft() {
      if (!checkWalletIsConnected()) {
        return;
      }
      const oldCollectionWeb3 = new web3.eth.Contract(oldCollectionAbi, oldCollectionAddress);
      try {
        await oldCollectionWeb3.methods.getApproved(user.data.id).call().then((res) => {

          if ((res == transporterAddress)) {
            setShoweTransport(true)
          }
        })
      } catch (err) {
        console.log(err, ('oldCollectionWeb3'))
      }

    }
    checkTransportNft()
  }, []);

  async function transportNft() {
    if (!checkWalletIsConnected()) {
      return;
    }
    // انتقال دارایی‌ها به کانترکت جدید
    // const transporter = new web3.eth.Contract(transporterAbi, transporterAddress);

    const oldCollectionWeb3 = new web3.eth.Contract(oldCollectionAbi, oldCollectionAddress);

    try {
      await oldCollectionWeb3.methods.getApproved(user.data.id).call().then((res) => {

        if ((res == transporterAddress)) {
          setShoweTransport(true)
        } else {
          approveAndTransport()
        }

      })
    } catch (err) {
      console.log(err, ('oldCollectionWeb3'))
    }

  }

  async function approveAndTransport() {
    setApproveAndTransportLoading(true)
    try {
      const resOldCollection = await oldCollection.approve(transporterAddress, user.data.id).then((res) => {
        res && setShoweTransport(true)
      })
    } catch (err) {
      console.log(err, 'err resOldCollection')
    } finally {
      setApproveAndTransportLoading(false)
    }

  }



  async function transport() {
    setTransportLoading(true)
    try {
      const resTranspoter = await transporter.transport().then((res) => {
        dispatch(
          showMessage({
            message: "transport oldContract to newContract successFully",
            variant: "success",
          })
        );
      })
      setCanTransport(false);
    } catch (err) {
      console.log(err, 'err resTranspoter')
    } finally {
      setTransportLoading(false);
    }
  }



  return (
    <>
      <Dialog
        open={canTransport}
        onClose={() => { }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <DialogContent className={"text-center"}>
          <WalletConnectModule>
            <div className={"w-full text-center pb-6"}>
              <WalletConnectButton />
            </div>
          </WalletConnectModule>
          <br />
          <div className={"w-full bg-white px-12 flex flex-col gap-y-3 pb-6"}>
            <span className={"text-center font-bold text-xl"}>
              Due to the deprecation of BUSD in the Binance network, the Autunite minter contract has been moved to USDT. Please transport your NFTs to withdraw ROIs in USDT.
            </span>
            <br />
            <LoadingButton
              className={'rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'}
              loadingIndicator={<CircularProgress color="secondary" size={16} />}
              loading={approveAndTransportLoading}
              loadingPosition="end"
              variant='contained'
              onClick={() => {
                transportNft();
              }}
              disabled={!showeTransport}
            >
              <span>approve</span>
            </LoadingButton>
            <br />
            <LoadingButton
              className={'rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'}
              loadingIndicator={<CircularProgress color="secondary" size={16} />}
              loading={transportLoading}
              loadingPosition="end"
              variant='contained'
              onClick={() => {
                transport()
              }}
              disabled={showeTransport}
            >
              <span>transport</span>
            </LoadingButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CheckNewContract;



