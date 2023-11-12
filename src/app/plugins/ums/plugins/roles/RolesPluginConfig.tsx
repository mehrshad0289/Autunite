import React from 'react';
import Roles from './components/Roles';

const RolesPluginConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: 'roles',
            element: <Roles />,
        },
    ],
};

export default RolesPluginConfig;

