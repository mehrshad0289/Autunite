import React from 'react';
import Groups from './components/Groups';


const GroupsPluginConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: 'groups',
            element: <Groups />,
        },
    ],
};


export default GroupsPluginConfig;

