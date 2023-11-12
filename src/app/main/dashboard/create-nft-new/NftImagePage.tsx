import React from "react";
import {useEffect, useRef, useState} from "react";


const NftImagePage =({previewImage,contentWidth,contentHeight})=>{

    const imageRef =useRef(null)
    const [state,setState]= useState({
        width:0,
        height:0,
        contentWidth:contentWidth ? contentWidth :400,
        contentHeight:contentHeight ? contentHeight :250,
        previewImage :previewImage
    })

    useEffect(()=>{
        setState({
            ...state,
            previewImage :previewImage
        })
    },[previewImage])

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

    }

    return (
        <div
            style={{width:state.contentWidth,height:state.height,backgroundColor:"red",alignItems:"center",display:"flex",justifyContent:"center"}}
            className={"rounded-lg p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center"}>
            <img
                ref={imageRef}
                src={state.previewImage}
                onLoad={imageOnLoad}
                style={{width:state.width,height:state.height}}
                className="rounded-lg object-cover"
                alt='a'/>
        </div>
    )
}

export default  NftImagePage;
