import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import CustomTitle from '../../../shared-components/CustomTitle';
import React, {useEffect, useState} from 'react';
const columns = [
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'roi', label: 'ROI', minWidth: 100 },

];

function createData(title, roi) {
  return { title, roi };
}

const rows = [
  createData('100-200', '6%'),
  createData('201-1000', '7%'),
  createData('1001-5000', '8%'),
  createData('5001-10000', '9%'),
  createData('10001-∞', '10%'),
];

const contractList = [
  {roi:"2% - 4%",amount:"100 - 1000"},
  {roi:"3% - 5%",amount:"1001 - 5000"},
  {roi:"4% - 6%",amount:"5001 - 10000"},
  {roi:"5% - 7%",amount:"+10001"},
]

function ContractList() {
  

  
  const [state,setState] = useState({
        contracts:[]
    });

  useEffect(()=>{
        // axios.get(
        //     'api/contract/getAll'
        // ).then((res)=>{
        //     let data =res.data.data;
        //     setState({
        //         ...state,
        //         contracts :data,
        //     })
        // });
    },[])

  return (
    <>
      <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
        <CustomTitle>
           NFT Staking Plans:
        </CustomTitle>
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                    <TableRow>
                        <TableCell  align='left'>Amount</TableCell>
                        <TableCell  align='left'>ROI</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="mt-10">
                  {
                    contractList.map((item,i)=>{
                      return (
                        <TableRow key={i}>
                          <TableCell align='left'>{item.amount}</TableCell>
                          <TableCell align='left'>{item.roi}</TableCell>
                        </TableRow>
                      )
                    })
                  }
                    {/*{state.contracts.map((contract,i)=>{*/}
                    {/*    return (*/}
                    {/*        <TableRow key={i}>*/}
                    {/*            <TableCell align='left'>{contract.title}</TableCell>*/}
                    {/*            <TableCell align='left'>{contract.percent}%</TableCell>*/}
                    {/*        </TableRow>*/}
                    {/*    )*/}
                    {/*})}*/}
                    {/*{state.contracts.length ===0 &&(*/}
                    {/*    <TableRow>*/}
                    {/*        <TableCell className="text-center" colSpan={8}>There are no contract</TableCell>*/}
                    {/*    </TableRow>*/}
                    {/*)}*/}



                </TableBody>
            </Table>
        </TableContainer>



       

      </Paper>
    </>
  );
}

export default ContractList;
