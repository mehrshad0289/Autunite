import { faHome, faUsers } from "@fortawesome/free-solid-svg-icons";
import GlobalConstants from "app/global/GlobalConstants";
import CustomFontAwesomeIcon from "../../../../../shared-components/CustomFontAwesomeIcon";
import CustomPage from "../../../../../shared-components/CustomPage";

import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Box, Tabs } from "@mui/material";
import CustomNavTabs from "../../../../../shared-components/CustomNavTabs";

const UserView =()=>{

    const [value, setValue] = React.useState(0);
    const {t} = useTranslation(GlobalConstants.Plugins.Users.Name);
    const { userId } = useParams();

    const breadcrumbs = [
        {
            icon: <CustomFontAwesomeIcon icon={faHome}/>,
            label: t("home").toString()
        },
        {
            icon: <CustomFontAwesomeIcon icon={faUsers}/>,
            label: t("users").toString()
        },
        {
            icon: <CustomFontAwesomeIcon icon={faUsers}/>,
            label: t("users").toString()
        }
    ]

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };
    
    const tabs =[
        {
            href:"/home",
            label:"salam"
        }, {
            href:"/home",
            label:"salam"
        }
    ]
    return (
        <CustomPage
            breadcrumbs={breadcrumbs}
            title={t("users")}
            content={
                <Box sx={{ width: '100%' }}>
                    <CustomNavTabs  
                    initValue={0}
                    tabChange={()=>{}}
                    tabs={tabs}
                    />
              </Box>
            }
        />
       
    
    )
}


export default UserView;