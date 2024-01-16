import SignInPage from './SignInPage';
import authRoles from '../../auth/authRoles';

const SignInConfig = {
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
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'sign-in',
      element: <SignInPage />,
    },
  ],
};

export default SignInConfig;
