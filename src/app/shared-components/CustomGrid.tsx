import {
    getSelectedState,
    Grid,
    GridColumn,
    GridColumnMenuFilter,
    GridColumnMenuSort,
    GridHeaderSelectionChangeEvent,
    GridProps,
    GridSelectionChangeEvent,
    GridToolbar
} from "@progress/kendo-react-grid";
import React, {MouseEventHandler, ReactElement, useCallback, useEffect, useMemo, useRef, useState} from "react";

import {getter, process, State} from "@progress/kendo-data-query";
import {useTheme, makeStyles} from "@mui/styles";
import {Pagination} from "@mui/material";
import {Checkbox, FormControl, IconButton, MenuItem, Select} from "@mui/material";
import {ExcelExport} from "@progress/kendo-react-excel-export";
import CustomFontAwesomeIcon from "./CustomFontAwesomeIcon";
import {faFileExcel} from "@fortawesome/free-solid-svg-icons";
import CustomTooltip from "./CustomTooltip";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import { CustomColumnMenu } from './CustomColumnMenu';

const useStyles = makeStyles(() => ({
    grid: {
        '& th .k-cell-inner': {
            width: '100%',
            margin: '0 !important'
        },
        '& th .k-link': {
            padding: '0 !important'
        },
        '& .k-grid-container':{
            height :"100%"
        },
        '& .k-grid-toolbar':{
          textAlign:"right"
        },
        '& table':{
            width:"100% !important"
        },
        '& tr:nth-child(even)' : {
            background  :"#f6fdff"
        },
        display:"flex",
        flexDirection:"column"
    },
    pager: {
        minHeight: 40,
        borderTop: "1px solid rgba(0, 0, 0, 0.12)"
    },
    pagerNav: {
        width: '86%'
    },
    pagerInfo: {
        position: "absolute",
        left: 10,
    },
    pagerInfoText: {
        fontSize: 12
    },
    pagerSelect: {
        padding: '7px 25px 7px 10px'
    }
}));

export enum GridFilterType {
    text = 'text',
    numeric = 'numeric',
    date = 'date'
}

const PageSizes = [
    ['10', '20', '50', '100'],
    ['20', '50', '100', '300'],
    ['100', '300', '500', '1000']
]

export enum PageSize {
    small = 10,
    medium = 20,
    large = 100
}

export interface IGridColumn {
    field?: string,
    title: string,
    filter?: GridFilterType,
    width?: number,
    show?: boolean,
    isCheckboxFilter?: boolean,
    isOperationCol?: boolean,
    getOperations?:Function,
}

export interface IPagerItem {
    isVisible?: boolean,
    title?: string,
    icon: IconDefinition,
    iconColor?: string,
    onClick?: MouseEventHandler,
}

export interface IToolbarItem {
    title?: string,
    icon: IconDefinition,
    iconColor?: string,
    onClick?: (item: any) => void,
}

const getPageSizes = (pageSize) => {
    let pageSizes = PageSizes[0];
    PageSizes.map(ps => {
        if (parseInt(ps[0]) === pageSize) {
            pageSizes = ps;
        }
    });

    return pageSizes;
}

const isColumnActive = (field: string, dataState: State) => {
    return (
        GridColumnMenuFilter.active(field, dataState.filter) ||
        GridColumnMenuSort.active(field, dataState.sort)
    );
};

interface IGridProps extends GridProps {
    data: any,
    columns: any,
    dataItemKey?: string,
    exportToExcel?: boolean,
    pagerItems?: Array<IPagerItem>,
    toolbarItems?: Array<IToolbarItem>,
    pagerInfo?: ReactElement,
    hasCheckboxColumn?: boolean,
    getSelectedItems?: (items) => void,
    selectedItems?: any,
    onSelectionChange?: (item) => void
}

export const getSelectedItems = (dataItemKey: any, items: any): { [id: string]: boolean | number[] } => {
    let selectedItems = {};
    items.map(item => {
        selectedItems[item[dataItemKey]] = true
    });

    return selectedItems;
}

