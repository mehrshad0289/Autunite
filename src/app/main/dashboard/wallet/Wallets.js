import withReducer from 'app/store/withReducer';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'framer-motion';
import reducer from './store';
import { getWallets, selectWallets } from './store/walletsSlice';
import WalletsHeader from './WalletsHeader';
import PreviousStatementWidget from './widgets/PreviousStatementWidget';
import HomeBackground from "../../../shared-components/HomeBackground";

function Wallets() {
  const dispatch = useDispatch();
  const wallets = useSelector(selectWallets);

  useEffect(() => {
    dispatch(getWallets());
  }, [dispatch]);

  return (
      <>
          <HomeBackground img={8}/>
          <FusePageSimple
              header={
                  <WalletsHeader />}
              content={
                  <div className='w-full px-24 md:px-32 pb-24 opacity-90'>
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
                              !_.isEmpty(wallets) && (
                                  <motion.div className='w-full' variants={container} initial='hidden' animate='show'>
                                      <div className='grid grid-cols-1 xl:grid-cols-2 gap-32 w-full mt-32'>
                                          <div className='grid gap-32 sm:grid-flow-col xl:grid-flow-row'>
                                              {wallets.map((x, i) =>
                                                  <motion.div key={i} variants={item} className='flex flex-col flex-auto'>
                                                      <PreviousStatementWidget {...x} />
                                                  </motion.div>,
                                              )}

                                          </div>
                                      </div>

                                  </motion.div>
                              )
                          );
                      }, [wallets])}
                  </div>
              }
          />
      </>
  );
}

export default withReducer('walletsDashboardApp', reducer)(Wallets);
