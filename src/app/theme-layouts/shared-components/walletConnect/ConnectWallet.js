import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import { Web3Button, Web3Modal, Web3NetworkSwitch } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig , useWebSocketProvider} from 'wagmi'
import { bsc} from 'wagmi/chains'
import {setAccount, setProvider} from "../../../store/fuse/accountSlice";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import Web3 from 'web3';


export default function ConnectWallet(){
    // const [test,setTest] = useState(undefined);
    // const dispatch = useDispatch()
    // const projectId = '33a6cf36cf910c526e39a3ea1e5d6ad0'
    //
    // const chains = [bscTestnet]
    //
    //
    // const { provider } = configureChains(chains, [walletConnectProvider({ projectId })])
    // const wagmiClient = createClient({
    //     autoConnect: true,
    //     connectors: modalConnectors({ version: '1', appName: 'web3Modal', chains, projectId }),
    //     provider
    // })
    // const webSocketProvider = useWebSocketProvider()
    // // const singer = useSigner()
    //
    // const ethereumClient = new EthereumClient(wagmiClient, chains)
    // useEffect(()=>{
    //     dispatch(setAccount(ethereumClient.getAccount().address))
    //     dispatch(setProvider(webSocketProvider))
    //     // console.log(webSocketProvider)
    // })
    //
    // const testE = async (event)=>{
    //     console.log(webSocketProvider)
    //     console.log(wagmiClient.provider.connection.url)
    //     const web3 = new Web3.providers.HttpProvider(wagmiClient.provider.connection.url)
    // }


    return(
      <>
          {/*<WagmiConfig client={wagmiClient}>*/}
          {/*    <Web3Button onClick={testE}/>*/}
          {/*    <br />*/}
          {/*</WagmiConfig>*/}

          {/*<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />*/}
      </>
    )
}
