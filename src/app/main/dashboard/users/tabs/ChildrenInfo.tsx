import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../store/userSlice';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { Link } from 'react-router-dom';
import TableContainer from '@mui/material/TableContainer';
import CustomWaiting from "../../../../shared-components/CustomWaiting";


function ChildrenInfo({ userId }) {
    const [users, setUsers] = useState([]);

    const user = useSelector(selectUser);
    useEffect(() => {
        loadData();
    }, []);
    const [state, setState] = useState({
        loading: false,
    });

    const loadData = () => {
        setState({
            ...state,
            loading: true
        })
        axios.get(`/api/user/${userId}/children`).then((res) => {
            setUsers(res.data);
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
                                General Information
                            </Typography>
                        </div>

                        <CardContent className='px-32 py-24'>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label='sticky table'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>First Name</TableCell>
                                            <TableCell>Last Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Referral Code</TableCell>
                                            <TableCell>Created At</TableCell>
                                            {/*<TableCell>Country</TableCell>*/}

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {users.map((user, i) => {
                                            return (
                                                <TableRow key={i}>
                                                    <TableCell>
                                                        <Link to={`/admin/user-info/${user.id}`}>Show</Link>
                                                    </TableCell>
                                                    <TableCell>{user.first_name}</TableCell>
                                                    <TableCell>{user.last_name}</TableCell>
                                                    <TableCell>{user.email}</TableCell>
                                                    <TableCell>{user.referral_code}</TableCell>
                                                    <TableCell>
                                                        {new Date(user.created_at).toLocaleDateString()} {new Date(user.created_at).toLocaleTimeString()}
                                                    </TableCell>
                                                    {/*<TableCell>{user.country.name}</TableCell>*/}
                                                </TableRow>
                                            );
                                        })}
                                        {users.length === 0 && (
                                            <TableRow>
                                                <TableCell className='text-center' colSpan={6}>
                                                    Not Found!
                                                </TableCell>
                                            </TableRow>
                                        )}


                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>


                </div>


            </div>
        </motion.div>
    );
}

export default ChildrenInfo;
