import { lazy } from 'react';
import { authRoles } from '../../../auth';

const ProfileApp = lazy(() => import('./ProfileApp'));

const profileAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'profile',
      element: <ProfileApp />,
      auth: [...authRoles.user,...authRoles.admin],
    },
  ],
};

export default profileAppConfig;
