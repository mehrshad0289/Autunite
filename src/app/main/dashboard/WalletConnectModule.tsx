import { bsc,bscTestnet } from 'wagmi/chains';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import React from 'react';
import { getChains } from './helper';

const projectId = '14657272d71b78f6d0813dfae6e2c242';
const chains = getChains();
const { provider } = configureChains(chains, [walletConnectProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({version: '2', appName: 'web3Modal', chains, projectId}),
  provider
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

export default function WalletConnectModule(props:any){
  return(
    <>
      <WagmiConfig client={wagmiClient}>
        {props.children}
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient}/>
      </>
  )
}