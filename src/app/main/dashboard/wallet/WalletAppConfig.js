

import { lazy } from 'react';
import WithDraw from './WithDraw';
import Deposit from './Deposit';
import Transfer from './Transfer';

const Wallets = lazy(() => import('./Wallets'));
const Wallet = lazy(() => import('./Wallet'));

const WalletAppConfig = {

  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'wallets',
      element: <Wallets />,
    },
    {
      path: 'wallet/:slug',
      element: <Wallet />,
    },
    {
      path: 'withdraw/:slug',
      element: <WithDraw />,
    },
    {
      path: 'deposit/:slug',
      element: <Deposit />,
    },
    {
      path: 'transfer/:slug',
      element: <Transfer />,
    },
  ],
};

export default WalletAppConfig;
