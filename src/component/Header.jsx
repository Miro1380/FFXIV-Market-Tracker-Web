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
        <Stack direction="row" spacing={2} sx={{ flexShrink: 0, px: 2, borderBottom: "solid 1px", borderColor: "border.xivGoldDark" }} >
            <Stack direction="row" sx={{ alignContent: "start", color: "text.xivGold", pt: 1.5 }} spacing={1}>
                <Stack direction="row">
                    <Avatar src="" />
                </Stack>
            </Stack>
            <Stack sx={{ alignItems: "center", color: "text.xivGoldDim", flex: 1 }} >
                <Typography variant="h5" sx={{ mt: 2 }}>
                    Eorzea Market Watch
                </Typography>
                <Typography variant="caption">
                    Market Board Tracker
                </Typography>
            </Stack>
            <Stack sx={{ alignItems: "center" }}>
                <Typography variant="caption" sx={{ p: 0.5 }}>
                    Crystal
                </Typography>
                <Button variant="outlined" sx={{ mb: 1.5 }} onClick={() => setDrawerOpen(true)}>
                    Alerts
                </Button>
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}

                >
                    <Box sx={{ width: 350, p: 2, alignItems: "center" }} spacing={1}>

                        <Typography variant="h3" sx={{display:"flex", flex:1, alignItems:"center", justifyContent:"center", borderBottom:"1px Solid Gray"}} >
                            Alerts
                        </Typography>
                        {alerts.length === 0 ?
                            <Typography variant="caption" sx={{ p: 3 }}>
                                No active alerts
                            </Typography>
                            : alerts.map(alert => {
                                return <AlertItemCard key={alert.id} alert={alert} onDeleteAlert={onDeleteAlert} />
                            })}
                    </Box>

                </Drawer>

            </Stack>

        </Stack>
    )
}

export default Header;
