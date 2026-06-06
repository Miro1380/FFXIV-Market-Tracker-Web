import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function VolumeSoldCard({ snapshots }) {
    //console.log("VOL 1 snapshots: ",snapshots);
    
    if(!snapshots || snapshots.length === 0) return null;
    //Use zero element in array, i.e. the latest.
    //console.log("VOLUMESOLDCARD snapshot: ", snapshots[0]);
    
    return(
        <Card sx={{ flex: 1, backgroundColor: '#13161e' }}>
            <CardContent>
                <Typography variant="caption" sx={{color:"text.xivGoldDim"}} gutterBottom>
                    Volume Sold
                </Typography>
                <Typography variant="h5" sx={{color:"text.xivGold"}}>
                    {snapshots[0].volumeSold?.toLocaleString()}
                </Typography>
                <Typography variant="caption" color="textSecondary" gutterBottom>
                    Latest snapshot
                </Typography>
            </CardContent>
        </Card>
    )
}

export default VolumeSoldCard;