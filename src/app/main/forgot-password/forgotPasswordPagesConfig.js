import { lazy } from 'react';
const ModernForgotPasswordPage = lazy(() => import('./ModernForgotPasswordPage'));


const forgotPasswordPagesConfig = {
    settings: {
        layout: {
            style: 'homeLayout',
            config: {
                navbar: {
                    display: true,
                },
                toolbar: {
                    display: false,
                },
                footer: {
                    display: true,
                },
                leftSidePanel: {
                    display: false,
                },
                rightSidePanel: {
                    display: false,
                },
            },
        },
    },
    routes: [
        {
            path: 'forgot-password',
            element: <ModernForgotPasswordPage />,
        },
    ],
};

export default forgotPasswordPagesConfig;
