import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

function AlertItemCard({ alert, onDeleteAlert }) {

    console.log("Alert: ", alert);

    return (
        <Stack direction={"row"} spacing={1} sx={{ p: 1 }}>
            <Typography variant="caption" sx={{ flex: 1 }}>
                {alert.itemName} {"HERE"}
            </Typography>
            <Typography>
                {alert.alertCondition}
            </Typography>
            <Typography>
                {alert.targetPrice}
            </Typography>
            <Typography>
                {alert.isHq && <Chip label="HQ" size="small" />}
            </Typography>
            <Chip
                variant="outlined"
                label="Delete"
                size="small"
                onClick={() => onDeleteAlert(alert.id)} />
        </Stack>
    )
}

export default AlertItemCard;