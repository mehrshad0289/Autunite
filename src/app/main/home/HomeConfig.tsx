import i18next from 'i18next';

import en from './i18n/en';
import fa from './i18n/fa';
import GlobalConstants from "../../global/GlobalConstants";
import HomePage from "./Home";
import React from 'react';
import {authRoles} from "../../auth";

i18next.addResourceBundle(GlobalConstants.langCodes.en, GlobalConstants.translations.main, en);
i18next.addResourceBundle(GlobalConstants.langCodes.fa, GlobalConstants.translations.main, fa);

const HomeConfig = {
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
      path: 'home',
      element: <HomePage />,
    },
  ],
};

export default HomeConfig;
