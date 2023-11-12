import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../../store/userSlice';
import { showMessage } from '../../../../store/fuse/messageSlice';
import CustomCopyToClipboard from '../../../../shared-components/CustomCopyToClipboard';

function AboutTab() {
    const [data, setData] = useState(null);
    const test = (x) => x + 1;
    const user = useSelector(selectUser);
    useEffect(() => {
        axios.get('/api/profile/about').then((res) => {
            setData(res.data);
        });
    }, []);

    if (!data) {
        return null;
    }

    const { general, work, contact, groups, friends } = data;
    const signUpUrl = 'https://autunite.ai/sign-up';
    const leftRef = `L${user.data.referralCode}`;
    const rightRef = `R${user.data.referralCode}`;
    const rightRefLink = `${signUpUrl}?sponsorId=${rightRef}`;
    const leftRefLink = `${signUpUrl}?sponsorId=${leftRef}`;
    const dispatch = useDispatch();
    const container = {
        show: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    };
    const copyOnSuccess = () => {
        dispatch(showMessage({
            message: 'copied to clipboard',
            variant: 'success',
        }));
    };
    const item = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.div variants={container} initial='hidden' animate='show' className='w-full'>
            <div className='md:flex'>
                <div className='flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32'>
                    <Card component={motion.div} variants={item} className='w-full mb-32'>
                        <div className='px-32 pt-24'>
                            <Typography className='text-2xl font-semibold leading-tight'>
                                General Information
                            </Typography>
                        </div>

                        <CardContent className='px-32 py-24'>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Referral Code</Typography>
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
                                    <CustomCopyToClipboard link={leftRefLink} text={leftRef} />
                                </Typography>
                            </div>
                            <div className='mb-24'>
                                <Typography className='font-semibold mb-4 text-15'>Right Referral Code</Typography>
                                <Typography>
                                    <CustomCopyToClipboard link={rightRefLink} text={rightRef} />
                                </Typography>
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
                    </Card>


                </div>


            </div>
        </motion.div>
    );
}

export default AboutTab;
