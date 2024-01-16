import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";



export interface LinkTabProps {
    label?: string;
    href?: string;
  }
  
function LinkTab(props: LinkTabProps) {
return (
    <Tab
    component="a"
    onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
    }}
    {...props}
    />
);
}
  
export interface INavTabsParam{
    initValue :number,
    tabChange?:Function,
    tabs: Array<LinkTabProps>
}
export default function CustomNavTabs(props :INavTabsParam) {
    const [value, setValue] = useState(props.initValue);
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
      props.tabChange ? props.tabChange(newValue) : null
    };
  
    return (
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
            {props.tabs.map((tab,index)=>{
                return(
                    <LinkTab label={tab.label} href={tab.href} />
                   )
            })}
        </Tabs>
      </Box>
    );
  }