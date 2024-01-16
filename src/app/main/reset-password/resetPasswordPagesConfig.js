import { lazy } from 'react';
const ModernResetPasswordPage = lazy(() => import('./ModernResetPasswordPage'));


const resetPasswordPagesConfig = {
  settings: {
    layout: {
      style: 'homeLayout',
      config: {
        navbar: {
          display: true,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: true,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: 'password/reset',
      element: <ModernResetPasswordPage />,
    },
  ],
};

export default resetPasswordPagesConfig;
