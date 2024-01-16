import Paper from '@mui/material/Paper';
import CustomTitle from '../../../shared-components/CustomTitle';
import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import CustomFontAwesomeIcon from "../../../shared-components/CustomFontAwesomeIcon";
import {faCheckCircle, faClose} from "@fortawesome/free-solid-svg-icons";
import HomeBackground from "../../../shared-components/HomeBackground";


function Market() {


    return (
        <>
            <HomeBackground img={4}/>
            <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                <CustomTitle>
                    Market
                </CustomTitle>

                <div className='mt-24'>


                    <Typography className='text-lg font-bold tracking-tight' style={{
                        backgroundColor: "#451164",
                        borderRadius: "10px",
                        padding: "17px",
                        color: "white"
                    }}>
                        <CustomFontAwesomeIcon icon={faClose} color={"red"}/> You dont have a nft with completed plan to sell.
                    </Typography>


                </div>

            </Paper>
        </>
    );
}

export default Market;
