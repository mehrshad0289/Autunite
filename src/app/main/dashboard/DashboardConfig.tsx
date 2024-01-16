import i18next from 'i18next';

import en from './i18n/en';
import fa from './i18n/fa';
import GlobalConstants from "../../global/GlobalConstants";
import React from 'react';
import {authRoles} from "../../auth";
import Dashboard from "./Dashboard";
import Admins from './admins/Admins';
import Users from './users/Users';
import NftList from './nft-list/NftList';
import RewardList from './rewardList/RewardList';
import Tickets from './Tickets/Tickets';
import Ticket from './Tickets/Ticket';
import WithdrawList from './withdraws/WithdrawList';
import TreeViewUsers from './users/TreeViewUsers';
import JobsHistory from './jobs/JobsHistory';
import NftPage from "./create-nft-new/NftPage";
import FailedNfts from "./create-nft-new/FailedNfts";
import User from './users/User';
import WeeklyRewardList from "./rewardList/WeeklyRewardList";
import RewardItems from "./rewardList/RewardItems";
import UserContracts from "./contract/UserContracts";
import UserContractItems from "./contract/UserContractItems";

i18next.addResourceBundle(GlobalConstants.langCodes.en, GlobalConstants.translations.main, en);
i18next.addResourceBundle(GlobalConstants.langCodes.fa, GlobalConstants.translations.main, fa);

const DashboardConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    auth: [...authRoles.user, ...authRoles.admin, ...authRoles.supperadmin],
    routes: [
        {
            path: 'create-nft',
            element: <NftPage/>,
            auth: authRoles.user,
        },
        {
            path: 'dashboard',
            element: <Dashboard/>,
            auth: [...authRoles.user, ...authRoles.admin, ...authRoles.supperadmin],
        },
        {
            path: 'admin/admins',
            element: <Admins/>,
            auth: [...authRoles.admin, ...authRoles.supperadmin],
        },
        {
            path: 'admin/users',
            element: <Users/>,
            auth: [...authRoles.admin, ...authRoles.supperadmin],
        },
        {
            path: 'admin/tree-users',
            element: <TreeViewUsers/>,
            auth: [...authRoles.admin, ...authRoles.supperadmin],
        },
        {
            path: 'admin/nft-list',
            element: <NftList/>,
            auth: [...authRoles.admin, ...authRoles.supperadmin],
        },
        {
            path: 'admin/awards',
            element: <RewardList/>,
            auth: [...authRoles.admin, ...authRoles.supperadmin],
        },
        {
            path: 'admin/weekly-awards',
            element: <WeeklyRewardList/>,
            auth: [...authRoles.admin, ...authRoles.supperadmin],
        },
        {
            path: 'admin/reward-info/:id',
            element: <RewardItems/>,
            auth: [...authRoles.admin, ...authRoles.supperadmin],
        },

        {
            path: 'admin/user-contracts',
            element: <UserContracts/>,
            auth: [...authRoles.admin, ...authRoles.supperadmin],
        },
        {
            path: 'admin/user-contract/:id',
            element: <UserContractItems/>,
            auth: [...authRoles.admin, ...authRoles.supperadmin],
        },

        {
            path: 'admin/tickets',
            element: <Tickets/>,
            auth: [...authRoles.admin, ...authRoles.supperadmin],
        },
        {
            path: 'admin/ticket/:id',
            element: <Ticket/>,
            auth: [...authRoles.admin, ...authRoles.supperadmin],
        },
        {
            path: 'admin/user-info/:id',
            element: <User/>,
            auth: [...authRoles.admin, ...authRoles.supperadmin],
        },

        {
            path: 'admin/all-withdraws',
            element: <WithdrawList/>,
            auth: [...authRoles.admin, ...authRoles.supperadmin],
        },
        {
            path: 'admin/jobs-history',
            element: <JobsHistory/>,
            auth: authRoles.supperadmin,
        },
        {
            path: 'admin/failed-nfts',
            element: <FailedNfts/>,
            auth: authRoles.supperadmin,
        },
    ],
};

export default DashboardConfig;