const CustomGrid = (props: IGridProps) => {
    const theme: any = useTheme();
    const {t} = useTranslation('global');
    const classes = useStyles();
    const {columns, data} = props;
    const DATA_ITEM_KEY: string = props.dataItemKey ? props.dataItemKey : "Id";
    const SELECTED_FIELD: string = "selected";
    const idGetter = getter(DATA_ITEM_KEY);
    const [selectedState, setSelectedState] = useState<{
        [id: string]: boolean | number[];
    }>(props.selectedItems ? props.selectedItems : {});
    const dataWithSelection = data.map((item) => ({
        ...item,
        [SELECTED_FIELD]: selectedState[idGetter(item)],
    }));
    const pageSize = props.pageSize ? props.pageSize : PageSize.large;
    const initialState = {
        take: pageSize,
        skip: 0
    }
    const [columnsState, setColumnsState] = useState(columns);
    const [dataState, setDataState] = useState(initialState);

    const result = process(dataWithSelection, dataState);

    const currentPage = Math.floor(dataState.skip / dataState.take) + 1;
    const totalPages = Math.ceil((result.total || 0) / dataState.take);

    const pageSizes = getPageSizes(pageSize);
    const [pageSizeValue, setPageSizeValue] = useState(pageSizes[0]);

    const pagerItems = props.pagerItems ? props.pagerItems : [];
    const toolbarItems = props.toolbarItems ? props.toolbarItems : [];

    const _grid = useRef<any>();
    const _export = useRef<ExcelExport | null>(null);

    const onColumnsSubmit = (columnsState) => {
        setColumnsState(columnsState);
    }

    const onPageSizeChange = (value) => {
        if (!value) {
            return;
        }

        if (currentPage > totalPages) {
            setDataState({
                ...dataState,
                take: value,
                skip: (totalPages - 1) * value
            })
        } else {
            setDataState({
                ...dataState,
                take: value,
                skip: (currentPage - 1) * value
            })
        }
        setPageSizeValue(value);
    }

    const pageChange = (e, value) => {
        if (!value) {
            return;
        }

        setDataState({
            ...dataState,
            skip: (value - 1) * dataState.take,
            take: dataState.take,
        });
    }

    const onDataStateChange = useCallback(
        (event) => {
            setDataState(event.dataState);
        }, []);

    const onSelectionChange = useCallback(
        (event: GridSelectionChangeEvent) => {
            const newSelectedState = getSelectedState({
                event,
                selectedState: selectedState,
                dataItemKey: DATA_ITEM_KEY,
            });
            props.onSelectionChange ? props.onSelectionChange(getSelectedItems(newSelectedState)) : undefined;
            setSelectedState(newSelectedState);
        },
        [selectedState],
    );

    const onHeaderSelectionChange = useCallback(
        (event: GridHeaderSelectionChangeEvent) => {
            const checkboxElement: any = event.syntheticEvent.target;
            const checked = checkboxElement.checked;
            const newSelectedState = {};

            event.dataItems.forEach((item) => {
                newSelectedState[idGetter(item)] = checked;
            });
            setSelectedState(newSelectedState);
        },
        []
    );

    useEffect(() => {
        props.getSelectedItems ? props.getSelectedItems(getSelectedItems(selectedState)) : undefined;
    }, [selectedState]);

    const getSelectedItems = (selectedState) => {
        let selectedItems: any;
        if (props.selectable?.mode === "multiple") {
            selectedItems = data.filter((item) => (selectedState[idGetter(item)]));
        } else {
            selectedItems = data.find((item) => (selectedState[idGetter(item)]));
        }
        return selectedItems;
    }

    const exportToExcel = () => {
        if (_export.current !== null) {
            _export.current.save(data, _grid.current.columns);
        }
    }

    const pagerInfoHtml = () => {
        const from = (currentPage - 1) * parseInt(pageSizeValue) + 1;
        const to = currentPage < totalPages ? currentPage * parseInt(pageSizeValue) : result.total;
        return (
            <div className={clsx(classes.pagerInfo, "flex items-center justify-center")}>
                <span
                    className={classes.pagerInfoText}>{`${from} - ${to} ${t("of")} ${result.total} ${t("item")}`}</span>
            </div>
        )
    }

    const pagerItemsHtml = () => {
        return (
            pagerItems.map((item, idx) => (
                item.isVisible ? <CustomTooltip key={idx} title={item.title} placement="top">
                    <IconButton onClick={item.onClick}>
                        <CustomFontAwesomeIcon icon={item.icon}
                                               color={item.iconColor ? item.iconColor : ""}/>
                    </IconButton>
                </CustomTooltip> : ""
            ))
        );
    }

    const pagerItemsMemo = useMemo(pagerItemsHtml, [pagerItems]);

    const selectedItems = getSelectedItems(selectedState);


    
    return (
        <div dir={theme.direction} className={`k-${theme.direction} h-full`}>
            <ExcelExport ref={_export} dir={theme.direction}/>
            <Grid
                {...props}
                ref={_grid}
                className={clsx(classes.grid, "h-full text-center")}
                data={result}
                sortable={props.sortable ?? true}
                resizable={props.resizable ?? true}
                pageable={props.pageable ?? true}
                selectable={props.selectable ?? {
                    enabled: true,
                    drag: false,
                    cell: false,
                    mode: 'single',
                }}
                pager={() => (
                    <div className={clsx(classes.pager, "flex items-center")}>
                        <div className={clsx(classes.pagerNav, "flex items-center")}>
                            <Pagination count={totalPages} page={currentPage}
                                        onChange={(event, value) => pageChange(event, value)} color="primary"/>
                            <FormControl size="small">
                                <Select variant="outlined"
                                        value={pageSizeValue}
                                        MenuProps={{
                                            style: {zIndex: 15000}
                                        }}
                                        classes={{select: classes.pagerSelect}}
                                        onChange={(event) => onPageSizeChange(event.target.value)}>
                                    {
                                        pageSizes.map((item, index) => <MenuItem key={index}
                                                                                 value={item}>{item}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                            {
                                props.exportToExcel ? <CustomTooltip title={`${t("exportToExcel")}`} placement="top">
                                    <IconButton onClick={exportToExcel}>
                                        <CustomFontAwesomeIcon icon={faFileExcel} color="green"/>
                                    </IconButton>
                                </CustomTooltip> : ""
                            }
                            {
                                pagerItemsMemo
                            }
                        </div>
                        {
                            props.pagerInfo ? props.pagerInfo : pagerInfoHtml()
                        }
                    </div>
                )}
                dataItemKey={DATA_ITEM_KEY}
                selectedField={SELECTED_FIELD}
                onDataStateChange={onDataStateChange}
                onSelectionChange={onSelectionChange}
                onHeaderSelectionChange={onHeaderSelectionChange}
                {...dataState}
            >
                {
                    toolbarItems.length ? <GridToolbar>
                        {
                            toolbarItems.map((item, idx) => (
                                <CustomTooltip key={idx} title={item.title} placement="top">
                                    <IconButton onClick={() => item.onClick ? item.onClick(selectedItems) : undefined}>
                                        <CustomFontAwesomeIcon icon={item.icon}
                                                               color={item.iconColor ? item.iconColor : ""}/>
                                    </IconButton>
                                </CustomTooltip>
                            ))
                        }
                    </GridToolbar> : ""
                }
                {
                    props.hasCheckboxColumn ? <GridColumn
                        field={SELECTED_FIELD}
                        width={50}
                        headerSelectionValue={
                            result.data.findIndex((item) => !selectedState[idGetter(item)]) === -1
                        }
                        // children={<Checkbox color='primary'/>}
                    /> : ""
                }
                {
                    columnsState.map((column: IGridColumn, idx) =>{
                        let htmlCol =<></>
                        if(column.show){
                            if(column.isOperationCol){
                                htmlCol=<GridColumn
                                    key={idx}
                                    title={column.title}
                                    filter={column.filter}
                                    width={column.width}
                                    cell={(props)=>{
                                        return column.getOperations(props,column)
                                    }}
                                />
                            }else{
                                htmlCol=<GridColumn
                                    key={idx}
                                    field={column.field}
                                    title={column.title}
                                    filter={column.filter}
                                    width={column.width}
                                    columnMenu={(props) => (
                                        <CustomColumnMenu
                                            {...props}
                                            columns={columnsState}
                                            onColumnsSubmit={onColumnsSubmit}
                                            isCheckboxFilter={column.isCheckboxFilter}
                                            data={data}
                                        />
                                    )}
                                    headerClassName={isColumnActive(column.field, dataState) ? "active" : ""}
                                />
                            }
                        }
                        return htmlCol
                    })
                }
            </Grid>
        </div>
    );
}

export default CustomGrid;