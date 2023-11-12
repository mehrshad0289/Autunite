import React, {useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import GlobalConstants from 'app/global/GlobalConstants';
import {useTranslation} from 'react-i18next';
import CustomGrid, {IGridColumn, IToolbarItem, PageSize} from "../../../../../shared-components/CustomGrid";
import {
    faArrowRotateRight,
    faCopy,
    faEdit,
    faEye,
    faHome,
    faPenToSquare,
    faPlus, faSave,
    faTrash, faUsers, faXmark
} from '@fortawesome/free-solid-svg-icons';
import {makeStyles} from '@mui/styles';
import CustomBreadcrumbs from "../../../../../shared-components/CustomBreadcrumbs";
import {Button, IconButton, TextField, Typography} from "@mui/material";
import { Link } from 'react-router-dom'
import clsx from "clsx";
import CustomPage from "../../../../../shared-components/CustomPage";
import CustomFontAwesomeIcon from "../../../../../shared-components/CustomFontAwesomeIcon";
import CustomEditDialog from "../../../../../shared-components/CustomEditDialog";
import CustomDynamicForm from "../../../../../shared-components/CustomDynamicForm";
import {IDynamicFieldConfig} from "../../../../../shared-components/CustomDynamicField";
import UsersService from "../services/UsersService";

const useStyles = makeStyles((theme: any) => ({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.background.default,
        boxShadow: theme.shadows[2],
    },
    content: {
        width: '100%',
        height: '100%',
    }
}))

function Users(props: any) {
    const classes = useStyles();
    const {t} = useTranslation(GlobalConstants.Plugins.Users.Name);
    const [users, setusers] = useState([]);
    const [dialogState, setDialogState] = useState({
        title:"",
        content:<></>,
        actions :<></>,
        open:false,
        onClose :()=>{
            dialogOnClose()
        }
    });

    const [selectedUsers, setSelectedUsers] = useState([])


    useEffect(() => {
        loadUsers();
    }, []);


    const columns: Array<IGridColumn> = [
        {field: 'username', title: t('userName').toString(), width: 200, show: true},
        {field: 'email', title: t('email').toString(), width: 200, show: true},
        {field: 'firstName', title: t('firstName').toString(), width: 200, show: true},
        {field: 'lastName', title: t('lastName').toString(), width: 200, show: true},
        {
            isOperationCol:true,
            title: t('operation').toString(),
            width: 200, 
            show: true,
            getOperations:(props ,col:IGridColumn)=>{
                return (<>
                <Link to={`/ums/users/${props.dataItem.id}`}>
                     <IconButton> <CustomFontAwesomeIcon icon={faEye} color="green"/> </IconButton>
                </Link>
                </>)
            }
            
        },
    ];

    const toolbarItems: Array<IToolbarItem> = [
        {
            title: `${t('add')}`,
            icon: faPlus,
            iconColor: 'green',
            onClick: () => {
                onAddClick()
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

    const breadcrumbs = [
        {
            icon: <CustomFontAwesomeIcon icon={faHome}/>,
            label: t("home").toString()
        },
        {
            icon: <CustomFontAwesomeIcon icon={faUsers}/>,
            label: t("users").toString()
        }
    ]


    const fields :Array<IDynamicFieldConfig>=[
        {
            id: 'username',
            type: 'input',
            placeholder: t("enterUserName").toString(),
            config: {
                dataType: 'text',
                placeholder: t("enterUserName").toString()
            },
            value: '',
            validation: {
                required: true,
                maxLength : undefined,
                minLength:undefined
            },
            valid: false,
            errorMessage: t("enterValidData").toString(),
            touched: false,
            label :t("userName").toString(),
            options :undefined
        },
        {
            id: 'email',
            type: 'input',
            placeholder: t("enterEmail").toString(),
            config: {
                dataType: 'text',
                placeholder: t("enterEmail").toString()
            },
            value: '',
            validation: {
                required: true,
                maxLength : undefined,
                minLength:undefined
            },
            valid: false,
            errorMessage: t("enterValidData").toString(),
            touched: false,
            label :t("email").toString(),
            options :undefined
        },
        {
            id: 'firstName',
            type: 'input',
            placeholder: t("enterFirstName").toString(),
            config: {
                dataType: 'text',
                placeholder: t("enterFirstName").toString()
            },
            value: '',
            validation: {
                required: true,
                maxLength : undefined,
                minLength:undefined
            },
            valid: false,
            errorMessage: t("enterValidData").toString(),
            touched: false,
            label :t("firstName").toString(),
            options :undefined
        },
        {
            id: 'lastName',
            type: 'input',
            placeholder: t("enterLastName").toString(),
            config: {
                dataType: 'text',
                placeholder: t("enterLastName").toString()
            },
            value: '',
            validation: {
                required: true,
                maxLength : undefined,
                minLength:undefined
            },
            valid: false,
            errorMessage: t("enterValidData").toString(),
            touched: false,
            label :t("lastName").toString(),
            options :undefined
        },
    ]

    const onAddClick = () => {
        setDialogState({...dialogState,
            content:<>
                <CustomDynamicForm onSubmit={(response :Array<IDynamicFieldConfig>)=>{
                    let res ={}
                    response.map(x=>{
                        res[x.id] =x.value;
                    })
                    saveNewUser(res)
                }} fields={fields}/>
            </>,
            actions :null,
            title:t("addUser").toString(),
            open:true
        })
    }

    const saveNewUser =(data)=>{
        UsersService.addNewUser(data).then(()=>{
            dialogOnClose();
            loadUsers();
        })
    }

    const dialogOnClose =()=>{
        setDialogState({...dialogState,open:false})
    }
    const loadUsers = () => {
        axios.get(GlobalConstants.Plugins.Users.Urls.UsersList)
            .then((response) => {
                setusers((response.data));
            });
    };

    const getGridSelected = (items) => {
        setSelectedUsers(items)
    }


    const getGridHtml = (users, columns, toolbarItems) => {
        return (
            <CustomGrid
                hasCheckboxColumn={true}
                getSelectedItems={getGridSelected}
                dataItemKey='id'
                data={users}
                columns={columns}
                toolbarItems={toolbarItems}
                pageSize={PageSize.small}/>
        )
    }
    const getDialogHtml =(state)=>{
        return (
            <CustomEditDialog
                onClose={state.onClose}
                open={state.open}
                title={state.title}
                content={state.content}
                actions={state.actions}
            />
        )
    }
    const gridHtml = useMemo(() => getGridHtml(users, columns, toolbarItems), [users, columns, toolbarItems])
    const dialogHtml =useMemo(()=>getDialogHtml(dialogState),[dialogState]);
    return (
        <>
            <CustomPage
                breadcrumbs={breadcrumbs}
                title={t("users")}
                content={gridHtml}
            />
            {dialogHtml}
        </>
    );

}

export default Users;


