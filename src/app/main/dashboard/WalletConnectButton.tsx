import {useWeb3Modal} from "@web3modal/react";
import React,{ useState, useContext, useEffect } from "react";
import {useAccount} from "wagmi";
import { CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CustomFontAwesomeIcon from "../../shared-components/CustomFontAwesomeIcon";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

export default function WalletConnectButton(){
  const {open,isOpen} = useWeb3Modal()
  const {isConnected,address} = useAccount();
  const [addressWallet, setAddressWallet] = useState('');
  const button = ()=>{
    open().then()
  }
  
  useEffect(() => {
     function addressShortenedString() {
      if(typeof address == 'string' ){
        setAddressWallet(address.substring(0, 4) + '...' + address.substring(address.length - 4)) 
      }
    }
    addressShortenedString()
  }, [isConnected]);
 



  return(
    <LoadingButton
      className={"text-sm"}
      loadingIndicator={<CircularProgress color="secondary" size={16} />}
      loadingPosition="end"
      loading={isOpen}
      variant='contained'
      color={isConnected?'success':'info'}
      onClick={button}
      disabled={isOpen}
    >
      {isConnected? <>
        Wallet Connected to {addressWallet && addressWallet}<CustomFontAwesomeIcon className="ml-8" color={'white'}
                                               icon={faCheckCircle} />
      </> : "Connect Wallet"}
    </LoadingButton>
    // <Button va onClick={button}> {isOpen?"Connecting..":""}{isConnected? "Connected" : "Connect Wallet"}</Button>
  )
}