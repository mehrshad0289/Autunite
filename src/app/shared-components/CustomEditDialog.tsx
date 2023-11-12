import React, {useEffect} from "react";
import { useState } from "react";
import {Dialog, DialogActionsBar} from "@progress/kendo-react-dialogs";
import {Button} from "@mui/material";
import CustomFontAwesomeIcon from "./CustomFontAwesomeIcon";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";

const CustomEditDialog =(props)=>{
    const {t} = useTranslation('global');
    const {open , content,actions,title ,onClose} =props
    const [editDialog, setEditDialog] = useState({
        isOpen: false,
        title: "",
    });

    useEffect(()=>{
        setEditDialog({...editDialog,
            isOpen: open,
            title :title
        });
    },[open,title])

    const editDialogClose = () => {
        onClose(false)
        setEditDialog({...editDialog, isOpen: false});
    }
    return(
        <>
            {editDialog.isOpen ?
                (<Dialog
                    title={editDialog.title}
                    onClose={editDialogClose}
                >
                    {content}
                    {actions && (
                        <DialogActionsBar>
                            <Button variant='contained' color='info' onClick={editDialogClose}
                                    startIcon={<CustomFontAwesomeIcon icon={faXmark}/>}>
                                {`${t('cancel')}`}
                            </Button>
                            {actions}
                        </DialogActionsBar>
                    )}

                </Dialog>) : <></>
            }
        </>
    )
}

export default CustomEditDialog;