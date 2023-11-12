import AppBar from '@mui/material/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectFooterTheme } from 'app/store/fuse/settingsSlice';
import PoweredByLinks from '../../shared-components/PoweredByLinks';
import PurchaseButton from '../../shared-components/PurchaseButton';
import { Copyright } from '@mui/icons-material';

function FooterLayout2(props) {
  const footerTheme = useSelector(selectFooterTheme);

  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar
        id="fuse-footer"
        className={clsx('relative z-20 shadow-md', props.className)}
        color="default"
        sx={{ backgroundColor: '#6A1B9A', boxShadow: "0 -2px 2px rgba(0,0,0,0.3) !important" }}
      >
        <Toolbar className="container min-h-48 md:min-h-32 px-8 sm:px-12 py-0 flex items-center overflow-x-auto">
          <div className="flex grow shrink-0 items-center">
            <Copyright className="mx-4" />
              Copyright By Autunite LLC
          </div>
          <div className="flex grow shrink-0 px-12 justify-end">
            <PoweredByLinks />
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(FooterLayout2);
