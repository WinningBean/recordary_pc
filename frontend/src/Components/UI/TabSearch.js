import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import GroupIcon from '@material-ui/icons/Group';
import HowToRegIcon from '@material-ui/icons/HowToReg';


export default function TabSearch() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper square>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                <Tab label="Follow" icon={<HowToRegIcon/>}/>
                <Tab label="Group" icon={<GroupIcon/>}/>
            </Tabs>
        </Paper>
    );
}



