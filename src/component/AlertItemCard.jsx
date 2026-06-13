import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete"

function AlertItemCard({ alert, onDeleteAlert }) {

    console.log("Alert: ", alert);

    return (
        <Stack
            spacing={1}
            sx={{ border: "2px solid", borderRadius: '2%', borderColor: "border.xivGoldDim", mb: 1 }}
        >
            <Paper
                variant="outlined"
                elevation={0}
                sx={{ p: 1, alignItems: "center", display: "flex", flexDirection: "column", gap: 0.25, width: "100%" }}
            >
                <Stack direction={"row"} spacing={1}>
                    <Typography
                        variant="h6"
                        color="primary"
                    >
                        {alert.itemName}
                    </Typography>

                    {alert.isHq
                        ? <Chip label="HQ" size="small" sx={{ ml: 1 }} />
                        : <Chip label="NQ" size="small" sx={{ ml: 1 }} />
                    }
                </Stack>
                {alert.alertCondition === "BELOW"
                        ? <Chip variant="outlined" label="Below" size="small" sx={{ borderColor: "#4caf7d", color: '#4caf7d' }} />
                        : <Chip variant="outlined" label="Above" size="small" sx={{ borderColor: "#e05a5a", color: '#e05a5a' }} />
                    }

                {/*target price */}
                <Typography variant="body2" sx={{ color: '#c8a96e' }}>
                    {alert.targetPrice.toLocaleString()}g
                </Typography>
                
                <IconButton size="small" onClick={() => onDeleteAlert(alert.id)} sx={{ color: '#e05a5a' }}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Paper>
        </Stack>
    )
}

export default AlertItemCard;