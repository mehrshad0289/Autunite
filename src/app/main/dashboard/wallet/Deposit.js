import { bsc } from 'wagmi/chains';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum';
import {  Web3Modal } from '@web3modal/react';
import DepositForm from './DepositForm';


function Deposit() {

  const projectId = '98892c264ced9efa7e5cf12925c0bf9a'
    const chains = [bsc]
    const { provider } = configureChains(chains, [walletConnectProvider({ projectId })])
    const wagmiClient = createClient({
        autoConnect: true,
        connectors: modalConnectors({ version: '1', appName: 'web3Modal', chains, projectId }),
        provider
    })
    const ethereumClient = new EthereumClient(wagmiClient, chains)


    return (
      <>
          <WagmiConfig client={wagmiClient}>
              <br />
              <br />
              <DepositForm/>
          </WagmiConfig>
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </>
    );
}

export default Deposit;
