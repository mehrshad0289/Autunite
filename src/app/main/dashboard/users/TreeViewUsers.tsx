import {Button, CircularProgress, IconButton, Paper, Typography} from '@mui/material';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {makeStyles, useTheme} from '@mui/styles';
import {
    faEye,
    faL,
    faMinusCircle,
    faPlusCircle,
    faR,
    faTimesCircle,
    faUserCircle,
    faWallet,
} from '@fortawesome/free-solid-svg-icons';

import {
    ItemRenderProps,
    processTreeViewItems,
    TreeView,
    TreeViewExpandChangeEvent,
    TreeViewItemClickEvent,
} from '@progress/kendo-react-treeview';
import {useDispatch} from 'react-redux';
import CustomTooltip from '../../../shared-components/CustomTooltip';
import CustomFontAwesomeIcon from '../../../shared-components/CustomFontAwesomeIcon';
import jwtServiceConfig from '../../../auth/services/jwtService/jwtServiceConfig';
import axios from 'axios';
import HomeBackground from '../../../shared-components/HomeBackground';
import CustomTitle from '../../../shared-components/CustomTitle';
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import {LoadingButton} from "@mui/lab";
import {AnimatedTree} from 'react-tree-graph';

import 'react-tree-graph/dist/style.css'
import CustomWaiting from "../../../shared-components/CustomWaiting";
import {addEdge, applyEdgeChanges, applyNodeChanges, Handle, MarkerType, Position, ReactFlow} from "reactflow";
import elkLayout from './reactflow/graph';
import {initialEdges, initialNodes} from "./reactflow/initialNodes";
import 'reactflow/dist/style.css';

const useTreeItemStyles = makeStyles((theme: any) => ({
    root: {
        color: theme.palette.text.secondary,
        '&:hover > $content': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:focus > $content, &$selected > $content': {
            //backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
            color: 'var(--tree-view-color)',
        },
        '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
            backgroundColor: 'transparent',
        },
    },
    content: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: 'normal',
        '$expanded > &': {
            fontWeight: 'bold',
        },
    },
    group: {
        marginLeft: 0,
        '& $content': {
            paddingLeft: theme.spacing(2),
        },
    },
    expanded: {},
    selected: {},
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(1),
    },
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
    },
}));

export interface IWallet {
    Id: number,
    Name: string,
    Slug: string,
    Description: string,
    Balance: number,

}

export interface IUser {
    ParentUserId: number | undefined | null
    LastName: string,
    FirstName: string,
    ReferralCode: string,
    Id: number,
    Expanded: boolean
    Items: Array<IUser> | null
    HasChildren: boolean
    IsLoaded: boolean,
    Side: string,
    Wallet: IWallet
}

function MinusSquare(props) {
    return (
        <CustomFontAwesomeIcon style={{width: 14, height: 14}} color={'red'} {...props}
                               icon={faMinusCircle}/>
    );
}

function PlusSquare(props) {
    return (
        <CustomFontAwesomeIcon style={{width: 14, height: 14}} color={'green'} {...props}
                               icon={faPlusCircle}/>
    );
}

function CloseSquare(props) {
    return (
        <CustomFontAwesomeIcon style={{width: 14, height: 14}} color={'red'} {...props}
                               icon={faTimesCircle}/>
    );
}


const CircleNode = ({ data, id,loadChildren}) => {
    console.log(data)

    return (
        <div className="circleNode" style={{backgroundColor:"transparent",borderRadius:"7px",boxShadow:" 10px 5px 5px #686060;",height:"300px",border:"solid 1px #686060",width:"300px"}}>
            <table>
                <tr>
                    <td>UserId:</td>
                    <td>{data.user.Id}</td>
                </tr>
                <tr>
                    <td>FirstName:</td>
                    <td>{data.user.FirstName}</td>
                </tr>
                <tr>
                    <td>FirstName:</td>
                    <td>{data.user.FirstName}</td>
                </tr>
                <tr>
                    <td>Wallet Balance:</td>
                    <td>{data.user.Wallet.Balance}&</td>
                </tr>
            </table>
            <Handle type="target" position={Position.Top} id={`${id}.top`} />
            <Handle type="source" position={Position.Bottom} id={`${id}.bottom`} />

            {data.user.HasChildren ? <Button onClick={async ()=>{
                await loadChildren(data.user.Id)
            }}>Load Children</Button> : <></>}
        </div>
    );
};


