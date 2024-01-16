import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { faArrowDown, faArrowUp, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import CustomFontAwesomeIcon from '../../../../shared-components/CustomFontAwesomeIcon';
import CustomTitle from '../../../../shared-components/CustomTitle';
import { useParams } from 'react-router-dom';
import history from '@history'

function AccountBalanceWidget(props) {
    const theme = useTheme();
    const wallet = props;
    const { slug } = useParams();


    return (
        <Paper className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden'>
            <div className='flex flex-col p-24 pb-16'>
                <div className='flex items-start justify-between'>
                    <div className='flex flex-col'>
                        <CustomTitle>
                            {wallet.name}
                        </CustomTitle>
                        <Typography className='mr-16 text-sm font-medium tracking-tight leading-6 truncate'>
                            BEP20
                        </Typography>
                    </div>

                </div>
                <div className='grid items-center mt-24 mr-8 text-center justify-center'>
                    <img src="assets/images/coins/busd.png"  className="w-48"/>
                    <CustomTitle>
                        {wallet.balance} BUSD
                    </CustomTitle>
                </div>
                <div className='flex items-center mt-24 mr-8 text-center justify-center'>
                   {/* <div>
                        <Button
                            className='whitespace-nowrap font-medium text-sm rounded-full h-48 w-48'
                            variant='contained'
                            color='secondary'
                            onClick={()=>{history.push(`deposit/${slug}`)}}
                        ><CustomFontAwesomeIcon color={'white'} icon={faArrowDown} /></Button>
                        <Typography className='mr-16 text-sm  text-center font-medium tracking-tight leading-6 truncate'>
                            Deposit
                        </Typography>
                    </div>*/}
                    <div>
                        <Button
                            className='whitespace-nowrap font-medium text-sm rounded-full h-48 w-48'
                            variant='contained'
                            color='secondary'
                            onClick={()=>{history.push(`withdraw/${slug}`)}}
                        ><CustomFontAwesomeIcon color={'white'} icon={faArrowUp} /></Button>
                        <Typography className='mr-16 text-sm  text-center font-medium tracking-tight leading-6 truncate'>
                            Withdraw
                        </Typography>
                    </div>
                   {/* <div>
                        <Button
                            className='whitespace-nowrap font-medium text-sm rounded-full h-48 w-48'
                            variant='contained'
                            color='secondary'
                            onClick={()=>{history.push(`transfer/${slug}`)}}
                        ><CustomFontAwesomeIcon color={'white'} icon={faMoneyBillTransfer} /></Button>
                        <Typography className='mr-16 text-sm text-center font-medium tracking-tight leading-6 truncate'>
                            Transfer
                        </Typography>
                    </div>*/}

                </div>

            </div>
            <div className='flex flex-col flex-auto'>

            </div>
        </Paper>
    );
}

export default AccountBalanceWidget;
