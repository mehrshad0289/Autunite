import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../../store/userSlice';
import { showMessage } from '../../../../store/fuse/messageSlice';
import CustomCopyToClipboard from '../../../../shared-components/CustomCopyToClipboard';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import CustomWaiting from "../../../../shared-components/CustomWaiting";

const columns = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'term', label: 'term', minWidth: 100 },
    { id: 'amount', label: 'Amount', minWidth: 100 },
    { id: 'started_at', label: 'Started At', minWidth: 100 },
    { id: 'expired_at', label: 'Expired At', minWidth: 100 },
    { id: 'monthly_pay', label: 'Monthly Pay', minWidth: 100 },
    { id: 'total_pay', label: 'Total Pay', minWidth: 100 },
    { id: 'roi', label: 'ROI', minWidth: 100 },
    { id: 'created_at', label: 'Created At', minWidth: 100 },
];








function ContractsInfo({userId}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [data, setData] = useState([]);
    const [state, setState] = useState({
        loading: false,
    });



    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setState({
            ...state,
            loading: true
        })
        axios.get(`/api/user/${userId}/contracts`).then((res) => {
            let rows =res.data.map(x=>{
                return {
                    title:x.contract.title,
                    term:x.term,
                    amount:x.amount,
                    started_at:x.started_at,
                    expired_at:x.expired_at,
                    monthly_pay:x.monthly_pay,
                    total_pay:x.total_pay,
                    roi:x.roi,
                    created_at: `${new Date(x.created_at).toLocaleTimeString()} ${new Date(x.created_at).toLocaleTimeString()}`,

                }
            });
            setData(rows);
        }).finally(() => {
            setState({
                ...state,
                loading: false
            })
        });
    }


    const container = {
        show: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.div variants={container} initial='hidden' animate='show' className='w-full'>
            <CustomWaiting open={state.loading} message={"please Wait!"}/>
            <div className='md:flex'>
                <div className='flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32'>
                    <Card component={motion.div} variants={item} className='w-full mb-32'>
                        <div className='px-32 pt-24'>
                            <Typography className='text-2xl font-semibold leading-tight'>
                                Contracts Information
                            </Typography>
                        </div>

                        <CardContent className='px-32 py-24'>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>term</TableCell>
                                            <TableCell>Amount</TableCell>
                                            <TableCell>Started At</TableCell>
                                            <TableCell>Expired At</TableCell>
                                            <TableCell>Monthly Pay</TableCell>
                                            <TableCell>Total Pay</TableCell>
                                            <TableCell>ROI</TableCell>
                                            <TableCell>Created At</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row,i) => {
                                                return (

                                                    <TableRow key={i}>
                                                        <TableCell>{row.title}</TableCell>
                                                        <TableCell>{row.term}</TableCell>
                                                        <TableCell>{row.amount}</TableCell>
                                                        <TableCell>{row.started_at}</TableCell>
                                                       <TableCell>{row.expired_at}</TableCell>
                                                       <TableCell>{row.monthly_pay}</TableCell>
                                                       <TableCell>{row.total_pay}</TableCell>
                                                       <TableCell>{row.roi}</TableCell>
                                                       <TableCell>{row.created_at}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </CardContent>
                    </Card>


                </div>


            </div>
        </motion.div>
    );
}

export default ContractsInfo;