const TreeViewUsers = (props) => {
    const [loading, setLoading] = useState(false);
    const treeItemClasses = useTreeItemStyles();
    const dispatch = useDispatch();
    const theme: any = useTheme();
    const isRtl = theme.direction === 'rtl';


    const [users, setUsers] = useState<Array<IUser>>([]);
    const [flatUsers, setFlatUsers] = useState<Array<IUser>>([]);
    useEffect(() => {
        getTreeNodes(null).then((newUsers: Array<IUser>) => {
            setUsers(newUsers);
        });
    }, [isRtl]);

    const [check, setCheck] = useState<any>([]);
    const [expand, setExpand] = useState<{ ids: Array<any>, idField: string }>({
        ids: [],
        idField: 'Id',
    });
    const [select, setSelect] = useState(['']);

    const getUserData = (data: Array<any>): Array<IUser> => {
        return data.map(userData => {
            let user: IUser = {
                HasChildren: userData.children?.length > 0,
                Expanded: false,
                ParentUserId: userData.parent_user_id,
                LastName: userData.last_name,
                FirstName: userData.first_name,
                ReferralCode: userData.referral_code,
                Id: userData.id,
                Items: [],
                IsLoaded: false,
                Side: userData.side,
                Wallet: {
                    Id: userData.wallet.id,
                    Name: userData.wallet.name,
                    Slug: userData.wallet.slug,
                    Description: userData.wallet.description,
                    Balance: userData.wallet.balance,
                }
            };
            return user;
        });
    };

    const getTreeNodes = (parentId) => {

        return new Promise((resolve, reject) => {
            setLoading(true)
            axios.post(jwtServiceConfig.getUsersTreeNodes, {
                parentId: parentId,
            }).then((response) => {
                let childrens =getUserData(response.data.data)
                generateReactFlowData(childrens)

                resolve(childrens);
            }).finally(()=>{
                setLoading(false)
            });
        });
    };



    const onExpandChange = (user: IUser) => {
        console.log(user);
        let ids: Array<number> = expand.ids.slice();
        const index = ids.indexOf(user.Id);
        index === -1 ? ids.push(user.Id) : ids.splice(index, 1);
        setExpand({ids: ids, idField: 'Id'});

        if (!user.IsLoaded) {
            getTreeNodes(user.Id).then((newItems: Array<IUser>) => {
                let newUsers = [...users];
                const setItems = (newItem: IUser) => {
                    if (newItem.Id === user.Id) {
                        newItem.Items = newItems;
                        newItem.Expanded = !newItem.Expanded;
                        newItem.IsLoaded = true;
                        newItem.HasChildren = newItems.length > 0;
                    } else {
                        newItem.Items?.map(x => {
                            x = setItems(x);
                        });
                    }
                    return newItem;
                };
                newUsers.map(newUser => {
                    newUser = setItems(newUser);
                    /*newUser.Items?.map(newItem => {
                      newItem = setItems(newItem);
                    });*/
                });
                console.log('not loaded', newUsers);
                setUsers(newUsers);
            });
        } else {
            let newUsers = [...users];
            const setItems = (newItem: IUser) => {
                if (newItem.Id === user.Id) {
                    newItem.Expanded = !newItem.Expanded;
                } else {
                    newItem.Items?.map(x => {
                        x = setItems(x);
                    });
                }
                return newItem;
            };
            newUsers.map(newUser => {
                newUser = setItems(newUser);
                /*newUser.Items?.map(newItem => {
                  newItem = setItems(newItem);
                });*/
            });
            console.log('loaded', newUsers);
            setUsers(newUsers);
        }

    };


    const generateTreeNodes = (item: IUser) => {
        let icons = <>
            <CustomTooltip title={'Show User'}
                           placement='bottom'>
                <IconButton onClick={() => {
                }}>
                    <CustomFontAwesomeIcon color={'green'} icon={faEye}/>
                </IconButton>
            </CustomTooltip>
        </>;

        const getSideIcon = () => {
            if (item.Side === 'left')
                return (<CustomFontAwesomeIcon className={isRtl ? 'ml-10' : 'mr-10'} color={'#00a6ff'}
                                               icon={faL}/>);
            if (item.Side === 'right')
                return (<CustomFontAwesomeIcon className={isRtl ? 'ml-10' : 'mr-10'} color={'#00a6ff'}
                                               icon={faR}/>);
            return <></>;
        };


        const getUserBalance = () => {
            return (
                <span className="bg-gray rounded">
          <CustomFontAwesomeIcon className={isRtl ? 'ml-10' : 'mr-10'} color={'rgb(172, 248, 8)'}
                                 icon={faWallet}/>
                    {item.Wallet.Balance} $
        </span>
            )
        }

        return (
            <div
                key={item.Id}
                className={treeItemClasses.labelRoot}
            >

                <CustomFontAwesomeIcon className={isRtl ? 'ml-10' : 'mr-10'} color={'#00a6ff'}
                                       icon={faUserCircle}/>
                {getSideIcon()}

                <Typography variant='body2'
                            className={treeItemClasses.labelText}>
                    {item.ReferralCode}({item.FirstName} {item.LastName})
                </Typography>
                {getUserBalance()}
                {icons}


            </div>
        );
    };
    const userIdRef = useRef(null)
    const [state, setState] = useState({
        searchLoading: false,
        parentUsers: []
    })
    const doSearch = () => {
        setLoading(true)
        setState({
            ...state,
            searchLoading: true
        })

        axios.post(jwtServiceConfig.getParentsOfUser, {
            userId: userIdRef.current.value,
        }).then((response) => {
            let parentUsers = getUserData(response.data.data);
            setState({
                ...state,
                parentUsers: parentUsers,
                searchLoading: false
            })
        }).finally(() => {
            setState({
                ...state,
                searchLoading: false
            })
            setLoading(false)
        });


    }



    const nodeTypes = useMemo(() => ({ circleNode: (props) => <CircleNode loadChildren={getTreeNodes} {...props} /> }), [
        flatUsers
    ]);
    const generateReactFlowData =(newUsers)=>{
        console.log(flatUsers)
        let newFlatUsers =[...flatUsers,...newUsers];
        console.log(newFlatUsers)
        setFlatUsers(newFlatUsers)
        let userNodes =newFlatUsers.map(user=>{
            return {
                id :user.Id.toString(),
                type: "circleNode",
                data: {
                    user
                },

            }
        })
        let userEdges =newFlatUsers.filter(x=>x.ParentUserId !==null).map(user=>{
            return {
                id: `e${user.ParentUserId}-${user.Id}`,
                target: user.Id.toString(),
                source : user.ParentUserId.toString(),
                label:user.Side,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 20,
                    height: 20,
                    color: '#FF0072',
                },
                style: {
                    strokeWidth: 2,
                    stroke: '#FF0072',
                },
            }
        })
        elkLayout(userNodes,userEdges).then((graph) => {
            setNodes(nodesForFlow(userNodes,graph));
            setEdges(edgesForFlow(graph));
        });
    }
    const [nodes, setNodes] = useState(null);
    const [edges, setEdges] = useState(null);
    const nodesForFlow = (nodes,graph) => {
        return [
            ...graph.children.map((node) => {
                return {
                    ...nodes.find((n) => n.id === node.id),
                    position: { x: node.x, y: node.y }
                };
            })
        ];
    };
    const edgesForFlow = (graph) => {
        return graph.edges;
    };


    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

