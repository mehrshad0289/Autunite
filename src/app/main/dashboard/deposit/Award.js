import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import NftData from '../NftData';
import HomeBackground from '../../../shared-components/HomeBackground';
import CustomTitle from '../../../shared-components/CustomTitle';

function Award() {

    const [state, setState] = useState({
        pendingAmount: 0,
        remainingSeason: 0,
        leftCredit: 0,
        rightCredit: 0,

        weeklyAwardLimit: '',
        totalAwards: 0,
        totalTimeCredit: '',
        totalLeftCredit: 0,
        totalRightCredit: 0,
        capitalOfMyGroups: 0,
        userNft: {
            imgUrl: 'assets/images/avatars/autunite.png',
            code: '',
            totalDeposit: 0,
            leftCredit: 0,
            rightCredit: 0,
            createdAt:""
        },
        userContract: {
            lastExpireDate: '',
            nextPriod: 0,
        },
    });


    useEffect(() => {
        axios.get(
            'api/award-data',
        ).then((res) => {
            let data = res.data.data;
            setState({
                ...state,
                ...data,
            });
        });
    }, []);

    return (
        <>
            <HomeBackground img={5} />
            <div className='flex flex-col items-center p-24 sm:p-40 container opacity-90'>
                <div className='flex flex-col w-full max-w-4xl'>



                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            Airdrop Award:
                        </CustomTitle>
                        <NftData code={state.userNft.code}
                                 imgUrl={state.userNft.imgUrl}
                                 leftCredit={state.userNft.leftCredit}
                                 rightCredit={state.userNft.rightCredit}
                                 totalDeposit={state.userNft.totalDeposit}
                                 lastExpireDate={state.userContract.lastExpireDate}
                                 createdAt={state.userNft.createdAt}
                        />

                        <TableContainer sx={{ maxHeight: 440 }} className='lg:px-80'>
                            <Table stickyHeader aria-label='sticky table' className='lg:px-80'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Left Credit</TableCell>
                                        <TableCell>Right Credit</TableCell>
                                        <TableCell>Pending Amount</TableCell>
                                        <TableCell>Remaining Season</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Award</TableCell>
                                        <TableCell>{state.leftCredit} $</TableCell>
                                        <TableCell>{state.rightCredit} $</TableCell>
                                        <TableCell>{state.pendingAmount} $</TableCell>
                                        <TableCell>{state.remainingSeason} D</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br />
                        <br />
                        <TableContainer sx={{ maxHeight: 440 }} className='lg:px-80'>
                            <Table stickyHeader aria-label='sticky table' className='lg:px-80'>

                                <TableBody>
                                    <TableRow>
                                        <TableCell>Weekly Award Limit</TableCell>
                                        <TableCell>{state.weeklyAwardLimit} $</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Total Awards</TableCell>
                                        <TableCell>{state.totalAwards} $</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Total Time Credit</TableCell>
                                        <TableCell>{state.totalTimeCredit} D</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Right Cap</TableCell>
                                        <TableCell>{state.totalLeftCredit} $</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Left Cap</TableCell>
                                        <TableCell>{state.totalRightCredit} $</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Total Capital</TableCell>
                                        <TableCell>{state.capitalOfMyGroups} $</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>


                </div>
            </div>
        </>
    );
}

export default Award;
