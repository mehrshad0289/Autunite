import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import jwtServiceConfig from './jwtServiceConfig';
import { authRoles } from '../../index';
import {
    faAward,
    faCashRegister,
    faCheckCircle, faContactCard, faCube, faCubes,
    faDashboard,
    faDollar, faFile, faFilm, faInbox, faKey, faLink, faMoneyCheck, faPlusCircle,
    faShield, faShop, faThumbsUp, faTicket,
    faUsd,
    faUserCircle,
    faUserCog, faUserGroup,
    faUsers, faWallet,
} from '@fortawesome/free-solid-svg-icons';
import GlobalConstants from '../../../global/GlobalConstants';

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
    init() {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (err) => {
                return new Promise((resolve, reject) => {
                    if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                        // if you ever get an unauthorized response, logout the user
                        this.emit('onAutoLogout');
                        this.setSession(null);
                    }
                    throw err;
                });
            },
        );
    };

    handleAuthentication = () => {
        const access_token = this.getAccessToken();

        if (!access_token) {
            this.emit('onNoAccessToken');
            return;
        }

        if (this.isAuthTokenValid(access_token)) {
            this.setSession(access_token);
            this.emit('onAutoLogin', true);
        } else {
            this.setSession(null);
            this.emit('onAutoLogout', 'Access token expired');
        }
    };

    createUser = (data) => {
        return new Promise((resolve, reject) => {
            axios.post(jwtServiceConfig.signUp, data).then((response) => {

                let data = response.data.data;
                if (data.user) {
                    //this.setSession(data.access_token);
                    resolve(data.user);
                    //this.emit('onLogin', data.user);
                } else {
                    reject(data.error);
                }


            }).catch(error => {
                reject([{
                    type: 'email',
                    message: error.response?.data?.message,
                }]);
            });
        });
    };

    signInWithUserNameAndPassword = (username, password) => {
        return new Promise((resolve, reject) => {
            axios
                .post(jwtServiceConfig.signIn, new URLSearchParams({
                    client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
                    grant_type: 'password',
                    username: username,
                    password: password,
                }))
                .then((response) => {
                    this.setSession(response.data.access_token);
                    const userData = this.getUserData(response.data.data.user);
                    resolve(userData);

                    this.emit('onLogin', userData);

                });
        });
    };


    getUserData = (user) => {
        const signUpUrl = 'https://autunite.ai/sign-up';
        let role = [] ;
        if(user.role === 'admin'){
            role =authRoles.admin;
        }else if(user.role === 'superadmin'){
            role =authRoles.supperadmin;
        }
        else if(user.role === 'user'){
            role =authRoles.user;
        }
        return {
            role: role,
            data: {
                displayName: `${user.first_name} ${user.last_name}`,//decodedToken.name,
                sid: user.id,//decodedToken.sid,
                givenName: user.first_name,//decodedToken.given_name,
                familyFame: user.last_name,//decodedToken.family_name,
                photoURL: 'assets/images/logo/main-logo.png',
                logoURL: 'assets/images/logo/logo.png',
                shortcuts: ['apps.calendar', 'apps.mailbox', 'apps.contacts', 'apps.tasks'],
                countryId: user.country_id,
                createdAt: user.created_at,
                email: user.email,
                emailVerifiedAt: user.email_verified_at,
                firstName: user.first_name,
                id: user.id,
                lastName: user.last_name,
                parentUserId: user.parent_user_id,
                referralCode: user.referral_code,
                leftReferralCode: `${user.left_referral_code}`,
                leftReferralLink: `${signUpUrl}?sponsorId=${user.left_referral_code}`,
                rightReferralCode: `${user.right_referral_code}`,
                rightReferralLink: `${signUpUrl}?sponsorId=${user.right_referral_code}`,
                country: user.country?.name,
                shareDataWithSponsor: user.share_data_with_sponsor,
                side: user.side,
                updatedAt: user.updated_at,
                isSetFundPassword :user.is_set_fund_password,
                isConfirmedEmail :user.is_confirmed_email,
                isSetTwoFactor :user.is_set_two_factor,
            },
        };
    };


    signInWithEmailAndPassword = (email, password) => {
        return new Promise((resolve, reject) => {
            axios
                .post(jwtServiceConfig.signIn, {
                    email,
                    password,

                })
                .then((response) => {
                    console.log(response);
                    let data = response.data.data;
                    if (data.user) {
                        this.setSession(data.access_token);
                        const userData = this.getUserData(data.user);
                        resolve(userData);
                        this.emit('onLogin', userData);
                    } else {
                        reject(data.error);
                    }
                }).catch(error => {
                let message = error.response.status === 401 ?
                    'Email or password incorect' : 'Server Error';
                reject([{
                    type: 'email',
                    message: message,
                }]);
            });
        });
    };

    resetPassword = (email, password, token) => {
        return new Promise((resolve, reject) => {
            axios
                .post(jwtServiceConfig.resetPassword, {
                    email,
                    password,
                    token,
                })
                .then((response) => {
                    resolve(response);
                }).catch(error => {


                reject([{
                    type: 'email',
                    message: 'Token or email is invalid',
                }]);
            });
        });
    };

    forgotPassword = (email) => {
        return new Promise((resolve, reject) => {
            axios
                .post(jwtServiceConfig.forgotPassword, {
                    email,
                })
                .then((response) => {
                    resolve(response);
                }).catch(error => {


                reject([{
                    type: 'email',
                    message: 'Token or email is invalid',
                }]);
            });
        });
    };


    getUserInfo = () => {
        return new Promise((resolve, reject) => {
            axios
                .get(jwtServiceConfig.userInfo, {
                    data: {
                        access_token: this.getAccessToken(),
                    },
                })
                .then((response) => {
                    const userData = this.getUserData(response.data.data.user);
                    resolve(userData);
                })
                .catch((error) => {
                    this.logout();
                    reject(new Error('Failed to login with token.'));
                });
        });
    };

    getUserNavigations = (roles = []) => {
        roles = roles ? roles : [];
        let navigations = [];
        if (roles.includes('admin')) {
            navigations = [
                ...GlobalConstants.adminNavs,
            ];
        } else if (roles.includes('user')) {
            navigations = [
                ...GlobalConstants.userNavs,
            ];
        }
        else if (roles.includes('superadmin')) {
            navigations = [
                ...GlobalConstants.superadminNavs,
                ...GlobalConstants.adminNavs,
            ];
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(navigations);
            }, 1000);
        });
    };

    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            axios
                .get(jwtServiceConfig.accessToken, {
                    data: {
                        access_token: this.getAccessToken(),
                    },
                })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    this.logout();
                    reject(new Error('Failed to login with token.'));
                });
        });
    };

    updateUserData = (user) => {
        return axios.post(jwtServiceConfig.updateUser, {
            user,
        });
    };

    setSession = (access_token) => {
        if (access_token) {
            localStorage.setItem('jwt_access_token', access_token);
            axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        } else {
            localStorage.removeItem('jwt_access_token');
            delete axios.defaults.headers.common.Authorization;
        }
    };

    logout = () => {
        console.log('log outedddd');
        this.setSession(null);
        this.emit('onLogout', 'Logged out');
    };

    isAuthTokenValid = (access_token) => {
        console.log(access_token)
        if (!access_token) {
            return false;
        }
        const decoded = jwtDecode(access_token);
        console.log(decoded);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn('access token expired');
            return false;
        }

        return true;
    };

    getAccessToken = () => {
        return window.localStorage.getItem('jwt_access_token');
    };
}

const instance = new JwtService();

export default instance;
