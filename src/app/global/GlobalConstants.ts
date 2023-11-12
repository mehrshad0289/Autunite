import {
    faAward, faCalendarWeek, faCashRegister, faCheckCircle, faContactCard, faCube,
    faCubes,
    faDashboard, faDollar, faFile, faFileContract, faFilm, faHistory, faInbox, faKey, faLink,
    faMoneyCheck, faPlusCircle, faShield, faShop, faThumbsUp,
    faTicket, faUsd, faUserCircle, faUserCog,
    faUserGroup,
    faUsers, faWallet,
} from '@fortawesome/free-solid-svg-icons';

const GlobalConstants = {
    Plugins: {
        Map: {
            Name: "Map",
            Functions: {
                Activate: "Map:activate"
            }
        },
        Ums: {
            Name: "Ums",
            Functions: {
                Activate: "Ums:activate"
            }
        },
        Users: {
            Name: "Users",
            Functions: {
                Activate: "Users:activate"
            },
            Urls:{
                UsersList:"admin/realms/UMS/users",
                AddNewUser:"admin/realms/UMS/users",
            }
        },
        Groups: {
            Name: "Groups",
            Functions: {
                Activate: "Groups:activate"
            }
        },
        Roles: {
            Name: "Roles",
            Functions: {
                Activate: "Roles:activate"
            },
            Urls:{
                RolesList:"admin/realms/UMS/roles"
            }
        },
    },
    localStorage: {},
    urls: {},
    translations: {
        layout: "layout",
        main : "main",
        navigation : "navigation",
    },
    langCodes:{
        fa:"fa",
        en:"en",
    },
    showMessage: {
        variants: {
            success: "success",
            info: "Info",
            warning: "warning",
            error: "error",
            default: "default",
        }
    },

    adminNavs : [
        {
            id: 'dashboard',
            title: 'Dashboard',
            translate: 'Dashboard',
            faIcon: faDashboard,
            faColor: "rgb(172, 248, 8)",
            type: 'item',
            url: '/dashboard',
        },
        {
            id: 'Users',
            title: 'Users',
            translate: 'Users',
            faIcon: faUsers,
            faColor: "rgb(172, 248, 8)",
            type: 'item',
            url: '/admin/users',
        },
        {
            id: 'TreeUsers',
            title: 'TreeUsers',
            translate: 'TreeUsers',
            faIcon: faUsers,
            faColor: "rgb(172, 248, 8)",
            type: 'item',
            url: '/admin/tree-users',
        },
        {
            id: 'Admins',
            title: 'Admins',
            translate: 'Admins',
            faIcon: faUserGroup,
            faColor: "rgb(172, 248, 8)",
            type: 'item',
            url: '/admin/admins',
        },
        {
            id: 'Withdraws',
            title: 'Withdraws',
            translate: 'WithdrawList',
            faIcon: faMoneyCheck,
            faColor: "rgb(172, 248, 8)",
            type: 'item',
            url: '/admin/all-withdraws',
        },
        {
            id: 'NftList',
            title: 'NftList',
            translate: 'NftList',
            faIcon: faCubes,
            faColor: "rgb(172, 248, 8)",
            type: 'item',
            url: '/admin/nft-list',
        },
        {
            id: 'Awards',
            title: 'Awards',
            translate: 'Awards',
            faIcon: faAward,
            faColor: "rgb(172, 248, 8)",
            type: 'item',
            url: '/admin/awards',
        },

        {
            id: 'UserContracts',
            title: 'UserContracts',
            translate: 'UserContracts',
            faIcon: faFileContract,
            faColor: "rgb(172, 248, 8)",
            type: 'item',
            url: '/admin/user-contracts',
        },
        {
            id: 'WeeklyAwards',
            title: 'WeeklyAwards',
            translate: 'WeeklyAwards',
            faIcon: faCalendarWeek,
            faColor: "rgb(172, 248, 8)",
            type: 'item',
            url: '/admin/weekly-awards',
        },
        {
            id: 'Tickets',
            title: 'Tickets',
            translate: 'Tickets',
            faIcon: faTicket,
            faColor: "rgb(172, 248, 8)",
            type: 'item',
            url: '/admin/tickets',
        },
        {
            id: 'account',
            title: 'Account',
            translate: 'Account',
            faIcon: faUserCircle,
            faColor: "rgb(172, 248, 8)",
            type: 'collapse',
            children: [
                {
                    id: 'my-profile',
                    faIcon: faUserCog,
                    faColor: "rgb(172, 248, 8)",
                    title: 'Profile',
                    translate: 'MyProfile',
                    type: 'item',
                    url: '/profile',
                },
            ],
        },
    ],
    superadminNavs:[
        {
            id: 'jobsHistory',
            title: 'jobsHistory',
            translate: 'jobsHistory',
            faIcon: faHistory,
            faColor: "rgb(172, 248, 8)",
            type: 'item',
            url: '/admin/jobs-history',
        },
        {
            id: 'FailedNfts',
            title: 'FailedNfts',
            translate: 'FailedNfts',
            faIcon: faCube,
            faColor: "rgb(172, 248, 8)",
            type: 'item',
            url: '/admin/failed-nfts',
        },
    ],
    userNavs : [
        {
            id: 'dashboard',
            title: 'Dashboard',
            translate: 'Dashboard',
            faIcon: faDashboard,
            faColor: "rgb(172, 248, 8)",
            type: 'item',
            url: '/dashboard',
        },
        {
            id: 'fund',
            title: 'Fund',
            translate: 'Fund',
            faIcon: faUsd,
            faColor: "rgb(172, 248, 8)",
            type: 'collapse',
            children: [
                {
                    id: 'CreateNft',
                    title: 'CreateNft',
                    translate: 'CreateNft',
                    faIcon: faCube,
                    faColor: "rgb(172, 248, 8)",
                    type: 'item',
                    url: '/create-nft',
                },
                {
                    id: 'AutuniteWallet',
                    title: 'AutuniteWallet',
                    translate: 'AutuniteWallet',
                    faIcon: faWallet,
                    faColor: "rgb(172, 248, 8)",
                    type: 'item',
                    url: '/wallets',
                },
                /*{
                    id: 'contracts',
                    title: 'Contracts',
                    translate: 'Contracts',
                    icon: 'heroicons-outline:document',
                    type: 'item',
                    url: '/contracts',
                },*/
                {
                    id: 'my-contracts',
                    title: 'MyContracts',
                    translate: 'MyContracts',
                    faIcon: faContactCard,
                    faColor: "rgb(172, 248, 8)",
                    type: 'item',
                    url: '/my-contracts',
                },
                {
                    id: 'referral-bonus',
                    title: 'ReferralBonus',
                    translate: 'ReferralBonus',
                    faIcon: faFile,
                    faColor: "rgb(172, 248, 8)",
                    type: 'item',
                    url: '/referral-bonus',
                },
                {
                    id: 'Award',
                    title: 'Award',
                    translate: 'Award',
                    faIcon: faDollar,
                    faColor: "rgb(172, 248, 8)",
                    type: 'item',
                    url: '/award',
                },
            ],
        },
        {
            id: 'account',
            title: 'Account',
            translate: 'Account',
            faIcon: faUserCircle,
            faColor: "rgb(172, 248, 8)",
            type: 'collapse',
            children: [
                {
                    id: 'my-profile',
                    faIcon: faUserCog,
                    faColor: "rgb(172, 248, 8)",
                    title: 'Profile',
                    translate: 'MyProfile',
                    type: 'item',
                    url: '/profile',
                },

                {
                    id: 'security',
                    title: 'Security',
                    translate: 'Security',
                    faIcon: faShield,
                    faColor: "rgb(172, 248, 8)",
                    type: 'collapse',
                    children: [
                        {
                            id: 'ChangePassword',
                            faIcon: faKey,
                            faColor: "rgb(172, 248, 8)",
                            title: 'ChangePassword',
                            translate: 'ChangePassword',
                            type: 'item',
                            url: '/change-password',
                        },
                        {
                            id: 'EmailConfirmation',
                            faIcon: faThumbsUp,
                            faColor: "rgb(172, 248, 8)",
                            title: 'EmailConfirmation',
                            translate: 'EmailConfirmation',
                            type: 'item',
                            url: '/email-confirmation',
                        },
                       /* {
                            id: 'TwoFactorAuthenticator',
                            faIcon: faCheckCircle,
                            faColor: "rgb(172, 248, 8)",
                            title: 'TwoFactorAuthenticator',
                            translate: 'TwoFactorAuthenticator',
                            type: 'item',
                            url: '/two-factor-authenticator',
                        },
                        {
                            id: 'FundPassword',
                            faIcon: faKey,
                            faColor: "rgb(172, 248, 8)",
                            title: 'FundPassword',
                            translate: 'FundPassword',
                            type: 'item',
                            url: '/fund-password',
                        },*/
                    ],

                },
                /*{
                    id: 'KYC',
                    title: 'KYC',
                    type: 'item',
                    icon: 'heroicons-outline:credit-card',
                    url: '/kyc',
                    translate: 'KYC',
                },*/
                /* {
                     id: 'nft-saving-plan',
                     title: 'Nft Saving Plan',
                     type: 'item',
                     icon: 'heroicons-outline:sparkles',
                     url: '/nft-saving-plan',
                     translate: 'NftSavingPlan',
                 },*/
                {
                    id: 'my-referral-links',
                    title: 'My Referral Links',
                    type: 'item',
                    faIcon: faLink,
                    faColor: "rgb(172, 248, 8)",
                    url: '/my-referral-links',
                    translate: 'MyReferralLinks',
                },
               /* {
                    id: 'my-groups-deposit',
                    title: 'My Groups Deposit',
                    type: 'item',
                    faIcon: faUserGroup,
                    faColor: "rgb(172, 248, 8)",
                    url: '/my-groups-deposit',
                    translate: 'MyGroupsDeposit',
                },*/
            ],
        },
        /*{
            id: 'promotor',
            title: 'Promotor',
            translate: 'Promotor',
            icon: 'heroicons-outline:cube-transparent',
            type: 'item',
            url: '/promoter',
        },*/

        {
            id: 'market',
            title: 'Market',
            translate: 'Market',
            faIcon: faShop,
            faColor: "rgb(172, 248, 8)",
            type: 'item',
            url: '/market',
        },
        {
            id: 'media-center',
            title: 'Media Center',
            translate: 'MediaCenter',
            faIcon: faFilm,
            faColor: "rgb(172, 248, 8)",
            type: 'item',
            url: '/media-center',
        },
        {
            id: 'events-webinars',
            title: 'EventsWebinars',
            translate: 'EventsWebinars',
            faIcon: faCashRegister,
            faColor: "rgb(172, 248, 8)",
            type: 'collapse',
            children: [],
        },

        /* {
             id: 'dashboard-finance',
             title: 'Finance',
             translate: 'Finance',
             icon: 'heroicons-outline:cash',
             type: 'item',
             url: '/finance',
         },*/

        {
            id: 'support',
            title: 'Support',
            translate: 'Support',
            faIcon: faInbox,
            faColor: "rgb(172, 248, 8)",
            type: 'collapse',
            children: [
                {
                    id: 'my-tickets',
                    faIcon: faInbox,
                    faColor: "rgb(172, 248, 8)",
                    title: 'My Tickets',
                    translate: 'MyTickets',
                    type: 'item',
                    url: '/my-tickets',
                },
                {
                    id: 'open-new-ticket',
                    faIcon: faPlusCircle,
                    faColor: "rgb(172, 248, 8)",
                    title: 'Open New Ticket',
                    translate: 'OpenNewTicket',
                    type: 'item',
                    url: '/support',
                },
            ],
        },
    ]
}

export default GlobalConstants;
