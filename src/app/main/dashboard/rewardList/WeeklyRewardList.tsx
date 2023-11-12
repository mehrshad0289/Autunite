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
import CustomWaiting from "../../../shared-components/CustomWaiting";
import CustomFontAwesomeIcon from "../../../shared-components/CustomFontAwesomeIcon";
import themesConfig from "../../../configs/themesConfig";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import dateFormat from "dateformat";

function WeeklyRewardList() {

  const [state, setState] = useState({
    loading: false,
  });

  const [rewards,setRewards] =useState([])


  useEffect(() => {
    setState({
      ...state,
      loading: true
    })
    axios.get(
      'api/weekly-rewards',
    ).then((res) => {
      let data = res.data.data;
      setRewards(data);
    }).finally(()=>{
      setState({
        ...state,
        loading: false
      })
    });
  }, []);

  return (
    <>
      <HomeBackground img={5} />
      <CustomWaiting open={state.loading} message={"please Wait!"}/>
      <div className='flex flex-col items-center p-24 sm:p-40 container opacity-90'>
        <div className='flex flex-col w-full max-w-4xl'>
          <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
            <CustomTitle>
              Weekly Award List
            </CustomTitle>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>Execution Time</TableCell>
                    <TableCell>Operations</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {rewards.map((rewardData, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>{rewardData.status}</TableCell>
                        <TableCell>{dateFormat(rewardData.execute_time,"yyyy-mm-dd HH:MM")}</TableCell>
                        <TableCell>
                          <Link to={`/admin/reward-info/${rewardData.id}`} className="mx-10 "
                                style={{backgroundColor: '#fff', border: 'none'}}>
                            <CustomFontAwesomeIcon
                                color={themesConfig.default.palette.secondary.main}
                                icon={faEye}
                            />
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {rewards.length === 0 && (
                    <TableRow>
                      <TableCell className='text-center' colSpan={6}>You have no Weekly Award Job</TableCell>
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

export default WeeklyRewardList;
