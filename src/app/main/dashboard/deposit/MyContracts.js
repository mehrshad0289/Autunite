import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { motion } from 'framer-motion';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import HomeBackground from "../../../shared-components/HomeBackground";
import CustomTitle from '../../../shared-components/CustomTitle';

function MyContracts() {
    const [nft,setNft] = useState(null)
    const [state,setState] = useState({
        pendingROI:0,
        totalROI:0,
        nftValue:0,
        contractsValue:0,
        contracts:[]
    });



    useEffect(()=>{
        axios.get(
            'api/nft-list'
        ).then((res)=>{
            if(res.data.data.length>0){
                setNft(res.data.data[0])
            }
        });

        axios.get(
            'api/contract/user-contracts'
        ).then((res)=>{
            let data =res.data.data;
            setState({
                ...state,
                pendingROI:data.pendingROI,
                totalROI:data.totalROI,
                nftValue:data.nftValue,
                contractsValue:data.contractsValue,
                contracts :data.contracts,
            })
        });
    },[])
    const item = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0 },
    };
    return (
        <>
            <HomeBackground img={2}/>
            <div className='flex flex-col items-center p-24 sm:p-40 container opacity-90'>
                <div className='flex flex-col w-full max-w-4xl'>
                    <Card component={motion.div} variants={item} className="w-full mb-32">
                        <div className="px-32 pt-24">
                            <CustomTitle>
                                Nft Information
                            </CustomTitle>
                        </div>

                        <CardContent className="px-32 py-24 grid lg:grid-cols-2 sm:grid-cols-1">

                            <div className="col-span-1">
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Code</Typography>
                                    <Typography>{nft ? nft.user_id :"You have no nft"}</Typography>
                                </div>

                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Activation Date</Typography>
                                    <Typography>{nft ? `${new Date(nft.created_at).toLocaleDateString()} ${new Date(nft.created_at).toLocaleTimeString()}` : ""}</Typography>
                                </div>
                            </div>
                            <div
                                className='col-span-1'>

                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
                                    {nft && (
                                      <Avatar
                                        sx={{ borderColor: 'background.paper' }}
                                        className='w-128 h-128 border-4'
                                        src={nft ?`${axios.defaults.baseURL}/${nft.image_url}` :""}
                                      />
                                    )}

                                </motion.div>

                            </div>
                        </CardContent>
                    </Card>


                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            My Contracts
                        </CustomTitle>
                        <TableContainer sx={{maxHeight: 440}} className="lg:px-80">
                            <Table stickyHeader aria-label="sticky table" className="lg:px-80">
                                <TableBody>
                                    <TableRow>
                                        <TableCell >Pending ROI</TableCell>
                                        <TableCell >{state.pendingROI} $</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell >Total ROI</TableCell>
                                        <TableCell >{state.totalROI} $</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell >Nft Value</TableCell>
                                        <TableCell >{state.nftValue} $</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Contracts Value</TableCell>
                                        <TableCell >{state.contractsValue} $</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>


                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label='sticky table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='right'>Title</TableCell>
                                        <TableCell align='right'>Amount</TableCell>
                                        <TableCell align='right'>Term</TableCell>
                                        <TableCell align='right'>Start As</TableCell>
                                        <TableCell align='right'>Expire</TableCell>
                                        <TableCell align='right'>Monthly Percent</TableCell>
                                        <TableCell align='right'>Total Percent</TableCell>
                                        <TableCell align='right'>Total Pay</TableCell>
                                        <TableCell align='right'>ROI</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {state.contracts.map(contract=>{
                                        return (
                                            <TableRow>
                                                <TableCell align='right'>{contract.title}</TableCell>
                                                <TableCell align='right'>{contract.amount}$</TableCell>
                                                <TableCell align='right'>{contract.term}M</TableCell>
                                                <TableCell align='right'>{contract.startAs}</TableCell>
                                                <TableCell align='right'>{contract.expire}</TableCell>
                                                <TableCell align='right'>{contract.monthlyPay}%</TableCell>
                                                <TableCell align='right'>{contract.totalPay}%</TableCell>
                                                <TableCell align='right'>{contract.totalPay * contract.amount /100}$</TableCell>
                                                <TableCell align='right'>{contract.ROI}$</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                    {state.contracts.length ===0 &&(
                                        <TableRow>
                                            <TableCell className="text-center" colSpan={8}>You have no contract</TableCell>
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

export default MyContracts;
