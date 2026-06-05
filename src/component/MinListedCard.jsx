import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function MinListedCard({snapshots}) {
    console.log("MINLISTEDCARD snapshots: ",snapshots);
    console.log("ZERO ELEM:", snapshots[0]);

    if(!snapshots || snapshots.length === 0) return null;

    return(
        <Card>
            <CardContent>
                <Typography variant="caption" color="text.secondary" gutterBottom>
                    Minimum Listed Price
                </Typography>
                <Typography variant="h5" color="primary">
                    {snapshots[0].minPrice?.toLocaleString()} g
                </Typography>
            </CardContent>
        </Card>
    )
}

export default MinListedCard;