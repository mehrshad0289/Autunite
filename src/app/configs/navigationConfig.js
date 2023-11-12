import i18next from 'i18next';
import fa from './navigation-i18n/fa';
import en from './navigation-i18n/en';
import GlobalConstants from "../global/GlobalConstants";
import { authRoles } from '../auth';
import {faHome, faInbox, faLock, faPlusCircle, faSignIn, faUserCircle} from "@fortawesome/free-solid-svg-icons";

i18next.addResourceBundle(GlobalConstants.langCodes.en, GlobalConstants.translations.navigation, en);
i18next.addResourceBundle(GlobalConstants.langCodes.fa, GlobalConstants.translations.navigation, fa);

const navigationConfig = [

  {
    id: 'homePage',
    title: 'Home Page',
    subtitle: '',
    url: 'home',
    type: 'item',
    faIcon: faHome,
    faColor: "rgb(172, 248, 8)",
    translate: 'Home',
    children: [],
  },
  {
    id: 'support',
    title: 'Support',
    translate: 'Support',
    faIcon: faInbox,
    faColor: "rgb(172, 248, 8)",
    type: 'collapse',
    children: [
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
  /*{
    id: 'blogPage',
    title: 'Blog Page',
    subtitle: '',
    url: 'blog',
    type: 'item',
    translate: 'Blog',
    children: [],
  },*/
  // {
  //   id: 'buyCrypto',
  //   title: 'Buy Crypto',
  //   subtitle: '',
  //   type: 'item',
  //   icon: 'heroicons-outline:home',
  //   translate: 'BuyCrypto',
  //   children: [],
  // },
  //
  // {
  //   id: 'markets',
  //   title: 'Markets',
  //   subtitle: '',
  //   type: 'item',
  //   translate: 'Markets',
  //   children: [],
  // },
  //
  // {
  //   id: 'sellCrypto',
  //   title: 'Sell Crypto',
  //   subtitle: '',
  //   type: 'item',
  //   translate: 'SellCrypto',
  //   children: [],
  // },
  //
  //
  // {
  //   id: 'bitusdt',
  //   title: 'BITUSDT',
  //   subtitle: '',
  //   type: 'item',
  //   translate: 'BITUSDT',
  //   children: [],
  // },
  //

  {
    id: 'sign-in',
    title: 'Sign in',
    subtitle: '',
    url: 'sign-in',
    auth: authRoles.onlyGuest,
    type: 'item',
    faIcon: faSignIn,
    faColor: "rgb(172, 248, 8)",
    translate: 'SignIn',
    children: [],
  },

  {
    id: 'sign-up',
    title: 'Sign up',
    subtitle: '',
    url: 'sign-up',
    auth: authRoles.onlyGuest,
    type: 'item',
    faIcon: faUserCircle,
    faColor: "rgb(172, 248, 8)",
    translate: 'SignUp',
    children: [],
  },
  {
    id: 'sign-out',
    title: 'Sign out',
    type: 'item',
    auth: authRoles.user,
    translate: 'SignOut',
    url: 'sign-out',
    icon: 'exit_to_app',
  },

];

export default navigationConfig;
