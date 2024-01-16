import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {motion} from 'framer-motion';
import React, {useEffect, useState} from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import {Link, useParams} from "react-router-dom";
import CustomWaiting from "../../../shared-components/CustomWaiting";
import CustomFontAwesomeIcon from "../../../shared-components/CustomFontAwesomeIcon";
import themesConfig from "../../../configs/themesConfig";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import HomeBackground from "../../../shared-components/HomeBackground";
import Paper from "@mui/material/Paper";
import CustomTitle from "../../../shared-components/CustomTitle";
import dateFormat from "dateformat";

function UserContractItems() {
    const params = useParams();
    const id = params.id;
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
        axios.get(`/api/contract-items/${id}`).then((res) => {
            setData(res.data.data)
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
        hidden: {opacity: 0, y: 40},
        show: {opacity: 1, y: 0},
    };

    return (
        <>
            <HomeBackground img={5}/>
            <CustomWaiting open={state.loading} message={"please Wait!"}/>
            <div className='flex flex-col items-center p-24 sm:p-40 container opacity-90'>
                <div className='flex flex-col w-full max-w-4xl'>
                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            User Contract Items
                        </CustomTitle>
                        <TableContainer sx={{maxHeight: 440}}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Pay Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row, i) => {
                                        return (
                                            <TableRow key={i}>
                                                <TableCell>
                                                    {row.status==1 ? "Paid" :"Pending"}
                                                </TableCell>
                                                <TableCell>{row.amount} $</TableCell>
                                                <TableCell>
                                                    {dateFormat(row.datetime,"yyyy-mm-dd HH:MM")}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Paper>
                </div>
            </div>
        </>
    );
}

export default UserContractItems;
