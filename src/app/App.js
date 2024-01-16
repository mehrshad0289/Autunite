import React from 'react';
import '@mock-api';
import BrowserRouter from '@fuse/core/BrowserRouter';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { selectCurrentLanguageDirection } from 'app/store/i18nSlice';
import { selectUser } from 'app/store/userSlice';
import themeLayouts from 'app/theme-layouts/themeLayouts';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import FuseAuthorization from '@fuse/core/FuseAuthorization';
import settingsConfig from 'app/configs/settingsConfig';
import { createPluginStore, PluginProvider } from "react-pluggable";
import withAppProviders from './withAppProviders';
import { AuthProvider } from './auth/AuthContext';
import axios from "axios";
import UmsPlugin from "./plugins/ums/UmsPlugin";
import { loadMessages, LocalizationProvider } from "@progress/kendo-react-intl";
import KendoFaMessages from "./configs/navigation-i18n/kendo_fa.json";
import i18next from "i18next";

loadMessages(KendoFaMessages, 'fa');

const pluginStore = createPluginStore();
//pluginStore.install(new UmsPlugin());


// import axios from 'axios';


const emotionCacheOptions = {
    rtl: {
        key: 'muirtl',
        stylisPlugins: [rtlPlugin],
        insertionPoint: document.getElementById('emotion-insertion-point'),
    },
    ltr: {
        key: 'muiltr',
        stylisPlugins: [],
        insertionPoint: document.getElementById('emotion-insertion-point'),
    },
};


const App = () => {
    const user = useSelector(selectUser);

    const langDirection = useSelector(selectCurrentLanguageDirection);
    const mainTheme = useSelector(selectMainTheme);

    return (

        <PluginProvider pluginStore={pluginStore}>

            <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
                <FuseTheme theme={mainTheme} direction={langDirection}>
                    <AuthProvider>
                        <BrowserRouter>
                            <FuseAuthorization
                                userRole={user.role}
                                loginRedirectUrl={settingsConfig.loginRedirectUrl}
                            >
                                <LocalizationProvider language={i18next.language}>
                                    <SnackbarProvider
                                        maxSnack={5}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        classes={{
                                            containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99',
                                        }}
                                    >
                                        <FuseLayout layouts={themeLayouts} />
                                    </SnackbarProvider>
                                </LocalizationProvider>
                            </FuseAuthorization>
                        </BrowserRouter>
                    </AuthProvider>
                </FuseTheme>

            </CacheProvider>

        </PluginProvider >

    );
};

export default withAppProviders(App)();
