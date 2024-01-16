import CustomTitle from "../../../shared-components/CustomTitle";
import CustomFontAwesomeIcon from "../../../shared-components/CustomFontAwesomeIcon";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {Button, Paper} from "@mui/material";
import {showMessage} from "../../../store/fuse/messageSlice";
import React from "react";
import {useDispatch} from "react-redux";

const Guarantee =()=>{

    const dispatch = useDispatch();
    return (
        <Paper className='mt-24 sm:mt-36 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
            <CustomTitle>
                Guarantee
                <CustomFontAwesomeIcon
                    className="ml-6"
                    color={'green'}
                    icon={faCheckCircle}
                />
            </CustomTitle>
            <div className="flex gap-4 flex-col md:flex-row">
                            <span className={"mt-8 text-xs md:text-lg font-bold tracking-tight leading-tight"}>
                                Be aware that you can sell your NFT to Autunite merket after completing its plan
                            </span>

                <Button
                    variant='contained'
                    style={{
                        backgroundColor:"#aeb2b4",
                        color:"red"
                    }}
                    className="font-extrabold"
                    onClick={() => {
                        dispatch(showMessage({
                            message: "You dont have a NFT with completed plan yet.",
                            variant: 'error',
                        }));
                    }}
                >
                    Sell NFT
                </Button>
            </div>

        </Paper>
    )
}



export default Guarantee;