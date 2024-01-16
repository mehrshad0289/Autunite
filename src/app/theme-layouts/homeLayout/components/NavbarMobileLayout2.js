import FuseScrollbars from '@fuse/core/FuseScrollbars';
import {styled} from '@mui/material/styles';
import clsx from 'clsx';
import {memo} from 'react';
import NavbarToggleButton from '../../shared-components/NavbarToggleButton';
import Logo from '../../shared-components/Logo';
import Navigation from '../../shared-components/Navigation';
import {makeStyles} from "@mui/styles";

const Root = styled('div')(({theme}) => ({
    backgroundImage: 'linear-gradient(to bottom right, black 40%, #6A1B9A)',
    color: theme.palette.text.primary,

    '& ::-webkit-scrollbar-thumb': {
        boxShadow: `inset 0 0 0 20px ${
            theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.24)' : 'rgba(255, 255, 255, 0.24)'
        }`,
    },
    '& ::-webkit-scrollbar-thumb:active': {
        boxShadow: `inset 0 0 0 20px ${
            theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.37)' : 'rgba(255, 255, 255, 0.37)'
        }`,
    },
}));

const StyledContent = styled(FuseScrollbars)(({theme}) => ({
    overscrollBehavior: 'contain',
    overflowX: 'hidden',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 40px, 100% 10px',
    backgroundAttachment: 'local, scroll',
}));

function NavbarMobileLayout2(props) {
    return (
        <Root className={clsx('flex flex-col h-full overflow-hidden', props.className)}>
            <div className="flex flex-row items-center shrink-0 h-48 md:h-72 px-10">
                <div className="flex flex-1 mx-4">
                    <Logo/>
                </div>

                <NavbarToggleButton className={clsx("w-40 h-40 p-0")}/>
            </div>

            <StyledContent
                className="flex flex-1 flex-col min-h-0"
                option={{suppressScrollX: true, wheelPropagation: false}}
            >
                <div className='flex items-center justify-center'>
                    <img src="assets/images/logo/logo.png" style={{width: 200, height: 200}}/>
                </div>

                <Navigation layout="vertical"/>

                <div className="flex flex-0 items-center justify-center py-48">
                    <img className="w-full max-w-72" src="assets/images/autunite/icon.png" alt="footer logo"/>
                </div>
            </StyledContent>
        </Root>
    );
}

export default memo(NavbarMobileLayout2);
