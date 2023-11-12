import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { motion } from 'framer-motion';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/userSlice';
import CustomCopyToClipboard from '../../../shared-components/CustomCopyToClipboard';
import HomeBackground from '../../../shared-components/HomeBackground';
import CustomTitle from '../../../shared-components/CustomTitle';

import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
    tableRow: {
        backgroundColor: 'rgba(25, 251, 155, 0.1)',
    },
}));

function MyReferralLinks() {
    const classes = useStyles();

    const user = useSelector(selectUser);



    return (
        <>
            <HomeBackground img={8} />
            <div className='flex flex-col items-center p-24 sm:p-40 container opacity-90'>
                <div className='flex flex-col w-full max-w-4xl'>



                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            My Referral Links
                        </CustomTitle>
                        <TableContainer sx={{ maxHeight: 440 }} className='lg:px-80'>
                            <Table stickyHeader aria-label='sticky table' className='lg:px-80'>
                                <TableBody>
                                    <TableRow className={classes.tableRow}>
                                        <TableCell>Left Code</TableCell>
                                        <TableCell>
                                            <CustomCopyToClipboard link={user.data.leftReferralCode} text={user.data.leftReferralCode} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Left Link</TableCell>
                                        <TableCell>
                                            <CustomCopyToClipboard link={user.data.leftReferralLink} text={user.data.leftReferralLink} />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow className={classes.tableRow}>
                                        <TableCell>Right Code</TableCell>
                                        <TableCell>
                                            <CustomCopyToClipboard link={user.data.rightReferralCode} text={user.data.rightReferralCode} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell>Right Link</TableCell>
                                        <TableCell>
                                            <CustomCopyToClipboard link={user.data.rightReferralLink} text={user.data.rightReferralLink} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>


                    </Paper>
                </div>
            </div>
        </>
    );
}

export default MyReferralLinks;
