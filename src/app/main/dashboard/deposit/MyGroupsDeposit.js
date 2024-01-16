import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Avatar from '@mui/material/Avatar';
import HomeBackground from '../../../shared-components/HomeBackground';
import CustomTitle from '../../../shared-components/CustomTitle';

function createData(id, title, left, right, time, amount) {
    return { id, title, left, right, time, amount };
}

const columns = [
    { id: 'title', align: 'right', label: '', minWidth: 170 },
    { id: 'left', align: 'right', label: 'Left Group', minWidth: 100 },
    { id: 'right', align: 'right', label: 'Right Group', minWidth: 100 },
    { id: 'time', align: 'right', label: 'Time', minWidth: 100 },
    { id: 'amount', align: 'right', label: 'Amount', minWidth: 100 },

];
const rows = [
    createData(1, 'Award', 0, 0, 90, 0),
];

function MyGroupsDeposit() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <HomeBackground img={7} />
            <div className='flex flex-col items-center p-24 sm:p-40 container opacity-90'>
                <div className='flex flex-col w-full max-w-4xl'>



                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            My Groups Deposit
                        </CustomTitle>

                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label='sticky table'>

                                <TableHead>

                                    <TableRow>
                                        <TableCell align='right'></TableCell>
                                        <TableCell align='right'>Left Group</TableCell>
                                        <TableCell align='right'>Right Group</TableCell>
                                        <TableCell align='right'>Time</TableCell>
                                        <TableCell align='right'>Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align='right'>Award</TableCell>
                                        <TableCell align='right'>0</TableCell>
                                        <TableCell align='right'>0</TableCell>
                                        <TableCell align='right'>90</TableCell>
                                        <TableCell align='right'>0</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='center' colSpan={2}>
                                            Total capital of my team
                                        </TableCell>
                                        <TableCell align='center' colSpan={3}>
                                            0
                                        </TableCell>
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

export default MyGroupsDeposit;
