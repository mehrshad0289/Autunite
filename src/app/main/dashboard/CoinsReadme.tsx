import Typography from "@mui/material/Typography";
import React from "react";

const CoinsReadme =()=>{


    return(
        <>
            <div className="flex mt-16 ">
                <img className="w-32 h-32" src="assets/images/wallet/binance.jpg"/>
                <Typography className='ml-8 text-lg font-bold tracking-tight leading-tight'>
                    Verified smart contract on Binance ( BNB blockchain ) :
                </Typography>
            </div>
            <div className="flex mt-16 ">
                <img className="w-32 h-32" src="assets/images/wallet/bcsscan.png"/>
                <a target="_blank" className=' justify-center ml-8 text-lg font-medium tracking-tight leading-tight'  style={{
                    overflow: "auto",
                    color: "#6A1B9A",
                    border:"none",
                    background: "transparent"
                }}
                   href={"https://bscscan.com/address/0xAA0df662aA9B9afd1276f81967C2765d442E8812#code"}>
                    <p style={{whiteSpace:"inherit",wordBreak:"break-all",overflow:"hidden"}}>
                        https://bscscan.com/address/0xAA0df662aA9B9afd1276f81967C2765d442E8812#code
                    </p>
                </a>
            </div>
            <div className="flex mt-16 ">
                <img className="w-32 h-32" src="assets/images/wallet/bnb.png"/>
                <div className="grid ml-8">
                    <Typography className=' text-lg  tracking-tight leading-tight'>
                        All data is stored in th blockchain (bnb) in the public Binance domain (bsccan.com) and
                        can be verified.
                    </Typography>
                </div>
            </div>
        </>
    )
}

export default CoinsReadme;