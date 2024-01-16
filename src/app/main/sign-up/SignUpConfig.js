import SignUpPage from './SignUpPage';
import authRoles from '../../auth/authRoles';

const SignUpConfig = {
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
  auth: null,
  routes: [
    {
      path: 'sign-up',
      element: <SignUpPage />,
    },
  ],
};

export default SignUpConfig;
