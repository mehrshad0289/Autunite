import i18next from 'i18next';
import React from 'react';
import en from './i18n/en';
import fa from './i18n/fa';
import GlobalConstants from "../../global/GlobalConstants";
import BlogPage from "./Blog";
import {authRoles} from "../../auth";

i18next.addResourceBundle(GlobalConstants.langCodes.en, GlobalConstants.translations.main, en);
i18next.addResourceBundle(GlobalConstants.langCodes.fa, GlobalConstants.translations.main, fa);

const BlogConfig = {
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
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'blog',
      element: <BlogPage />,
    },
  ],
};

export default BlogConfig;

