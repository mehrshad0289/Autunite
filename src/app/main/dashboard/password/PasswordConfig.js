import FundPassword from './FundPassword';
import TwoFactorAuthenticator from './TwoFactorAuthenticator';
import ChangePassword from './ChangePassword';
import EmailConfirmation from './EmailConfirmation';

const PasswordConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'two-factor-authenticator',
      element: <TwoFactorAuthenticator />,
    },
    {
      path: 'change-password',
      element: <ChangePassword />,
    },
    {
      path: 'email-confirmation',
      element: <EmailConfirmation />,
    },
    {
      path: 'fund-password',
      element: <FundPassword />,
    },
  ],
};

export default PasswordConfig;
