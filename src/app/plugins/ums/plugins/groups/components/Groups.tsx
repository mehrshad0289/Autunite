import React, {memo, useEffect, useState} from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import reducer from 'app/store';
// @ts-ignore
import withReducer from 'app/store/withReducer';
import CustomPage from "../../../../../shared-components/CustomPage";
import CustomFontAwesomeIcon from "../../../../../shared-components/CustomFontAwesomeIcon";
import {faHome, faPenToSquare, faPlus, faTrash, faUsers} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";
import GlobalConstants from "../../../../../global/GlobalConstants";
import CustomGrid, {IGridColumn, IToolbarItem, PageSize} from "../../../../../shared-components/CustomGrid";


function Groups(props: any) {
    const { t } = useTranslation(GlobalConstants.Plugins.Groups.Name);
    const [groups,setGroups] =useState([]);
    useEffect(()=>{
        loadUsers();
    },[])
    const loadUsers =()=>{
        axios.get("admin/realms/UMS/groups")
            .then((response) => {
                setGroups((response.data))
            });
    }
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID',minWidth: 150 ,flex: 1 },
        { field: 'name', headerName: 'name',minWidth: 150 ,flex: 1 },
        { field: 'path', headerName: 'description',minWidth: 150 ,flex: 1 },
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
            label:t("groups").toString()
        }
    ]
    return (
        <CustomPage
            breadcrumbs={breadcrumbs}
            title={t("groups")}
            content={
                <CustomGrid
                    dataItemKey='id'
                    data={groups}
                    columns={columns}
                    toolbarItems={toolbarItems}
                    pageSize={PageSize.small} />
            }

        />
    );

}

export default withReducer('chatPanel', reducer)(memo(Groups));


