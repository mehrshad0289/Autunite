import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {Controller, useForm} from 'react-hook-form';
import _ from '@lodash';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useRef, useState} from 'react';
import {showMessage} from '../../../store/fuse/messageSlice';
import axios from 'axios';
import jwtServiceConfig from '../../../auth/services/jwtService/jwtServiceConfig';
import HomeBackground from '../../../shared-components/HomeBackground';
import CustomTitle from '../../../shared-components/CustomTitle';
import {useParams} from 'react-router-dom';
import {selectUser} from '../../../store/userSlice';
import CustomFontAwesomeIcon from '../../../shared-components/CustomFontAwesomeIcon';
import {faBan, faCheckCircle, faRefresh, faTrash} from '@fortawesome/free-solid-svg-icons';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import {InputAdornment} from "@mui/material";
import {useTimer} from "react-timer-hook";
import {makeStyles} from "@mui/styles";
import CustomWaiting from "../../../shared-components/CustomWaiting";


const defaultValues = {
    amount: 0,
    confirmationCode: '',
    /*  twoFactorAuthCode: '',
      fundPassword: ''*/
};
const schema = yup.object().shape({
    amount: yup.number().required('You must enter a amount'),
    confirmationCode: yup.string().required('confirmation code is required'),
    /*twoFactorAuthCode: yup.string().required('Two factor auth code is required'),
    fundPassword: yup.string().required('Fund password  is required'),*/
});
const useStyles = makeStyles((theme) => ({
    timer: {
        width: 50,
        margin: 5,
    },
    timerValue: {
        width: '100%',
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
        borderRadius: 5,
        color: '#6a1b9a',
    },

}));


