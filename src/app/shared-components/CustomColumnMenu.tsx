import {
    GridColumnMenuCheckboxFilter,
    GridColumnMenuFilter,
    GridColumnMenuGroup,
    GridColumnMenuItem,
    GridColumnMenuItemGroup,
    GridColumnMenuSort,
} from "@progress/kendo-react-grid";
import {useTranslation} from 'react-i18next';
import {useEffect, useRef, useState} from "react";
import {Typography} from "@mui/material";
import React from "react";

export const CustomColumnMenu = (props) => {
    const [columns, setColumns] = useState(props.columns);
    const [columnsExpanded, setColumnsExpanded] = useState(false);
    const [filterExpanded, setFilterExpanded] = useState(false);
    const {t} = useTranslation('global');
    const onToggleColumn = (id) => {
        const newColumns = columns.map((column, idx) => {
            return idx === id ? {...column, show: !column.show} : column;
        });
        setColumns(newColumns);
    };

    const onReset = (event) => {
        event.preventDefault();
        const newColumns = props.columns.map((col) => {
            return {...col, show: true};
        });
        setColumns(newColumns);
        props.onColumnsSubmit(newColumns);

        if (props.onCloseMenu) {
            props.onCloseMenu();
        }
    };

    const onSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }

        props.onColumnsSubmit(columns);

        if (props.onCloseMenu) {
            props.onCloseMenu();
        }
    };

    const onMenuItemClick = () => {
        const value = !columnsExpanded;
        setColumnsExpanded(value);
        setFilterExpanded(value ? false : filterExpanded);
    };

    const onFilterExpandChange = (value) => {
        setFilterExpanded(value);
        setColumnsExpanded(value ? false : columnsExpanded);
    };

    const oneVisibleColumn = columns.filter((c) => c.show).length === 1;

    const ref = useRef<any>(null);

    useEffect(() => {
        console.log(ref);
        ref.current?.closest('.k-animation-container').classList.add('grid-filter-popover');
    }, [ref]);

    return (
        <div ref={ref}>
            <GridColumnMenuSort {...props} />
            {
                props.isCheckboxFilter ?
                    <GridColumnMenuCheckboxFilter
                        {...props}
                        data={props.data}
                        searchBox={() => null}
                    /> :
                    <GridColumnMenuFilter
                        {...props}
                        onExpandChange={onFilterExpandChange}
                        expanded={filterExpanded}
                        style={{fontSize: "8px"}}
                    />
            }
            <GridColumnMenuItemGroup>
                <GridColumnMenuItem
                    title={t("columns").toString()}
                    iconClass={"k-i-columns"}
                    onClick={onMenuItemClick}
                />
                <div style={columnsExpanded ? {} : {display: "none"}}>
                    <div className={"k-column-list-wrapper"}>
                        <form onSubmit={onSubmit} onReset={onReset}>
                            <div className={"k-column-list"}>
                                {columns.map((column, idx) => (
                                    <div key={idx} className={"k-column-list-item"}>
                    <span>
                      <input
                          id={`column-visiblity-show-${idx}`}
                          className="k-checkbox k-checkbox-md k-rounded-md"
                          type="checkbox"
                          readOnly={true}
                          disabled={column.show && oneVisibleColumn}
                          checked={column.show}
                          onClick={() => {
                              onToggleColumn(idx);
                          }}
                      />
                      <label
                          htmlFor={`column-visiblity-show-${idx}`}
                          className="k-checkbox-label"
                          style={{
                              userSelect: "none",
                          }}
                      >
                        {column.title}
                      </label>
                    </span>
                                    </div>
                                ))}
                            </div>
                            <div className={"k-actions k-hstack k-justify-content-stretch"}>
                                <button
                                    type={"reset"}
                                    className={
                                        "k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                    }
                                >
                                    <Typography>{`${t("reset")}`}</Typography>
                                </button>
                                <button
                                    className={
                                        "k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                                    }
                                >
                                    <Typography>{`${t("save")}`}</Typography>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </GridColumnMenuItemGroup>
            <GridColumnMenuGroup {...props} />
        </div>
    );
};