console.log(users)
    return (<>
        <CustomWaiting open={loading} message={"please Wait!"}/>
        <HomeBackground img={4}/>
        <div className='flex flex-col items-center p-24 sm:p-40 container'>
            <div className='flex flex-col w-full max-w-4xl'>


                <Paper className=' mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl' style={{minHeight:"500px"}}>
                    {nodes !==null ? <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        fitView />:
                        <></>}
                </Paper>




                <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                    <CustomTitle>
                        Search User Parents
                    </CustomTitle>
                    <FormControl fullWidth>
                        <InputLabel htmlFor='outlined-adornment-amount'>User ID</InputLabel>
                        <OutlinedInput
                            name='userId'
                            inputRef={userIdRef}
                            id='user-id'
                            startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                            label='User ID'
                        />
                    </FormControl>
                    <LoadingButton
                        className={'rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-10'}
                        loadingIndicator={<CircularProgress color="secondary" size={16}/>}
                        loadingPosition="end"
                        loading={state.searchLoading}
                        variant='contained'
                        color='info'
                        onClick={doSearch}
                        disabled={!state.searchLoading}
                    >
                        <span>Search</span>
                    </LoadingButton>

                    <TreeView
                        item={(props: ItemRenderProps) => {
                            let reportItem: IUser = props.item;
                            return generateTreeNodes(reportItem);
                        }}
                        data={processTreeViewItems(state.parentUsers, {
                            select: select,
                            expand: expand,
                        })}
                        expandIcons={true}
                        onExpandChange={(event: TreeViewExpandChangeEvent) => {

                        }}
                        aria-multiselectable={true}
                        onItemClick={(event: TreeViewItemClickEvent) => {

                        }}
                        hasChildrenField={'HasChildren'}
                        childrenField={'Items'}
                        expandField={'Expanded'}
                        textField={'FName'}
                    />
                </Paper>
                <Paper className='mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl'>
                    <CustomTitle>
                        Tree Users
                    </CustomTitle>

                    <TreeView
                        item={(props: ItemRenderProps) => {
                            let reportItem: IUser = props.item;
                            return generateTreeNodes(reportItem);
                        }}
                        data={processTreeViewItems(users, {
                            select: select,
                            expand: expand,
                        })}
                        expandIcons={true}
                        onExpandChange={(event: TreeViewExpandChangeEvent) => {
                            onExpandChange(event.item);
                        }}
                        aria-multiselectable={true}
                        onItemClick={(event: TreeViewItemClickEvent) => {
                            let item: IUser = event.item;
                            onExpandChange(item);
                        }}
                        hasChildrenField={'HasChildren'}
                        childrenField={'Items'}
                        expandField={'Expanded'}
                        textField={'FName'}
                    />
                </Paper>
            </div>
        </div>
    </>);
};

export default TreeViewUsers;
