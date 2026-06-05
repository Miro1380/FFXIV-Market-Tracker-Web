import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

function AvgPriceCard({snapshots}) {
    console.log("AvgPriceCard snapshots: ",);

    if(!snapshots || snapshots.length === 0) return null;
    
    //Index 0 is newest, length-1 is oldest. Calculate trend based on these two snapshots.
    const latest = snapshots?.[0];
    const oldest = snapshots?.[snapshots.length - 1];
    const trend = ((latest.avgPrice - oldest.avgPrice) / oldest.avgPrice) * 100;
    //const time = latest?.capturedAt - oldest?.capturedAt;

    return (
        

        <Card sx={{background: 'background.paper', minWidth: 180}}>
            <CardContent>
                <Typography variant="caption" color="text.secondary" gutterBottom>
                    Average Price
                </Typography>
                <Typography variant ="h5" color="primary">
                    {Math.round(latest.avgPrice).toLocaleString()} g
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5, mt:0.5}}>
                    <Typography variant="body2" sx={{color: trend >=0? 'success.main':'error.main'}}>
                        { trend >=0? <span>&#9650;</span> : <span>&#9660;</span> }  
                        {Math.abs(trend.toFixed(2))}%
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        (vs oldest snapshot)
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default AvgPriceCard;