function WithDraw() {
    const amountInputRef = useRef(null);
    const [loading, setLoading] = useState(false)
    const classes = useStyles();
    const {slug} = useParams();
    const user = useSelector(selectUser);
    const [nft, setNft] = useState(null);
    const dispatch = useDispatch();


    const [state, setState] = useState({
        isActiveConfirmButton: true,
        expiryTimestamp: new Date(),
        loading: false,
        list: [],
    });
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp: state.expiryTimestamp,
        onExpire: () => {
            setState({
                ...state,
                isActiveConfirmButton: true,
            });
        },
    });


    const {control, handleSubmit, watch, formState} = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });
    const {isValid, dirtyFields, errors} = formState;
    const form = watch();

    function onSubmit({
                          amount,
                          confirmationCode
                          /*fundPassword ,twoFactorAuthCode*/
                      }) {
        if(amount <= 0 ){
            dispatch(showMessage({
                message: "invalid amount",
                variant: 'error',
            }));
            return
        }
        setLoading(true)
        axios.post(jwtServiceConfig.withdraw, {
            walletSlug: slug,
            amount: amount,
            confirmationCode: confirmationCode,
            /* fundPassword: fundPassword,
             twoFactorAuthCode: twoFactorAuthCode,*/
        })
            .then((response) => {
                getMyWithdrawList();
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

            }).finally(() => {
            setLoading(false)
        });
    }


    function deletePendingWithdraw(id) {

        setLoading(true)
        axios.post(jwtServiceConfig.deletePendingWithdraw, {
            id: id,
        })
            .then((response) => {
                getMyWithdrawList();
                dispatch(showMessage({
                    message: 'Successfully deleted',
                    variant: 'success',
                }));
            })
            .catch((error) => {

                dispatch(showMessage({
                    message: error.response.data.message,
                    variant: 'error',
                }));

            }).finally(() => {
            setLoading(false)
        });
    }

    useEffect(() => {
        axios.get(`/api/user/${user.data.id}/nft`).then((res) => {
            setNft(res.data);
        });
    }, [user]);


    const resetTimer = () => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 60);
        restart(time);

        setState({
            ...state,
            isActiveConfirmButton: false,
        });
    };

    function sendConfirmCode() {
        setLoading(true)
        axios.post(jwtServiceConfig.sendConfirmation, {})
            .then((response) => {
                dispatch(showMessage({
                    message: 'successfully sent',
                    variant: 'success',
                }));
                resetTimer();
            })
            .catch((error) => {
                dispatch(showMessage({
                    message: error.response.data.message,
                    variant: 'error',
                }));

            }).finally(() => {
            setLoading(false)
        });
    }


    useEffect(() => {
        getMyWithdrawList();
    }, []);

    function getMyWithdrawList() {
        setLoading(true)
        axios.get(jwtServiceConfig.myWithdraws, {})
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
            }).finally(() => {
            setLoading(false)
        });
    }

    if (_.isEmpty(form)) {
        return null;
    }

    const showStatus = (status) => {
        if (status == 0)
            return "Pending";
        if (status == 1)
            return <><CustomFontAwesomeIcon
                color={'green'}
                icon={faCheckCircle}
            />Done</>;
        if (status == -1)
            return <><CustomFontAwesomeIcon
                color={'red'}
                icon={faBan}
            />Rejected</>;
        return "";
    }

    return (
        <>
            <HomeBackground img={6}/>
            <CustomWaiting open={loading} message={"please Wait!"}/>
            <div className='flex flex-col items-center p-24 sm:p-40 container'>
                <div className='flex flex-col w-full max-w-4xl'>
                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            Withdraw
                        </CustomTitle>

                        <form onSubmit={handleSubmit(onSubmit)} className='px-0 sm:px-24'>
                            <div className='mb-24'>
                                <Typography className='text-2xl font-bold tracking-tight'>
                                    Address:
                                </Typography>
                                <Typography color='text.secondary'>
                                    {nft?.owner}
                                </Typography>
                                <Typography color='text.secondary'>
                                    BEP20
                                </Typography>
                            </div>
                            <div className='space-y-32'>
                                <Controller
                                    name='amount'
                                    control={control}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            className='mb-24'
                                            label='Amount'
                                            type='number'
                                            inputRef={amountInputRef}
                                            error={!!errors.amount}
                                            helperText={errors?.amount?.message}
                                            variant='outlined'
                                            required
                                            fullWidth
                                        />
                                    )}
                                />
                                {/*<Controller
                  name='fundPassword'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className='mb-24'
                      label='Fund Password'
                      type='password'
                      error={!!errors.fundPassword}
                      helperText={errors?.fundPassword?.message}
                      variant='outlined'
                      required
                      fullWidth
                    />
                  )}
                />*/}
                                {/*<Controller
                  name='twoFactorAuthCode'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className='mb-24'
                      label='Two Factor Auth Code'
                      type='password'
                      error={!!errors.twoFactorAuthCode}
                      helperText={errors?.twoFactorAuthCode?.message}
                      variant='outlined'
                      required
                      fullWidth
                    />
                  )}
                />*/}

                                <Controller
                                    name='confirmationCode'
                                    control={control}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            className='mb-24'
                                            label='Email Confirm Code'
                                            type='text'
                                            error={!!errors.confirmationCode}
                                            helperText={errors?.confirmationCode?.message}
                                            variant='outlined'
                                            required
                                            fullWidth
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        {state.isActiveConfirmButton && (
                                                            <Button onClick={sendConfirmCode} color="secondary"
                                                                    size="small"
                                                                    variant="contained">
                                                                Send
                                                            </Button>
                                                        )}
                                                        {!state.isActiveConfirmButton && (
                                                            <div className={classes.timer}>
                                                                <div className={classes.timerValue}>
                                                                    <span className="p-2 mx-2">{seconds}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </InputAdornment>
                                                ),
                                            }}

                                        />

                                    )}
                                />

                            </div>

                            <div className='mb-24 mt-24'>
                                <Typography className='flex font-bold tracking-tight'>
                                    Actual Arrival: <Typography color='text.secondary'>
                                    {amountInputRef.current?.value>0 ?  parseFloat(amountInputRef.current?.value)-1 : ""}
                                </Typography>
                                </Typography>

                                <Typography className='flex font-bold tracking-tight'>
                                    Transaction Fee: <Typography color='text.secondary'>
                                    1 $
                                </Typography>
                                </Typography>

                            </div>
                        </form>
                        <div className='flex items-center justify-end mt-32'>
                            <Button className='mx-8'>Cancel</Button>
                            <Button
                                className='mx-8'
                                variant='contained'
                                color='secondary'
                                disabled={_.isEmpty(dirtyFields) || !isValid}
                                onClick={handleSubmit(onSubmit)}
                            >
                                Withdraw
                            </Button>
                        </div>

                    </Paper>

                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            My Withdraw List
                        </CustomTitle>
                        <TableContainer sx={{maxHeight: 440}}>
                            <Table stickyHeader aria-label='sticky table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Wallet</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Created At</TableCell>
                                        <TableCell>Operations</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {state.list.map((item, i) => {
                                        return (
                                            <TableRow key={i}>
                                                <TableCell>{item.id}</TableCell>
                                                <TableCell>{item.amount}</TableCell>
                                                <TableCell>{item.wallet.name}</TableCell>
                                                <TableCell>
                                                    {showStatus(item.status)}
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(item.created_at).toLocaleDateString()} {new Date(item.created_at).toLocaleTimeString()}
                                                </TableCell>
                                                <TableCell>
                                                    {item.status==0 &&(<>
                                                        <CustomFontAwesomeIcon
                                                            color={'red'}
                                                            icon={faTrash}
                                                            onClick={()=>{deletePendingWithdraw(item.id)}}
                                                        />
                                                    </>)}
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

export default WithDraw;
