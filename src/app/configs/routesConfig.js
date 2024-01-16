import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import {Navigate} from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import HomeConfig from '../main/home/HomeConfig';
import React from 'react';

import UmsPluginConfig from "../plugins/ums/UmsPluginConfig";
import dashboardsConfigs from "../main/dashboard/dashboardsConfigs";
import {authRoles} from "../auth";
import BlogConfig from '../main/blog/BlogConfig';
import ComingSoonPage from '../main/coming-soon/ComingSoonPage';
import forgotPasswordPagesConfig from '../main/forgot-password/forgotPasswordPagesConfig';
import resetPasswordPagesConfig from '../main/reset-password/resetPasswordPagesConfig';
import HelpCenterAppConfig from "../main/dashboard/support/HelpCenterAppConfig";



const routeConfigs = [
    HomeConfig,
    SignOutConfig,
    SignInConfig,
    HelpCenterAppConfig,
    SignUpConfig,
    BlogConfig,
    forgotPasswordPagesConfig,
    resetPasswordPagesConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(dashboardsConfigs, settingsConfig.defaultAuth),
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
    {
        path: '/',
        element: <Navigate to="/sign-in"/>,
    },
    {
        path: '/blog',
        element: <Navigate to="/blog"/>,
    },
    {
        path: 'loading',
        element: <FuseLoading/>,
    },
    {
        path: '404',
        element: <ComingSoonPage/>, //<Error404Page/>,
    },
    {
        path: '*',
        element: <Navigate to="404"/>,
    },
];

export default routes;
