import React, { useEffect, useState } from 'react';
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

function ReferralBonus() {

    const [state, setState] = useState({
        leftGroup: [],
        rightGroup: [],
        referralBonusHistory: [],
    });


    useEffect(() => {
        axios.get(
            'api/refferal-bonus',
        ).then((res) => {
            let data = res.data.data;
            setState({
                ...state,
                leftGroup: data.leftGroup,
                rightGroup: data.rightGroup,
                referralBonusHistory: data.referralBonusHistory,
            });
        });
    }, []);

    return (
        <>
            <HomeBackground img={3} />
            <div className='flex flex-col items-center p-24 sm:p-40 container opacity-90'>
                <div className='flex flex-col w-full max-w-4xl'>


                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            Left Group
                        </CustomTitle>
                        <TableContainer sx={{ maxHeight: 440 }} className='lg:px-80'>
                            <Table stickyHeader aria-label='sticky table' className='lg:px-80'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User</TableCell>
                                        <TableCell>Cap</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {state.leftGroup.map(user => {
                                        return (
                                            <TableRow>
                                                <TableCell>{user.referralCode}</TableCell>
                                                <TableCell>{user.cap} $</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {state.leftGroup.length === 0 && (
                                        <TableRow>
                                            <TableCell className='text-center' colSpan={2}>Left group is
                                                empty</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>


                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <div className='mt-8 text-lg font-extrabold tracking-tight leading-tight'>
                            Right Group
                        </div>
                        <TableContainer sx={{ maxHeight: 440 }} className='lg:px-80'>
                            <Table stickyHeader aria-label='sticky table' className='lg:px-80'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User</TableCell>
                                        <TableCell>Cap</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {state.rightGroup.map(user => {
                                        return (
                                            <TableRow>
                                                <TableCell>{user.referralCode}</TableCell>
                                                <TableCell>{user.cap} $</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {state.rightGroup.length === 0 && (
                                        <TableRow>
                                            <TableCell className='text-center' colSpan={2}>Right group is
                                                empty</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>


                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <div className='mt-8 text-lg font-extrabold tracking-tight leading-tight'>
                            Referral Bonus History
                        </div>
                        <TableContainer sx={{ maxHeight: 440 }} className='lg:px-80'>
                            <Table stickyHeader aria-label='sticky table' className='lg:px-80'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Time</TableCell>
                                        <TableCell>User</TableCell>
                                        <TableCell>Bonus</TableCell>
                                        <TableCell>Group</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {state.referralBonusHistory.map(row => {
                                        return (
                                            <TableRow>
                                                <TableCell>
                                                    {new Date(row.created_at).toLocaleDateString()} {new Date(row.created_at).toLocaleTimeString()}
                                                </TableCell>
                                                <TableCell>{row.meta.user.id}</TableCell>
                                                <TableCell>{row.amount} $</TableCell>
                                                <TableCell>{row.meta.user.side}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {state.referralBonusHistory.length === 0 && (
                                        <TableRow>
                                            <TableCell className='text-center' colSpan={4}>Referral bonus history is
                                                empty</TableCell>
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

export default ReferralBonus;
