import { lazy } from 'react';

const FinanceDashboardApp = lazy(() => import('./FinanceDashboardApp'));

const FinanceDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'finance',
      element: <FinanceDashboardApp />,
    },
  ],
};

export default FinanceDashboardAppConfig;
