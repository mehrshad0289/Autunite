import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
    faArrowRotateRight,
    faCopy,
    faEye,
    faHome,
    faPenToSquare,
    faPlus,
    faTrash, faUsers
} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";
import {makeStyles} from "@mui/styles";
import GlobalConstants from "app/global/GlobalConstants";
import CustomGrid, {IGridColumn, IToolbarItem, PageSize} from "../../../../../shared-components/CustomGrid";
import CustomPage from "../../../../../shared-components/CustomPage";
import CustomFontAwesomeIcon from "../../../../../shared-components/CustomFontAwesomeIcon";

const useStyles = makeStyles((theme: any) => ({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.background.default,
        boxShadow: theme.shadows[2],
    }
}))
function Roles(props: any) {
    const classes = useStyles();
    const { t } = useTranslation(GlobalConstants.Plugins.Roles.Name);
    const [roles,setRoles] =useState([]);
    useEffect(()=>{
        loadRoles();
    },[])
    const loadRoles =()=>{
        axios.get(GlobalConstants.Plugins.Roles.Urls.RolesList)
            .then((response) => {
                setRoles((response.data))
            });
    }

    const columns: Array<IGridColumn> = [
        { field: 'id', title: t('Id').toString(), width: 250,show: true },
        { field: 'name', title: t('Name').toString(), width: 200 ,show: true},
        { field: 'email', title: t('Email').toString(), width: 200,show: true },
        { field: 'description', title: t('Description').toString(), width: 200,show: true },
        { field: 'composite', title: t('Composite').toString(), width: 200,show: true },
    ];

    const toolbarItems: Array<IToolbarItem> = [
        {
            title: `${t('add')}`,
            icon: faPlus,
            iconColor: 'green',
            onClick: () => {
                // onAddClick()
            },
        },
        {
            title: `${t('edit')}`,
            icon: faPenToSquare,
            iconColor: '#1976D2',
            onClick: (item) => {
                //onEditClick(item)
            },
        },
        {
            title: `${t('delete')}`,
            icon: faTrash,
            iconColor: 'red',
            onClick: (item) => {
                //onRemoveClick(item)
            },
        },

    ];


    const breadcrumbs =[
        {
            icon:<CustomFontAwesomeIcon icon={faHome}/>,
            label:t("home").toString()
        },
        {
            icon:<CustomFontAwesomeIcon icon={faUsers}/>,
            label:t("roles").toString()
        }
    ]
    return (
        <CustomPage
            breadcrumbs={breadcrumbs}
            title={t("roles")}
            content={
                <CustomGrid
                    dataItemKey='id'
                    data={roles}
                    columns={columns}
                    toolbarItems={toolbarItems}
                    pageSize={PageSize.small} />
            }

        />
    );


}

export default Roles;

