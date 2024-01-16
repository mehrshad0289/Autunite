import withReducer from "app/store/withReducer";
import { useContext, useEffect, useMemo, useState } from "react";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { motion } from "framer-motion";
import reducer from "./store";
import WalletsHeader from "./WalletsHeader";
import AccountBalanceWidget from "./widgets/AccountBalanceWidget";
import RecentTransactionsWidget from "./widgets/RecentTransactionsWidget";
import { useParams } from "react-router-dom";
import axios from "axios";
import HomeBackground from "../../../shared-components/HomeBackground";
import history from "@history";
import CustomWaiting from "app/shared-components/CustomWaiting";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useAccount, useContract } from "wagmi";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import CustomFontAwesomeIcon from "app/shared-components/CustomFontAwesomeIcon";
import WalletConnectModule from "../WalletConnectModule";
import WalletConnectButton from "../WalletConnectButton";
import { showMessage } from "app/store/fuse/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import CheckNewContract from "app/shared-components/CheckNewContract";
import Web3 from 'web3';
import { selectUser } from 'app/store/userSlice';
import { getOldCollectionAbi, getOldCollectionAddress, getProviderAddress, getTransporterAbi, getTransporterAddress } from "../helper";

function Wallet() {
  const [loading, setLoading] = useState(true);
  const [canTransport, setCanTransport] = useState();
  const { slug } = useParams();
  const { address, isConnected } = useAccount();
  const [wallet, setWallet] = useState(undefined);
  const dispatch = useDispatch();
  const oldCollectionAbi = getOldCollectionAbi()
  const transporterAbi = getTransporterAbi()
  const providerAddress = getProviderAddress()
  const oldCollectionAddress = getOldCollectionAddress()
  const transporterAddress = getTransporterAddress()
  const user = useSelector(selectUser);

  useEffect(() => {
    axios.get(`/api/wallet/${slug}`).then((res) => {
      setWallet(res.data.data);
      // setLoading(false);
      // setcanTransport(true);
    });
    async function checkCanTransport() {
      // اتصال به بلاکچین
      const web3 = new Web3(providerAddress);
      // آدرس کاربر
      const userAddress = address;

      // بارگیری کانترکت قدیمی
      const transporter = new web3.eth.Contract(transporterAbi, transporterAddress);

      // بررسی وضعیت کانترکت
      try {
        const canTransport = await transporter.methods.canTransport(user.data.id).call();
        setCanTransport(canTransport);
        setLoading(false);
      } catch (err) {
        console.log(err,'err Wallet canTransport')
      }finally {
        setLoading(false);
      }
    }
    checkCanTransport()
  }, []);



  return (
    <>
      <CustomWaiting open={loading} message={"please Wait!"} />
      <HomeBackground img={6} />
      <FusePageSimple
        header={<WalletsHeader />}
        content={
          <div className="w-full px-24 md:px-32 pb-24">
            {useMemo(() => {
              const container = {
                show: {
                  transition: {
                    staggerChildren: 0.06,
                  },
                },
              };

              const item = {
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              };

              return (
                wallet && (
                  <motion.div
                    className="w-full"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-32 w-full mt-32">
                      <motion.div
                        variants={item}
                        className="flex flex-col flex-auto"
                      >
                        <AccountBalanceWidget {...wallet} />
                      </motion.div>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-32 w-full mt-32">
                      <motion.div
                        variants={item}
                        className="xl:col-span-2 flex flex-col flex-auto"
                      >
                        <RecentTransactionsWidget {...wallet} />
                      </motion.div>
                    </div>
                  </motion.div>
                )
              );
            }, [wallet])}
          </div>
        }
      />
      <WalletConnectModule>
        <CheckNewContract canTransport={canTransport} setCanTransport={setCanTransport} />
      </WalletConnectModule>
    </>
  );
}

export default withReducer("walletsDashboardApp", reducer)(Wallet);
