import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import axios from 'axios';
import CustomTitle from '../../../shared-components/CustomTitle';
import HomeBackground from '../../../shared-components/HomeBackground';
import format from 'date-fns/format';
import clsx from 'clsx';
import CustomFontAwesomeIcon from '../../../shared-components/CustomFontAwesomeIcon';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';





function Tickets(props) {


    const [tickets, setTickets] = useState([]);
    useEffect(() => {
        axios.get(`/api/tickets`).then((res) => {
            setTickets(res.data.data);
        });
    }, []);
    const columns = [
        "",
        "ID",
        "User Id",
        'Email',
        'Name',
        'Subject',
        'Response',
        'Status',
        'Message',
        "Created At"
    ];

    return (
        <>
            <HomeBackground img={5} />
            <div className='flex flex-col items-center p-24 sm:p-40 container'>
                <div className='flex flex-col w-full max-w-4xl'>
                    <Paper className='flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden'>
                        <div className=''>
                            <CustomTitle>
                                Tickets
                            </CustomTitle>
                            <Typography className='font-medium' color='text.secondary'>
                            </Typography>
                        </div>

                        <div className='table-responsive mt-24'>
                            <Table className='simple w-full min-w-full'>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column, index) => (
                                            <TableCell key={index}>
                                                <Typography
                                                    color='text.secondary'
                                                    className='font-semibold text-12 whitespace-nowrap'
                                                >
                                                    {column}
                                                </Typography>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {tickets.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Link to={`/admin/ticket/${row.id}`}>Show</Link>
                                            </TableCell>
                                            {Object.entries(row).map(([key, value]) => {
                                                console.log(key)
                                                switch (key) {
                                                    case 'id':
                                                    case 'user.referral_code':

                                                    case 'email':
                                                    case 'name':
                                                    case 'message':
                                                    case 'response':
                                                    case 'subject':

                                                    {
                                                        return (
                                                            <TableCell key={key} component="th" scope="row">
                                                                <Typography className="" color="text.secondary">
                                                                    {value}
                                                                </Typography>
                                                            </TableCell>
                                                        );
                                                    }
                                                    case 'status':
                                                    {
                                                        return (
                                                            <TableCell key={key} component="th" scope="row">
                                                                <Typography className="" color="text.secondary">
                                                                    {value===0 && <>Unknown</>}
                                                                    {value===1 && (<>
                                                                        <CustomFontAwesomeIcon
                                                                            color={'green'}
                                                                            icon={faCheckCircle}
                                                                        />
                                                                        Answered</>)}
                                                                </Typography>
                                                            </TableCell>
                                                        );
                                                    }
                                                    case 'created_at': {
                                                        return (
                                                            <TableCell key={key} component="th" scope="row">
                                                                <Typography className="">
                                                                    {new Date(value).toLocaleDateString()} {new Date(value).toLocaleTimeString()}
                                                                </Typography>
                                                            </TableCell>
                                                        );
                                                    }



                                                }
                                            })}
                                        </TableRow>
                                    ))}
                                    {tickets.length === 0 && (
                                        <TableRow>
                                            <TableCell className='text-center' colSpan={6}>You have no ticket</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>

                        </div>
                    </Paper>
                </div>
            </div>
        </>
    );
}

export default memo(Tickets);
