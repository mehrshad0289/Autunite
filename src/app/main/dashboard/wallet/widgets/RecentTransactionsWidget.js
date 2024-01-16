import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import {memo, useEffect, useState} from 'react';
import format from 'date-fns/format';
import clsx from 'clsx';
import axios from "axios";
import CustomTitle from '../../../../shared-components/CustomTitle';

function RecentTransactionsWidget(props) {
    const wallet = props;
    console.log(wallet)
    let walletSlug = wallet.slug;
    const [transactions, setTransactions] = useState([])
    useEffect(() => {
        axios.get(`/api/wallet/${walletSlug}/transactions`).then((res) => {
            setTransactions(res.data.data)
        })
    }, [])


    return (
        <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
            <div className="">
                <CustomTitle>
                    Transactions
                </CustomTitle>
                <Typography className="font-medium" color="text.secondary">
                </Typography>
            </div>

            <div className="table-responsive mt-24">
                <Table className="simple w-full min-w-full">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    color="text.secondary"
                                    className="font-semibold text-12 whitespace-nowrap">Transaction ID</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    color="text.secondary"
                                    className="font-semibold text-12 whitespace-nowrap">Type</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    color="text.secondary"
                                    className="font-semibold text-12 whitespace-nowrap">Date</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    color="text.secondary"
                                    className="font-semibold text-12 whitespace-nowrap">Amount</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    color="text.secondary"
                                    className="font-semibold text-12 whitespace-nowrap">Status</Typography>
                            </TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {transactions.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    <Typography className="" color="text.secondary">
                                        {row.id}
                                    </Typography>
                                </TableCell>


                                <TableCell component="th" scope="row">
                                    <Typography className="" color="text.secondary">
                                        {row.type}{row.type2 ? `(${row.type2})` :"" }
                                    </Typography>
                                </TableCell>


                                <TableCell component="th" scope="row">
                                    <Typography className="">
                                        {format(new Date(row.created_at), 'MMM dd, y')}
                                    </Typography>
                                </TableCell>


                                <TableCell component="th" scope="row">
                                    <Typography className="">
                                        {row.amount.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        })}
                                    </Typography>
                                </TableCell>


                                <TableCell component="th" scope="row">
                                    <Typography
                                        className={clsx(
                                            'inline-flex items-center font-bold text-10 px-10 py-2 rounded-full tracking-wide uppercase',
                                            !row.status &&
                                            'bg-red-100 text-red-800 dark:bg-red-600 dark:text-red-50',
                                            row.status &&
                                            'bg-green-50 text-green-800 dark:bg-green-600 dark:text-green-50'
                                        )}
                                    >
                                        {row.status ? "Confirmed" : "Not Confirmed"}
                                    </Typography>
                                </TableCell>

                            </TableRow>


                        ))}
                    </TableBody>
                </Table>

            </div>
        </Paper>
    );
}

export default memo(RecentTransactionsWidget);
