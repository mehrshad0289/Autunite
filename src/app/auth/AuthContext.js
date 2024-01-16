import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import { showMessage } from 'app/store/fuse/messageSlice';
import { logoutUser, setUser } from 'app/store/userSlice';
import jwtService from './services/jwtService';
import { setNavigation } from '../store/fuse/navigationSlice';
import { selectUser } from '../store/userSlice';

const AuthContext = React.createContext();

function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);
    const [waitAuthCheck, setWaitAuthCheck] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {

        jwtService.on('onAutoLogin', () => {
            dispatch(showMessage({
                variant:"success",
                message: 'Signed Successfully'
            }));

            jwtService.getUserNavigations(user.role)
                .then((navigations) => {
                    dispatch(setNavigation(navigations))
                }).catch((error) => {
                    dispatch(showMessage({
                        message:error.message
                    }));
                })

            /**
             * Sign in and retrieve user data with stored token
             */
            jwtService
                .getUserInfo()
                .then((user) => {
                    jwtService.getUserNavigations(user.role)
                        .then((navigations) => {
                            dispatch(setNavigation(navigations))
                        }).catch((error) => {
                        dispatch(showMessage({
                            message:error.message
                        }));
                    })
                    success(user, 'Signed in with JWT');
                })
                .catch((error) => {
                    pass(error.message,"error");
                });
        });

        jwtService.on('onLogin', (user) => {

            success(user, 'Signed in');
        });

        jwtService.on('onLogout', () => {

            pass('Signed out',"error");

            dispatch(logoutUser());
        });

        jwtService.on('onAutoLogout', (message) => {

            pass(message,"error");

            dispatch(logoutUser());
        });

        jwtService.on('onNoAccessToken', () => {

            pass();
        });

        jwtService.init();

        function success(user, message,variant="success") {
            if (message) {
                dispatch(showMessage({
                    message,variant
                }));
            }

            Promise.all([
                dispatch(setUser(user)),
                // You can receive data in here before app initialization
            ]).then((values) => {
                setWaitAuthCheck(false);
                setIsAuthenticated(true);
            });
        }

        function pass(message,variant="success") {
            if (message) {
                dispatch(showMessage({message,variant}));
            }

            setWaitAuthCheck(false);
            setIsAuthenticated(false);
        }
    }, [dispatch]);

    return waitAuthCheck ? (
        <FuseSplashScreen/>
    ) : (
        <AuthContext.Provider value={{isAuthenticated}}>{children}</AuthContext.Provider>
    );
}

function useAuth() {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

export {AuthProvider, useAuth};
