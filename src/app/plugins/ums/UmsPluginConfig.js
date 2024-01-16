import React from 'react';
import FuseUtils from '@fuse/utils';
import GroupsPluginConfig from "./plugins/groups/GroupsPluginConfig";
import UsersPluginConfig from "./plugins/users/UsersPluginConfig";
import RolesPluginConfig from "./plugins/roles/RolesPluginConfig";
import settingsConfig from "../../configs/settingsConfig";

const routeConfigs = [GroupsPluginConfig,UsersPluginConfig,RolesPluginConfig];

const UmsPluginConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path :"ums",
            children :[
                ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
            ]
        }
    ],
};

export default UmsPluginConfig;

