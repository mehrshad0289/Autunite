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
import CustomFontAwesomeIcon from "../../../shared-components/CustomFontAwesomeIcon";
import themesConfig from "../../../configs/themesConfig";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

function FailedNfts() {

  const [state, setState] = useState({
    nfts: [],
  });


  useEffect(() => {
    axios.get(
      'api/pending-nfts',
    ).then((res) => {
      let data = res.data.data;
      setState({
        ...state,
        nfts: data,
      });
    });
  }, []);

  return (
    <>
      <HomeBackground img={1} />
      <div className='flex flex-col items-center p-24 sm:p-40 container'>
        <div className='flex flex-col w-full max-w-4xl'>
          <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
            <CustomTitle>
              Failed Nfts
            </CustomTitle>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>message</TableCell>
                    <TableCell>exception_message</TableCell>
                    <TableCell>exception</TableCell>
                    <TableCell>data</TableCell>
                    <TableCell>data_ids</TableCell>
                    <TableCell>progress</TableCell>
                    <TableCell>job_id</TableCell>
                    <TableCell>status</TableCell>
                    <TableCell>Created At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {state.nfts.map((row, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>
                          <Link to={`/admin/user-info/${row.user_id}`} className="mx-10 " style={{backgroundColor:'#fff',border:'none'}}>
                            <CustomFontAwesomeIcon
                                color={themesConfig.default.palette.secondary.main}
                                icon={faEye}
                            />
                          </Link>
                        </TableCell>
                        <TableCell>{row.amount}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>{new Date(row.created_at).toLocaleDateString()} {new Date(row.created_at).toLocaleTimeString()}</TableCell>
                      </TableRow>
                    );
                  })}
                  {state.nfts.length === 0 && (
                    <TableRow>
                      <TableCell className='text-center' colSpan={6}>You have no Job</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

          </Paper>
        </div>
      </div>
    </>);


}

export default FailedNfts;
