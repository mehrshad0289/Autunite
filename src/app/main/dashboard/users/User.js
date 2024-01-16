import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import useThemeMediaQuery from '../../../../@fuse/hooks/useThemeMediaQuery';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import NftInfo from './tabs/NftInfo';
import ParentInfo from './tabs/ParentInfo';
import ChildrenInfo from './tabs/ChildrenInfo';
import ContractsInfo from './tabs/ContractsInfo';
import RewardInfo from './tabs/RewardInfo';
import UserInfo from './tabs/UserInfo';
import DepositLogs from "./tabs/DepositLogs";


const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.palette.divider,
        '& > .container': {
            maxWidth: '100%',
        },
    },
}));

function User() {
    const params = useParams();
    const id = params.id;
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.get(`/api/user/${id}/info`).then((res) => {
            setUser(res.data);
        });
    }, []);

    const [selectedTab, setSelectedTab] = useState(0);
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

    function handleTabChange(event, value) {
        setSelectedTab(value);
    }




    return (
        <Root
            header={
                <div className='flex flex-col'>
                    <div
                        className='flex flex-col flex-0 lg:flex-row items-center max-w-5xl w-full mx-auto px-32 lg:h-72'>

                        <div className='flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32'>
                            <Typography className='text-lg font-bold leading-none'>{user?.first_name} {user?.last_name}</Typography>
                            <Typography color='text.secondary'>{user?.referral_code}</Typography>
                        </div>

                        <div className='hidden lg:flex h-32 mx-32 border-l-2' />


                        <div className='flex flex-1 justify-end my-16 lg:my-0'>
                            <Tabs
                                value={selectedTab}
                                onChange={handleTabChange}
                                indicatorColor='primary'
                                textColor='inherit'
                                variant='scrollable'
                                scrollButtons={false}
                                className='-mx-4 min-h-40'
                                classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
                                TabIndicatorProps={{
                                    children: (
                                        <Box
                                            sx={{ bgcolor: 'text.disabled' }}
                                            className='w-full h-full rounded-full opacity-20'
                                        />
                                    ),
                                }}
                            >

                                <Tab
                                    className='text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 '
                                    disableRipple
                                    label='About'
                                />
                                <Tab
                                    className='text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 '
                                    disableRipple
                                    label='Nft'
                                />
                                <Tab
                                    className='text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 '
                                    disableRipple
                                    label='Parent'
                                />
                                <Tab
                                    className='text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 '
                                    disableRipple
                                    label='Children'
                                />
                                <Tab
                                    className='text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 '
                                    disableRipple
                                    label='Contracts'
                                />
                                <Tab
                                    className='text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 '
                                    disableRipple
                                    label='Award'
                                />
                                <Tab
                                    className='text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 '
                                    disableRipple
                                    label='BuyNft & PayUp'
                                />
                            </Tabs>
                        </div>
                    </div>
                </div>
            }
            content={
                <div className='flex flex-auto justify-center w-full max-w-5xl mx-auto p-8'>
                    {selectedTab === 0 && <UserInfo userId={id} />}
                    {selectedTab === 1 && <NftInfo userId={id} />}
                    {selectedTab === 2 && <ParentInfo userId={id} />}
                    {selectedTab === 3 && <ChildrenInfo userId={id} />}
                    {selectedTab === 4 && <ContractsInfo userId={id} />}
                    {selectedTab === 5 && <RewardInfo userId={id} />}
                    {selectedTab === 6 && <DepositLogs userId={id} />}
                </div>
            }
            scroll={isMobile ? 'normal' : 'page'}
        />
    );
}

export default User;
