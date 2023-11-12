import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from "@mui/styles";
import clsx from "clsx";
import CustomTooltip from "../../shared-components/CustomTooltip";

const styles = makeStyles((theme) => ({
    grid: {
        textShadow: "1px 1px 1px rgba(0,0,0,0.1)",
        fontWeight: "bold"
    },
    contractExpire: {
        height: 60
    },
    contractExpireText: {},
    contractExpireValue: {}
}));

function NftData({code,createdAt, leftCredit, imgUrl, totalDeposit, rightCredit, lastExpireDate}) {
    const classes = styles();
    const imageRef =useRef(null)
    const [state,setState]= useState({
        width:160,
        height:160,
        contentWidth:170,
        contentHeight:170,
        previewImage :imgUrl ? imgUrl :'assets/images/logo/logo.png'
    })

    useEffect(()=>{
       setState({
           ...state,
           previewImage:imgUrl ? imgUrl :'assets/images/logo/logo.png'
       })
    },[imgUrl])

    const imageOnLoad =()=>{
        let imageHeight =imageRef.current.naturalHeight
        let imageWidth =imageRef.current.naturalWidth

        let scale =imageWidth/state.contentWidth
        let newHeight =imageHeight / scale
        setState({
            ...state,
            width: state.contentWidth,
            height:newHeight
        })
        console.log({imageWidth,imageHeight,newHeight,scale})
    }
    return (
        <>
            <div className={clsx("grid grid-cols-5", classes.grid)}>
                <div className="grid">
                    <div className="flex justify-end items-start overflow-hidden break-words" style={{justifyContent:"center"}}>
                        <CustomTooltip title="Nft ID">
                            <span className="text-right">{code ? code : 0}</span>
                            {/*<span className="text-right overflow-hidden" >{code ? <a target="_blank" href={`https://bscscan.com/tx/${code}`}>{code}</a> : 0}</span>*/}
                        </CustomTooltip>
                    </div>
                    <div className="flex justify-end items-end" style={{justifyContent:"center"}}>
                        <CustomTooltip title="Left Credit">
                            <span className="text-right">{leftCredit ? leftCredit : 0}</span>
                        </CustomTooltip>
                    </div>
                </div>
                <div className="col-span-3 text-center">
                    <img className="m-auto"
                         ref={imageRef}
                         onLoad={imageOnLoad}
                         style={{width: state.width, height: state.height}}
                         src={state.previewImage}/>
                </div>
                <div className="grid">
                    <div className="flex justify-start items-start" style={{justifyContent:"center"}}>
                        <CustomTooltip title="Nft Value">
                            <span className="text-right">{totalDeposit ? totalDeposit : 0}</span>
                        </CustomTooltip>
                    </div>
                    <div className="flex justify-start items-end " style={{justifyContent:"center"}}>
                        <CustomTooltip title="Right Credit">
                            <span className="text-right">{rightCredit ? rightCredit : 0}</span>
                        </CustomTooltip>
                    </div>
                </div>
            </div>
            <div className={clsx('flex items-center text-center font-medium justify-center', classes.contractExpire)}>
                {/*<div className="h-1/2 flex items-center content-center" style={{height: "50%"}}>*/}
                {/*    <span className='w-full' style={{fontWeight: "bold"}}>Last Contract Expire:</span>*/}
                {/*</div>*/}
                <CustomTooltip title="Created At">
                    <div className="h-1/2 flex items-center content-center" style={{height: "100%"}}>
                        <span
                            className='w-full'>{createdAt ? new Date(createdAt).toLocaleDateString() : '00/00/0000'}</span>
                    </div>
                </CustomTooltip>
            </div>
        </>

    )
}


export default NftData;
