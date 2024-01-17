import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { selectWallets } from '../store/walletsSlice';
import Button from '@mui/material/Button';
import history from '@history'
import CustomButton from "../../../../shared-components/CustomButton";
import CustomTitle from '../../../../shared-components/CustomTitle';

function PreviousStatementWidget(props) {
  const { id,name, slug, description, balance, created_at,updated_at } = props;
  return (
    <Paper className="relative flex flex-col flex-auto p-24 pr-12 pb-12 rounded-2xl shadow overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <img src="assets/images/coins/usdt.svg"  className="w-48"/>
          <CustomTitle>
            {name}
          </CustomTitle>
          <Typography className='text-green-600 font-medium text-sm'>
            BEP20
          </Typography>

        </div>
        <div className="-mt-8">
          <IconButton aria-label="more" size="large">
            <FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
          </IconButton>
        </div>
      </div>
      <div className="flex flex-row flex-wrap mt-16 -mx-24">
        <div className="flex flex-col mx-24 my-12">
          <Typography color="text.secondary" className="text-lg font-900 leading-none">
            Balance
          </Typography>
          <div className="flex">
            <Typography className="mt-8 font-medium text-3xl leading-none">
              {balance}
            </Typography>
            <Typography className='mt-8 text-green-600 font-medium text-sm'>
            USDT
            </Typography>
          </div>
        </div>

        <div className="flex flex-col mx-24 my-12">
          <CustomButton onClick={()=>{history.push(`wallet/${slug}`)}}
                        endIcon={<FuseSvgIcon size={20}>heroicons-solid:chevron-right</FuseSvgIcon>}
          >
            Show More
          </CustomButton>
        </div>

      </div>

      <div className="absolute bottom-0 ltr:right-0 rtl:left-0 w-96 h-96 -m-24">

      </div>
    </Paper>
  );
}

export default memo(PreviousStatementWidget);
