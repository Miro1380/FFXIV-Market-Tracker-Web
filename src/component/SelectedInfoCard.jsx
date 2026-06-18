import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import SetAlertModal from "./SetAlertModal";
import { useState } from "react";


function SelectedInfoCard({ item, onRefresh, onAlertCreated }) {
    console.log("SelectedInfoCard item:", item);

    const [alertOpen, setAlertOpen] = useState(false);

    if (!item || item.length === 0) return null;

    return (
        <Stack direction="row" spacing={2} sx={{ mt: 3, mb: 1, width: '100%' }}>
            <Stack direction="row" spacing={2} sx={{ mb: 1, pt: 3, pb: 3 }}>
                <Box sx={{ border: '2px solid #a08040', width:64, height:64, flexShrink:0, overflow:'hidden' }} >
                    <Avatar variant="square" sx={{ width: 64, height: 64 }} src={`https://xivapi.com/${item.iconUrl}`} />
                </Box>
            </Stack>
            <Stack direction="row" spacing={0} sx={{ flex: 1, display:"flex",alignItems: "center", textAlign:"center" }}>
                <Typography variant="h6" sx={{ color: "text.xivGold" }}>
                    <Box sx={{ pl: 2 }}>
                        {item.itemName}
                    </Box>

                    <Typography variant="caption" color="textSecondary" sx={{ display: 'block', p: 0.5 }}>
                        <Box sx={{ alignItems:"center", textAlign:"center"}}>
                            ID {item.itemId} {String.fromCharCode(167)} {item.world}
                        </Box>
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'text.xivGold',
                                display: 'block',
                                border: '1px solid ',
                                borderRadius: '5%',
                                backgroundColor: "background.paper",
                                textAlign: "center",
                                m: 0.5
                            }}>
                            {item.isTracking ? "Tracking" : "Not Tracking"}
                        </Typography>
                    </Typography>
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip label="Refresh" variant="filled" size="small" sx={{ color: '#c8a96e', borderRadius: 0.5, borderColor: '#a08040', p: 1 }} onClick={onRefresh} />
                <Chip label="Set Alert" variant="outlined" size="small" sx={{ color: '#c8a96e', borderRadius: 0.5, borderColor: '#a08040', p: 1 }} onClick={() => setAlertOpen(true)} />
            </Stack>

            <SetAlertModal
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                item={item}
                onAlertCreated={onAlertCreated}
            />
        </Stack>



    )
}

export default SelectedInfoCard;    