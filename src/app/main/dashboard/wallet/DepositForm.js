import { useAccount, useContract, useSigner } from 'wagmi';
import React, { useEffect, useState } from 'react';
import HomeBackground from '../../../shared-components/HomeBackground';
import axios from 'axios';
import { showMessage } from '../../../store/fuse/messageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getContractAbi, getContractAddress, getUSDContractAbi, getUSDContractAddress } from '../helper';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { LoadingButton } from '@mui/lab';
import { Paper } from '@mui/material';
import { Web3Button } from '@web3modal/react';
import { selectUser } from '../../../store/userSlice';
import CustomTitle from '../../../shared-components/CustomTitle';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import CustomFontAwesomeIcon from '../../../shared-components/CustomFontAwesomeIcon';
import { faCheckCircle, faRefresh } from '@fortawesome/free-solid-svg-icons';
import jwtServiceConfig from '../../../auth/services/jwtService/jwtServiceConfig';
import TransactionInfoPage from "../create-nft-new/TransactionInfoPage";


export default function DepositForm() {
  const [nftData, setNftData] = useState(undefined);
  const account = useAccount();
  const singer = useSigner();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [amountValue, setAmountValue] = useState(undefined);
  const [approveBtnStatus, setApproveBtnStatus] = useState(true);
  const [approveBtnLoading, setApproveBtnLoading] = useState(false);
  const [approveBtnText, setApproveBtnText] = useState('Top Up');
  const [showCreateBtn, setShowCreateBtn] = useState(false);

  const user = useSelector(selectUser);

  const [inputError, setInputError] = useState(false);

  const handleTextChange = (event) => {
    event.preventDefault();
    setAmountValue(event.target.value);
  };

  useEffect(() => {
    axios.get(
      'api/nft-list',
    ).then((res) => {
      console.log(res);
      if (!res.data.data[0]) {
        setNftData(false);
      } else {
        setNftData(res.data.data[0]);
      }
    });
  }, []);


  const [state, setState] = useState({
    list: [],
  });
  useEffect(() => {
    getMyDepositList();
  }, []);
  function getMyDepositList() {
    axios.get(jwtServiceConfig.myDeposits, {})
      .then((response) => {
        const data = response.data.data;
        setState({
          ...state,
          list: data,
        });
      })
      .catch((error) => {
        dispatch(showMessage({
          message: error.response.data.message,
          variant: 'error',
        }));
      });
  }

  const retryDeposit =(depositId)=>{
    axios.post(jwtServiceConfig.retryDeposit, {
      depositId:depositId
    })
      .then((response) => {
        getMyDepositList()
        dispatch(showMessage({
          message: 'Successfully saved',
          variant: 'success',
        }));
      })
      .catch((error) => {
        dispatch(showMessage({
          message: error.response.data.message,
          variant: 'error',
        }));
      });
  }


  const USDContract = useContract({
    address: getUSDContractAddress(),
    abi: getUSDContractAbi(),
    signerOrProvider: singer.data,
  });

  const contract = useContract({
    address: getContractAddress(),
    abi: getContractAbi(),
    signerOrProvider: singer.data,
  });

  const checkAndApprove = async () => {
    if (account.address) {
      if (amountValue) {
        setApproveBtnLoading(true);
        setApproveBtnStatus(false);
        const check = await USDContract.allowance(account.address, getContractAddress());
        console.log(parseInt(check._hex / 10 ** 18));
        if (parseInt(check._hex / 10 ** 18) < amountValue) {
          setApproveBtnText('Approving');
          try {
            await USDContract.approve(getContractAddress(), (amountValue * 10 ** 15) + '000').then(res => {
              setApproveBtnText('Approved');
              setApproveBtnLoading(false);
              setApproveBtnStatus(false);
              setTimeout(() => {
                setShowCreateBtn(true);
              }, 2000);
            });
            USDContract.on('error', (event) => {
              console.log(event);
              setApproveBtnStatus(true);
              setApproveBtnLoading(false);

            });
          } catch (e) {
            if (e.code === 'ACTION_REJECTED') {
              dispatch(showMessage({
                message: 'User denied transaction signature.',
                variant: 'error',
              }));
            }
            setApproveBtnText('Approve');
            setApproveBtnStatus(true);
            setApproveBtnLoading(false);
          }

        } else {
          setApproveBtnText('Approved');
          setShowCreateBtn(true);
          setApproveBtnStatus(false);
          setApproveBtnLoading(false);
        }
      } else {
        setInputError(true);
        dispatch(showMessage({
          message: 'Please Enter Valuation!',
          variant: 'error',
        }));
      }
    } else {
      dispatch(showMessage({
        message: 'Wallet Not Connected!',
        variant: 'error',
      }));
    }
  };


  const topUp = async (event) => {
    event.preventDefault();
    const amount = event.target.amount.value;

    console.log(user.data.id);
    if (account.address) {
      setInputError(false);
      if (amount) {
        setLoading(true);
        try {
          let topUpDeposit = await contract.topUp(nftData.token_id, (amount * 10 ** 15) + '000').then(res => res);
          await topUpDeposit.wait().then(res => {

            const depositData = new FormData();
            depositData.append('transaction_hash', res.transactionHash);
            depositData.append('amount', amount);

            setTimeout(() => {

              axios.post(
                'api/deposit',
                depositData,
              ).then(res => {
                setLoading(false);
                console.log(res);
                dispatch(showMessage({
                  message: 'Top Up Seccessful.',
                }));
              }).catch((err) => {
                console.log(err.response.data.message);
                dispatch(showMessage({
                  variant: 'error',
                  message: err.response.data.message,
                }));
                setLoading(false);

              });
            }, 2000);

          });

        } catch (e) {
          setLoading(false);
          console.log(e.data);
          console.log('IsSuccess ' + isSuccess);
        }


      } else {
        setInputError(true);
        dispatch(showMessage({
          message: 'Please Enter Valuation!',
          variant: 'error',
        }));

      }
    } else {
      dispatch(showMessage({
        message: 'Wallet Not Connected!',
        variant: 'error',
      }));
    }

  };


  return (
    <>
      <HomeBackground img={5} />

      <div className='flex flex-col items-center p-24 sm:p-40 container'>
        <div className='flex flex-col w-full max-w-4xl'>


          {nftData ? (<>
            <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
              <div className={'text-center'}>
                <Web3Button />
              </div>
              <form onSubmit={topUp}>
                <h2>Deposit</h2>
                <br />
                <FormControl fullWidth>
                  <InputLabel htmlFor='outlined-adornment-amount' error={inputError}>Valuation</InputLabel>
                  <OutlinedInput
                    error={inputError}
                    name='amount'
                    onChange={handleTextChange}
                    id='outlined-adornment-amount'
                    startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                    label='Amount'
                  />
                </FormControl>
                &nbsp;
                <br />
                &nbsp;

                <LoadingButton
                  loadingIndicator='Approve…'
                  loading={approveBtnLoading}
                  variant='contained'
                  color='info'
                  onClick={checkAndApprove}
                  disabled={!approveBtnStatus}
                >
                  <span>{approveBtnText}</span>
                </LoadingButton>
                &nbsp;

                {showCreateBtn ?
                  <LoadingButton
                    color='info'
                    loading={loading}
                    type={'submit'}
                    loadingIndicator='Creating…'
                    variant='contained'
                  >
                    <span>Deposit</span>
                  </LoadingButton>
                  : ''}

              </form>
            </Paper>
          </>) : (
            <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
              <div className={'text-center'}>
                <h2>You have not NFT, please create a NFT</h2>
              </div>
            </Paper>
          )}


            <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
              <CustomTitle>
                My Deposits
              </CustomTitle>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label='sticky table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Operations</TableCell>
                      <TableCell>ID</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Transaction Hash</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Created At</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {state.list.map((item, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell>
                            {item.status===0 &&(<>
                              <CustomFontAwesomeIcon
                                color={'green'}
                                icon={faRefresh}
                                onClick={()=>{retryDeposit(item.id)}}
                              />
                            </>)}
                          </TableCell>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.amount}</TableCell>
                          <TableCell>
                            <TransactionInfoPage transactionHash={item.transaction_hash} />
                          </TableCell>
                          <TableCell>
                            {item.status === 0 ?
                              (<>Pending</>) :
                              (item.status === 1 ?
                                <><CustomFontAwesomeIcon
                                  color={'green'}
                                  icon={faCheckCircle}
                                />Done</> :
                                '')}
                          </TableCell>
                          <TableCell>
                            {new Date(item.created_at).toLocaleDateString()} {new Date(item.created_at).toLocaleTimeString()}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {state.list.length === 0 && (
                      <TableRow>
                        <TableCell className='text-center' colSpan={6}>No record found</TableCell>
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
