import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import {Link} from 'react-router-dom';
import HomeBackground from '../../../shared-components/HomeBackground';
import CustomTitle from '../../../shared-components/CustomTitle';
import CustomFontAwesomeIcon from '../../../shared-components/CustomFontAwesomeIcon';
import {faCheckCircle, faDashboard, faEye} from '@fortawesome/free-solid-svg-icons';
import themesConfig from '../../../configs/themesConfig';
import {setNavigation} from '../../../store/fuse/navigationSlice';
import {useDispatch} from 'react-redux';
import GlobalConstants from '../../../global/GlobalConstants';
import history from '../../../../@history';
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import {LoadingButton} from "@mui/lab";
import {CircularProgress} from "@mui/material";
import CustomWaiting from "../../../shared-components/CustomWaiting";

function Users() {
    const  [users, setUsers] = useState([]);

    const [state, setState] = useState({
        loading: false,
        isLoadingDoSearchBtn: false
    });
    const [filterState, setFilterState] = useState({
        userId: "",
        email: "",
    });

    const dispatch = useDispatch();

    useEffect(() => {
        refreshUsers()
    }, []);
    const item = {
        hidden: {opacity: 0, y: 40},
        show: {opacity: 1, y: 0},
    };


    const refreshUsers = () => {
        setState({
            ...state,
            loading: true
        })
        axios.post(
            'api/users',{
               ...filterState
            }
        ).then((res) => {
            let data = res.data.data;
            setUsers(data);
        }).finally(() => {
            setState({
                ...state,
                loading: false
            })
        });
    }

    const gotoUserDashboard = (id) => {
        const navigations = [
            ...GlobalConstants.userNavs
        ]
        dispatch(setNavigation(navigations));
        history.push("/dashboard")
    }

    const doSearch = () => {
        refreshUsers();
    }
    return (
        <>
            <CustomWaiting open={state.loading} message={"please Wait!"}/>
            <HomeBackground img={4}/>
            <div className='flex flex-col items-center p-24 sm:p-40 container'>
                <div className='flex flex-col w-full max-w-4xl'>
                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <div className="grid gap-8">
                            <FormControl fullWidth>
                                <InputLabel htmlFor='outlined-adornment-amount'>Token ID</InputLabel>
                                <OutlinedInput
                                    type='number'
                                    name='userId'
                                    id='userId'
                                    onChange={(e) => {
                                        setFilterState({
                                            ...filterState,
                                            userId: e.target.value
                                        });
                                    }}
                                    label='Token ID'
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel htmlFor='outlined-adornment-amount'>Email</InputLabel>
                                <OutlinedInput
                                    type='string'
                                    name='email'
                                    id='email'
                                    onChange={(e) => {
                                        setFilterState({
                                            ...filterState,
                                            email: e.target.value
                                        });
                                    }}
                                    label='Email'
                                />
                            </FormControl>
                        </div>
                        <div className={'text-center mt-2 grid gap-3'}>
                            <LoadingButton
                                className={'rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'}
                                loadingIndicator={<CircularProgress color="secondary" size={16}/>}
                                loading={state.isLoadingDoSearchBtn}
                                loadingPosition="end"
                                variant='contained'
                                color='info'
                                onClick={doSearch}
                                disabled={state.isLoadingDoSearchBtn}
                            >
                                <span>Search</span>
                            </LoadingButton>
                        </div>
                    </Paper>

                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            Users
                        </CustomTitle>
                        <TableContainer sx={{maxHeight: 440}}>
                            <Table stickyHeader aria-label='sticky table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Operations</TableCell>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Referral Code</TableCell>
                                        <TableCell>Created At</TableCell>
                                        <TableCell>Country</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {users.map((user, i) => {
                                        return (
                                            <TableRow key={i}>
                                                <TableCell className="flex">
                                                    <CustomFontAwesomeIcon
                                                        onClick={() => gotoUserDashboard(user.id)}
                                                        color={themesConfig.default.palette.secondary.main}
                                                        icon={faDashboard}
                                                    />

                                                    <Link to={`/admin/user-info/${user.id}`} className="mx-10 "
                                                          style={{backgroundColor: '#fff', border: 'none'}}>
                                                        <CustomFontAwesomeIcon
                                                            color={themesConfig.default.palette.secondary.main}
                                                            icon={faEye}
                                                        />
                                                    </Link>
                                                </TableCell>

                                                <TableCell>{user.first_name}</TableCell>
                                                <TableCell>{user.last_name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.referral_code}</TableCell>
                                                <TableCell>
                                                    {new Date(user.created_at).toLocaleDateString()} {new Date(user.created_at).toLocaleTimeString()}
                                                </TableCell>
                                                <TableCell>{user.country.name}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {users.length === 0 && (
                                        <TableRow>
                                            <TableCell className='text-center' colSpan={6}>You have no User</TableCell>
                                        </TableRow>
                                    )}


                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Paper>
                </div>
            </div>
        </>
    );
}

export default Users;
