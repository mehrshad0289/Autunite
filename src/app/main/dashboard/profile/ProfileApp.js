import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import AboutTab from './tabs/AboutTab';
import useThemeMediaQuery from '../../../../@fuse/hooks/useThemeMediaQuery';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import axios from 'axios';
import HomeBackground from '../../../shared-components/HomeBackground';
import Carousel from 'react-material-ui-carousel';
import NftData from '../NftData';
import Paper from '@mui/material/Paper';
import CustomCopyToClipboard from '../../../shared-components/CustomCopyToClipboard';
import CardContent from '@mui/material/CardContent';

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

function ProfileApp() {
    const user = useSelector(selectUser);
    const [selectedTab, setSelectedTab] = useState(0);
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
    const [nft,setNft] = useState(null)
    function handleTabChange(event, value) {
        setSelectedTab(value);
    }


    useEffect(() => {
        setState({
            ...state,
            leftLink: user.data.leftReferralLink,
            leftCode: user.data.leftReferralCode,
            rightLink: user.data.rightReferralLink,
            rightCode: user.data.rightReferralCode,
        });
    }, [user]);
    useEffect(() => {
        axios.get(
            'api/dashboard-data',
        ).then((res) => {
            let data = res.data.data;
            setState({
                ...state,
                ...data,
            });
        });
    }, []);
    const [state, setState] = useState({
        sliderItems :[],
        userNft: {
            imgUrl: '',
            code: '',
            totalDeposit: 0,
            leftCredit: 0,
            rightCredit: 0,
            createdAt:""
        },
        userContract: {
            lastExpireDate: '',
            nextPriod: undefined,
        },
        myAvailableIncomes: 0,
        totalIncome: 0,
        totalReferralBonus: 0,
        totalROI: 0,
        totalAward: 0,
        bannerText: '',
        numberOfMyGroups: 0,
        leftGroupCredit: 0,
        rightGroupCredit: 0,
        leftLink: '',
        leftCode: '',
        rightLink: '',
        rightCode: '',
        nfts: [],
    });

    useEffect(()=>{
        axios.get(
            'api/nft-list'
        ).then((res)=>{
            if(res.data.data.length>0){
                setNft(res.data.data[0])
            }
        });
    },[])
    return (
        <>
            <HomeBackground img={1}/>
            <div className='flex flex-col items-center p-24 sm:p-40 container opacity-90'>
                <div className='flex flex-col w-full max-w-4xl'>
                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <NftData code={state.userNft.code}
                                 imgUrl={state.userNft.imgUrl}
                                 leftCredit={state.userNft.leftCredit}
                                 rightCredit={state.userNft.rightCredit}
                                 totalDeposit={state.userNft.totalDeposit}
                                 lastExpireDate={state.userContract.lastExpireDate}
                                 createdAt={state.userNft.createdAt}
                        />
                        <CardContent className='px-32 py-24'>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>User ID</Typography>
                                <Typography>{user.data.referralCode}</Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>First Name</Typography>
                                <Typography>{user.data.firstName}</Typography>
                            </div>

                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Last Name</Typography>
                                <Typography>{user.data.lastName}</Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Email</Typography>
                                <Typography>{user.data.email}</Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Left Referral Code</Typography>
                                <Typography>
                                    <CustomCopyToClipboard link={user.data.leftReferralCode} text={user.data.leftReferralCode} />
                                </Typography>
                            </div>

                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Right Referral Code</Typography>
                                <Typography>
                                    <CustomCopyToClipboard link={user.data.rightReferralCode} text={user.data.rightReferralCode} />
                                </Typography>
                            </div>
                            <div className='mb-24 flex'>
                                <Typography className='font-semibold mb-4 text-15'>Left Referral Link</Typography>
                                <CustomCopyToClipboard link={user.data.leftReferralLink} text={""} />
                            </div>
                            <div className='mb-24 flex'>
                                <Typography className='font-semibold mb-4 text-15'>Right Referral Link</Typography>
                                <CustomCopyToClipboard link={user.data.rightReferralLink} text={""} />
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Country</Typography>
                                <Typography>{user.data.country}</Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Created At</Typography>
                                <Typography>{new Date(user.data.createdAt).toLocaleDateString()} {new Date(user.data.createdAt).toLocaleTimeString()}</Typography>
                            </div>
                        </CardContent>
                    </Paper>
                </div>
            </div>



            {/*<Root
            header={
                <div className='flex flex-col'>
                    <img
                        className='h-160 lg:h-320 object-cover w-full'
                        src={nft ?`${axios.defaults.baseURL}/${nft.image_url}` :"assets/images/autunite/1.jpg"}
                        alt='Nft Image'
                    />

                    <div
                        className='flex flex-col flex-0 lg:flex-row items-center max-w-5xl w-full mx-auto px-32 lg:h-72'>
                        <div className='-mt-96 lg:-mt-88 rounded-full'>
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
                                <Avatar
                                    className='w-128 h-128 border-4'
                                    src='assets/images/logo/logo.svg'
                                    alt='User avatar'
                                />
                            </motion.div>
                        </div>

                        <div className='flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32'>
                            <Typography className='text-lg font-bold leading-none'>{user.data.displayName}</Typography>
                            <Typography color='text.secondary'></Typography>
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

                            </Tabs>
                        </div>
                    </div>
                </div>
            }
            content={
                <div className='flex flex-auto justify-center w-full max-w-5xl mx-auto p-24 sm:p-32'>
                    {selectedTab === 0 && <AboutTab />}
                </div>
            }
            scroll={isMobile ? 'normal' : 'page'}
        />*/}
        </>

    );
}

export default ProfileApp;
