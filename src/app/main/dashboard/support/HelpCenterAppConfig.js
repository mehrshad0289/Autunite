import HelpCenterSupport from './HelpCenterSupport';
import MyTickets from './MyTickets';
import authRoles from "../../../auth/authRoles";
const HelpCenterAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'support',
      element: <HelpCenterSupport />,
    },
    {
      path: 'my-tickets',
      element: <MyTickets />,
    },
  ],
};

export default HelpCenterAppConfig;
