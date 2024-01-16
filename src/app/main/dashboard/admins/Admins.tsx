import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import HomeBackground from '../../../shared-components/HomeBackground';
import CustomTitle from '../../../shared-components/CustomTitle';
import CustomWaiting from "../../../shared-components/CustomWaiting";

function Admins() {
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        admins: [],
    });


    useEffect(() => {
        refreshData()
    }, []);

    const refreshData=()=>{
        setLoading(true)
        axios.get(
            'api/admins',
        ).then((res) => {
            let data = res.data.data;
            setState({
                ...state,
                admins: data,
            });
        }).finally(() => {
            setLoading(false)
        });
    }
    return (
        <>
            <HomeBackground img={1}/>
            <CustomWaiting open={loading} message={"please Wait!"}/>
            <div className='flex flex-col items-center p-24 sm:p-40 container'>
                <div className='flex flex-col w-full max-w-4xl'>
                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            Admins
                        </CustomTitle>
                        <TableContainer sx={{maxHeight: 440}}>
                            <Table stickyHeader aria-label='sticky table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Referral Code</TableCell>
                                        <TableCell>Created At</TableCell>
                                        <TableCell>Country</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {state.admins.map((user, i) => {
                                        return (
                                            <TableRow key={i}>
                                                <TableCell>{user.first_name}</TableCell>
                                                <TableCell>{user.last_name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.referral_code}</TableCell>
                                                <TableCell>{new Date(user.created_at).toLocaleDateString()} {new Date(user.created_at).toLocaleTimeString()}</TableCell>
                                                <TableCell>{user.country.name}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {state.admins.length === 0 && (
                                        <TableRow>
                                            <TableCell className='text-center' colSpan={6}>You have no Admin</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Paper>
                </div>
            </div>
        </>);


}

export default Admins;
