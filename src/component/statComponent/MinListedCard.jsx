import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function MinListedCard({snapshots}) {
    //console.log("MINLISTEDCARD snapshots: ",snapshots);
    //console.log("ZERO ELEM:", snapshots[0]);

    if(!snapshots || snapshots.length === 0) return null;

    return(
        <Card sx={{ flex: 1, backgroundColor: '#13161e' }}>
            <CardContent>
                <Typography variant="caption" sx={{color:"text.xivGoldDim"}} gutterBottom>
                    Minimum Listed Price
                </Typography>
                <Typography variant="h5" color="primary">
                    {snapshots[0].minPrice?.toLocaleString()} g
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    Lowest listing
                </Typography>
            </CardContent>
        </Card>
    )
}

export default MinListedCard;