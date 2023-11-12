import { makeStyles } from '@mui/styles';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  title: {
    textShadow: '2px 2px 2px rgba(0,0,0,0.1)',
    marginBottom: 10
  },
}));

const CustomTitle = (props)=>{
  const classes = useStyles();
  return (
    <div className={clsx('mt-8 text-2xl font-extrabold tracking-tight leading-tight', classes.title)} >
      {props.children}
    </div>
  )
}


export default CustomTitle;
