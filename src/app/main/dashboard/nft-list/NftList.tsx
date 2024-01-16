import React, {useEffect, useState} from 'react';
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
import TransactionInfoPage from "../create-nft-new/TransactionInfoPage";
import CustomWaiting from "../../../shared-components/CustomWaiting";

function NftList() {
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        nftList: [],
    });


    useEffect(() => {
        refreshData()
    }, []);

    const refreshData = () => {
        setLoading(true)
        axios.get(
            'api/all-nft',
        ).then((res) => {
            let data = res.data.data;
            setState({
                ...state,
                nftList: data,
            });
        }).finally(()=>{
            setLoading(false)
        });
    }
    return (
        <>
            <CustomWaiting open={loading} message={"please Wait!"}/>
            <HomeBackground img={2}/>
            <div className='flex flex-col items-center p-24 sm:p-40 container' style={{backgroundColor: 'black'}}>
                <div className='flex flex-col w-full max-w-4xl'>
                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            Nft List
                        </CustomTitle>
                        <TableContainer sx={{maxHeight: 440}}>
                            <Table stickyHeader aria-label='sticky table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Transaction Hash</TableCell>
                                        <TableCell>Token Id</TableCell>
                                        <TableCell>Owner</TableCell>
                                        <TableCell>Created At</TableCell>
                                        <TableCell>User Referral Code</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {state.nftList.map((nft, i) => {
                                        return (
                                            <TableRow key={i}>
                                                <TableCell>
                                                    <img className='w-48'
                                                         src={`${process.env.REACT_APP_BACKEND_URL}/${nft.image_url}`}/>
                                                </TableCell>
                                                <TableCell>{nft.amount}</TableCell>
                                                <TableCell>
                                                    <TransactionInfoPage transactionHash={nft.transaction_hash}/>
                                                </TableCell>
                                                <TableCell>{nft.token_id}</TableCell>
                                                <TableCell>{nft.owner}</TableCell>
                                                <TableCell>{new Date(nft.created_at).toLocaleDateString()} {new Date(nft.created_at).toLocaleTimeString()}</TableCell>
                                                <TableCell>{nft.user_id}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {state.nftList.length === 0 && (
                                        <TableRow>
                                            <TableCell className='text-center' colSpan={6}>You have no nft</TableCell>
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

export default NftList;
