import React from "react";

const HaveNftPage =({nftData})=>{

    return (
        <div className='grid'>
            <div className='text-center' style={{justifyContent: "center", display: "grid"}}>
                <br/>
                <img className='h-auto max-w-full rounded-lg'
                     src={process.env.REACT_APP_BACKEND_URL + "/" + nftData.image_url}
                     alt={'Create Nft'}/>
                <br/>
                <h2>Your Autunite NFT</h2>

            </div>
        </div>
    )
}

export default  HaveNftPage;