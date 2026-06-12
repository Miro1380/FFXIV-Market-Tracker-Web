import { useState } from "react";
import Stack from '@mui/material/Stack';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import AlertItemCard from "./AlertItemCard";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function Header({ alerts, onDeleteAlert }) {

    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <Stack direction="row" spacing={2} sx={{borderBottom: "solid 1px", borderRadius:0.5, borderColor: "border.xivGoldDark" }} >
            <Stack direction="row" sx={{ alignContent: "start", padding: 3, color: "text.xivGold" }} spacing={1}>
                <Stack direction="row">
                    <Avatar src="" />
                </Stack>
            </Stack>
            <Stack sx={{ alignItems: "center", color: "text.xivGoldDim", flex: 1 }} >
                <Typography variant="h5" sx={{ pt: 2 }}>
                    Eorzea Market Watch
                </Typography>
                <Typography variant="caption">
                    Market Board Tracker
                </Typography>
            </Stack>
            <Stack sx={{ alignItems: "center", p: 2}}>
                <Typography variant="caption">
                    Crystal
                </Typography>
                <Button variant="outlined" sx={{ m:0.5}} onClick={() => setDrawerOpen(true)}>
                    Alerts
                </Button>
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}

                >
                    <Box sx={{width:350, p:2, alignContent:"center" }} spacing={1}>
                        {alerts.length === 0? 
                        <Typography variant="caption" sx={{p:3}}>
                            No active alerts
                        </Typography>
                        :alerts.map(alert => {
                            return <AlertItemCard key={alert.id} alert={alert} onDeleteAlert={onDeleteAlert} />
                        })}
                    </Box>

                </Drawer>

            </Stack>

        </Stack>
    )
}

export default Header;

/*
//Old Header Code
        <div className='header'>
            <div className='header-image'>
                img
            </div>
            <div className="header-title">
                <p>Eorzea Market Watch</p>
                <div className="header-sub">
                    <p> Market Board Tracker</p>
                </div>
            </div>
            <div className="header-right">
                Crystal
            </div>
        </div>

*/