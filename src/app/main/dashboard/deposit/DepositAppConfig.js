import MyGroupsDeposit from "./MyGroupsDeposit";
import MyReferralLinks from './MyReferralLinks';
import MyContracts from './MyContracts';
import ReferralBonus from './ReferralBonus';
import Award from './Award';

const PromoterAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'my-groups-deposit',
      element: <MyGroupsDeposit />,
    },
    {
      path: 'my-referral-links',
      element: <MyReferralLinks />,
    },
    {
      path: 'my-contracts',
      element: <MyContracts />,
    },
    {
      path: 'referral-bonus',
      element: <ReferralBonus />,
    },
    {
      path: 'award',
      element: <Award />,
    },

  ],
};

export default PromoterAppConfig;
