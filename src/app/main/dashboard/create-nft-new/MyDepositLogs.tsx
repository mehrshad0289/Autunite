import CustomTitle from "../../../shared-components/CustomTitle";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import CustomFontAwesomeIcon from "../../../shared-components/CustomFontAwesomeIcon";
import {faCheckCircle, faRefresh} from "@fortawesome/free-solid-svg-icons";
import {Paper} from "@mui/material";
import React, {useState} from "react";
import axios from "axios";
import jwtServiceConfig from "../../../auth/services/jwtService/jwtServiceConfig";
import {showMessage} from "../../../store/fuse/messageSlice";
import {useDispatch} from "react-redux";
import TransactionInfoPage from "./TransactionInfoPage";

const MyDepositLogs =({depositLogs})=>{


    const getType =(type)=>{
        if(type ==="DEPOSIT_CREATE_NFT"){
            return "Buy NFT"
        }else if(type ==="TOPUP"){
            return "Pay up"
        }else{
            return type
        }
    }
    return (
        <Paper className='mt-24 sm:mt-36 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
            <CustomTitle>
                My Deposits & Pay up History
            </CustomTitle>
            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{textAlign:"center"}}>Status</TableCell>
                            <TableCell style={{textAlign:"center"}}>Token ID</TableCell>
                            <TableCell style={{textAlign:"center"}}>Creating Date</TableCell>
                            <TableCell style={{textAlign:"center"}}>Amount</TableCell>
                            <TableCell style={{textAlign:"center"}}>Type</TableCell>


                            <TableCell style={{textAlign:"center"}}>Transaction Hash</TableCell>
                            <TableCell style={{textAlign:"center"}}>Blockchain Query</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {(depositLogs.length < 1)  && (
                            <TableRow>
                                <TableCell className='text-center' colSpan={6}>No record found</TableCell>
                            </TableRow>
                        )}

                        {depositLogs.map((item, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell style={{textAlign:"center"}}>
                                        {item.status == 0 ?
                                            (<>Pending</>) :
                                            (item.status == 1 ?
                                                <>Done<CustomFontAwesomeIcon
                                                    color={'green'}
                                                    icon={faCheckCircle}
                                                /></> :
                                                '')}
                                    </TableCell>
                                    <TableCell style={{textAlign:"center"}}>{item.user_id}</TableCell>
                                    <TableCell style={{textAlign:"center"}}>
                                        {new Date(item.created_at).toLocaleDateString()} {new Date(item.created_at).toLocaleTimeString()}
                                    </TableCell>
                                    <TableCell style={{textAlign:"center"}}>{item.amount}</TableCell>
                                    <TableCell style={{textAlign:"center"}}>{getType(item.type)}</TableCell>

                                    <TableCell style={{textAlign:"center"}}>
                                        <TransactionInfoPage transactionHash={item.transaction_hash}/>
                                    </TableCell>
                                    <TableCell style={{textAlign:"center"}}>
                                        {item.status == 1 ? "Confirmed" :"Waiting"}
                                    </TableCell>

                                </TableRow>
                            );
                        })}

                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    )
}

export default  MyDepositLogs;
