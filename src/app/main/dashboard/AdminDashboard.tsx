import React, {useEffect, useState} from 'react';
import {Button, Card, CardActions, Paper} from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import CustomCopyToClipboard from '../../shared-components/CustomCopyToClipboard';
import {useSelector} from 'react-redux';
import {selectUser} from '../../store/userSlice';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import CustomTimer from '../../shared-components/CustomTimer';
import NftData from './NftData';
import CardContent from "@mui/material/CardContent";
import CustomWaiting from "../../shared-components/CustomWaiting";


function AdminDashboard() {
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
        Admins: undefined,
        Users: undefined,
        Nft: undefined,
        Withdraws: undefined,
        UserContracts: undefined,
        Tickets: undefined,
        TotalDeposit: undefined,
        TotalAward: undefined,
        TotalPaidRoi: undefined,
        TotalPendingRoi: undefined,
        TotalPendingAward: undefined,
        TotalRefferalBonus: undefined,
        TotalCreationBonus: undefined,
    });


    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setLoading(true)
        axios.get(`/api/admin-dashboard-data`).then((res) => {
            setState(res.data.data)
        }).finally(() => {
            setLoading(false)
        });
    }


    return (
        <> <CustomWaiting open={loading} message={"please Wait!"}/>
            <div className='flex flex-col items-center p-24 sm:p-40 container'>
                <div className='flex flex-col w-full max-w-4xl'>
                    <Paper className='grid mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <div className='w-full gap-8 flex'>
                            <Card className="w-1/3">
                                <CardContent>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Users
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {state.Users}
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>
                            <Card className="w-1/3">
                                <CardContent>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Admins
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {state.Admins}
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>
                            <Card className="w-1/3">
                                <CardContent>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Nft
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {state.Nft}
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>
                        </div>
                        <div className='mt-12 w-full gap-8 flex'>
                            <Card className="w-1/3">
                                <CardContent>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Withdraws
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {state.Withdraws}
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>
                            <Card className="w-1/3">
                                <CardContent>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        User Contracts
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {state.UserContracts}
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>
                            <Card className="w-1/3">
                                <CardContent>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Tickets
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {state.Tickets}
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>
                        </div>
                        <div className='mt-12 w-full gap-8 flex'>
                            <Card className="w-1/3">
                                <CardContent>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Total Deposit
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {state.TotalDeposit}$
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>
                            <Card className="w-1/3">
                                <CardContent>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Total Award
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {state.TotalAward}$
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>
                            <Card className="w-1/3">
                                <CardContent>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Total Paid Roi
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {state.TotalPaidRoi}$
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>
                        </div>
                        <div className='mt-12 w-full gap-8 flex'>
                            <Card className="w-1/3">
                                <CardContent>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Total Pending Roi
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {state.TotalPendingRoi}$
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>
                            <Card className="w-1/3">
                                <CardContent>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Total Pending Award
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {state.TotalPendingAward}$
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>
                            <Card className="w-1/3">
                                <CardContent>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Total Refferal Bonus
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {state.TotalRefferalBonus}$
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>
                        </div>
                        <div className='mt-12 w-full gap-8 flex'>
                            <Card className="w-1/3">
                                <CardContent>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Total Creation Bonus
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {state.TotalCreationBonus}$
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>

                        </div>
                    </Paper>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;
