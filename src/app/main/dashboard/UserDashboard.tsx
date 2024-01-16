import React, {useEffect, useState} from 'react';
import {Paper} from '@mui/material';
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
import {makeStyles} from "@mui/styles";
import clsx from "clsx";
import Carousel from 'react-material-ui-carousel'
import HomeBackground from "../../shared-components/HomeBackground";
import CustomTitle from '../../shared-components/CustomTitle';
import CoinsReadme from "./CoinsReadme";

const useStyles = makeStyles((theme) => ({
    title: {
        textShadow: '2px 2px 2px rgba(0,0,0,0.1)',
        marginBottom: 10
    },
    tableRow: {
        backgroundColor: 'rgba(25, 251, 155, 0.1)',
    },
    rowImage: {
        borderRadius: 5,
        boxShadow: "2px 2px 2px rgba(0,0,0,0.2)"
    }
}));

function Item(props) {
    return (
        <Paper>
            <img src={props.item.imageUrl} className="h-200 w-full rounded-lg"/>
        </Paper>
    )
}

function UserDashboard() {
    const classes = useStyles();
    const user = useSelector(selectUser);
    useEffect(() => {
        setState({
            ...state,
            leftLink: user.data.leftReferralLink,
            leftCode: user.data.leftReferralCode,
            rightLink: user.data.rightReferralLink,
            rightCode: user.data.rightReferralCode,
        });
    }, [user]);
    useEffect(() => {
        axios.get(
            'api/dashboard-data',
        ).then((res) => {
            let data = res.data.data;
            setState({
                ...state,
                ...data,
            });
        });
    }, []);
    const [state, setState] = useState({
        sliderItems: [],
        userNft: {
            imgUrl: '',
            code: '',
            createdAt: "",
            totalDeposit: 0,
            leftCredit: 0,
            rightCredit: 0,
        },
        userContract: {
            lastExpireDate: '',
            nextPriod: undefined,
        },
        myAvailableIncomes: 0,
        totalIncome: 0,
        totalReferralBonus: 0,
        totalROI: 0,
        totalAward: 0,
        bannerText: '',
        numberOfMyGroups: 0,
        leftGroupCredit: 0,
        rightGroupCredit: 0,
        leftLink: '',
        leftCode: '',
        rightLink: '',
        rightCode: '',
        nfts: [],
    });


    return (
        <>
            <HomeBackground img={1}/>
            <div className='flex flex-col items-center p-24 sm:p-40 container opacity-90'>
                <div className='flex flex-col w-full max-w-4xl'>
                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <div className='mt-8 text-2xl font-extrabold tracking-tight leading-tight'>
                            <Carousel>
                                {
                                    state.sliderItems.map((item, i) => <Item key={i} item={item}/>)
                                }
                            </Carousel>
                        </div>
                        <NftData code={state.userNft.code}
                                 imgUrl={state.userNft.imgUrl}
                                 leftCredit={state.userNft.leftCredit}
                                 rightCredit={state.userNft.rightCredit}
                                 totalDeposit={state.userNft.totalDeposit}
                                 lastExpireDate={state.userContract.lastExpireDate}
                                 createdAt={state.userNft.createdAt}
                        />

                        <div className={clsx('flex text-center font-medium justify-center')}>
                            <div>
                                {state.userContract.nextPriod &&
                                    <CustomTimer expiryTimestamp={state.userContract.nextPriod}/>}
                            </div>
                        </div>


                        <CustomTitle>
                            My Available Incomes: <span>{state.myAvailableIncomes} $</span>
                        </CustomTitle>
                        <div
                            className={clsx('mt-8 text-2xl font-extrabold tracking-tight leading-tight', classes.title)}>

                        </div>
                        <TableContainer sx={{maxHeight: 440}} className='lg:px-80 w-full'>
                            <Table stickyHeader aria-label='sticky table' className='lg:px-80 w-full'>
                                <TableBody className="w-full">
                                    <TableRow>
                                        <TableCell>Total Income</TableCell>
                                        <TableCell>{state.totalIncome} $</TableCell>
                                    </TableRow>
                                    <TableRow className={classes.tableRow}>
                                        <TableCell>Total Referral Bonus</TableCell>
                                        <TableCell>{state.totalReferralBonus} $</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Total ROI</TableCell>
                                        <TableCell>{state.totalROI} $</TableCell>
                                    </TableRow>
                                    <TableRow className={classes.tableRow}>
                                        <TableCell>Total Award</TableCell>
                                        <TableCell>{state.totalAward} $</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <CustomTitle>
                            Number Of My Groups: <span>{state.numberOfMyGroups}</span>
                        </CustomTitle>
                        <TableContainer sx={{maxHeight: 440}} className='lg:px-80'>
                            <Table stickyHeader aria-label='sticky table' className='lg:px-80'>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Left Credit</TableCell>
                                        <TableCell>{state.leftGroupCredit} $</TableCell>
                                    </TableRow>
                                    <TableRow className={classes.tableRow}>
                                        <TableCell>Right Credit</TableCell>
                                        <TableCell>{state.rightGroupCredit} $</TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>


                        <CustomTitle>
                            My Referral Links
                        </CustomTitle>
                        <TableContainer sx={{maxHeight: 440}} className='lg:px-80'>
                            <Table stickyHeader aria-label='sticky table' className='lg:px-80'>
                                <TableBody>
                                    <TableRow className={classes.tableRow}>
                                        <TableCell>Left Code</TableCell>
                                        <TableCell>
                                            <CustomCopyToClipboard link={user.data.leftReferralCode}
                                                                   text={user.data.leftReferralCode}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Left Link</TableCell>
                                        <TableCell>
                                            <CustomCopyToClipboard link={user.data.leftReferralLink}
                                                                   text={user.data.leftReferralLink}/>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow className={classes.tableRow}>
                                        <TableCell>Right Code</TableCell>
                                        <TableCell>
                                            <CustomCopyToClipboard link={user.data.rightReferralCode}
                                                                   text={user.data.rightReferralCode}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Right Link</TableCell>
                                        <TableCell>
                                            <CustomCopyToClipboard link={user.data.rightReferralLink}
                                                                   text={user.data.rightReferralLink}/>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>


                        <TableContainer sx={{maxHeight: 440}} className='lg:px-80'>
                            <Table stickyHeader aria-label='sticky table' className='lg:px-80'>
                                <TableBody>

                                    {state.nfts.map((nft, i) => {
                                        return (
                                            <TableRow key={i} className={clsx(i % 2 !== 0 ? classes.tableRow : '')}>
                                                <TableCell>
                                                    <img className={clsx('w-48', classes.rowImage)} src={nft.imgUrl}
                                                         alt='logo'/>
                                                </TableCell>
                                                <TableCell>{nft.name}</TableCell>
                                                <TableCell>{nft.price} $</TableCell>
                                            </TableRow>
                                        );
                                    })}


                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>


                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>

                        <CoinsReadme/>

                    </Paper>
                </div>
            </div>
        </>
    );
}

export default UserDashboard;
