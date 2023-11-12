import withReducer from 'app/store/withReducer';
import { useEffect, useMemo, useState } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'framer-motion';
import reducer from './store';
import WalletsHeader from './WalletsHeader';
import AccountBalanceWidget from './widgets/AccountBalanceWidget';
import RecentTransactionsWidget from './widgets/RecentTransactionsWidget';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HomeBackground from '../../../shared-components/HomeBackground';
import history from '@history'

function Wallet() {
    const { slug } = useParams();


    const [wallet, setWallet] = useState(undefined);
    useEffect(() => {
        axios.get(`/api/wallet/${slug}`).then((res) => {
            setWallet(res.data.data);
        });
    }, []);
    return (
        <>
            <HomeBackground img={6} />
            <FusePageSimple
                header={<WalletsHeader />}
                content={
                    <div className='w-full px-24 md:px-32 pb-24'>
                        {useMemo(() => {
                            const container = {
                                show: {
                                    transition: {
                                        staggerChildren: 0.06,
                                    },
                                },
                            };

                            const item = {
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0 },
                            };

                            return (
                                wallet && (
                                    <motion.div className='w-full' variants={container} initial='hidden' animate='show'>
                                        <div className='grid grid-cols-1 xl:grid-cols-2 gap-32 w-full mt-32'>
                                            <motion.div variants={item} className='flex flex-col flex-auto'>
                                                <AccountBalanceWidget {...wallet} />
                                            </motion.div>
                                        </div>
                                        <div className='grid grid-cols-1 xl:grid-cols-3 gap-32 w-full mt-32'>
                                            <motion.div variants={item} className='xl:col-span-2 flex flex-col flex-auto'>
                                                <RecentTransactionsWidget {...wallet} />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ));
                        }, [wallet])}
                    </div>
                }
            />
        </>
    );
}

export default withReducer('walletsDashboardApp', reducer)(Wallet);
