import React from 'react';
import Users from './components/Users';
import UserView from './components/UserView';

const UsersPluginConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: 'users',
            element: <Users />,
        },
        {
            path: 'users/:userId',
            element: <UserView />,
        },
    ],
};

export default UsersPluginConfig;

