import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import HomeBackground from '../../../shared-components/HomeBackground';
import CustomTitle from '../../../shared-components/CustomTitle';

const defaultValues = {
    accecptYears: false,
    acceptRecommenderAgreement: false,
    acceptPrivacyPolicy: false,
    shareDataWithUpline: false,
};
const schema = yup.object().shape({});

function Promoter() {
    const { control, handleSubmit, watch, formState } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });
    const { isValid, dirtyFields, errors } = formState;
    const form = watch();

    function onSubmit(data) {

    }

    if (_.isEmpty(form)) {
        return null;
    }

    return (
        <>
            <HomeBackground img={2} />
            <div className='flex flex-col items-center p-24 sm:p-40 container'>
                <div className='flex flex-col w-full max-w-4xl'>



                    <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                        <CustomTitle>
                            Promoter
                        </CustomTitle>
                        <form onSubmit={handleSubmit(onSubmit)} className='px-0 sm:px-24'>
                            <div className='mb-24'>
                                <Typography className='text-2xl font-bold tracking-tight'>
                                    Upgrade your account to build your downline
                                </Typography>
                            </div>
                            <div className='space-y-32'>
                                <div className='flex w-full'>
                                    <Controller
                                        name='accecptYears'
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl className='items-center' error={!!errors.accecptYears}>
                                                <FormControlLabel
                                                    label='I am 18 years or older and an enterpreneur'
                                                    control={<Checkbox size='small' {...field} />}
                                                />
                                                <FormHelperText>{errors?.accecptYears?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </div>
                                <div className='flex w-full'>
                                    <Controller
                                        name='acceptRecommenderAgreement'
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl className='items-center'
                                                         error={!!errors.acceptRecommenderAgreement}>
                                                <FormControlLabel
                                                    label='I agree to the recommender agreement'
                                                    control={<Checkbox size='small' {...field} />}
                                                />
                                                <FormHelperText>{errors?.acceptRecommenderAgreement?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </div>
                                <div className='flex w-full'>
                                    <Controller
                                        name='acceptPrivacyPolicy'
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl className='items-center' error={!!errors.acceptPrivacyPolicy}>
                                                <FormControlLabel
                                                    label='I agree to privacy policy'
                                                    control={<Checkbox size='small' {...field} />}
                                                />
                                                <FormHelperText>{errors?.acceptPrivacyPolicy?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </div>
                                <div className='flex w-full'>
                                    <Controller
                                        name='shareDataWithUpline'
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl className='items-center' error={!!errors.shareDataWithUpline}>
                                                <FormControlLabel
                                                    label='share data with upline'
                                                    control={<Checkbox size='small' {...field} />}
                                                />
                                                <FormHelperText>{errors?.shareDataWithUpline?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </div>
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
                                Upgrade
                            </Button>
                        </div>
                    </Paper>
                </div>
            </div>
        </>
    );
}

export default Promoter;
