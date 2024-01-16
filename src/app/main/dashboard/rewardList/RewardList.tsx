import React, { useEffect, useState } from 'react';
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

function RewardList() {

  const [state, setState] = useState({
    rewardList: [],
  });


  useEffect(() => {
    axios.get(
      'api/rewards',
    ).then((res) => {
      let data = res.data.data;
      setState({
        ...state,
        rewardList: data,
      });
    });
  }, []);

  return (
    <>
      <HomeBackground img={5} />
      <div className='flex flex-col items-center p-24 sm:p-40 container opacity-90'>
        <div className='flex flex-col w-full max-w-4xl'>
          <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
            <CustomTitle>
              Award List
            </CustomTitle>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Referral Code</TableCell>
                    <TableCell>Left</TableCell>
                    <TableCell>Right</TableCell>
                    <TableCell>Pending Award</TableCell>

                    <TableCell>Real Left</TableCell>
                    <TableCell>Real Right</TableCell>
                    <TableCell>Paid Award</TableCell>

                    <TableCell>Wallet Balance</TableCell>
                    <TableCell>Nft Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {state.rewardList.map((rewardData, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>{rewardData.referral_code}</TableCell>
                        <TableCell>{rewardData.left}</TableCell>
                        <TableCell>{rewardData.right}</TableCell>
                        <TableCell>{rewardData.pending_reward}</TableCell>
                        <TableCell>{rewardData.real_left}</TableCell>
                        <TableCell>{rewardData.real_right}</TableCell>
                        <TableCell>{rewardData.paid_reward}</TableCell>
                        <TableCell>{rewardData.wallet?.balance}</TableCell>
                        <TableCell>{rewardData.nft?.amount}</TableCell>
                      </TableRow>
                    );
                  })}
                  {state.rewardList.length === 0 && (
                    <TableRow>
                      <TableCell className='text-center' colSpan={6}>You have no Award</TableCell>
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

export default RewardList;
