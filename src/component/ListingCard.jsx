import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function ListingCard({snapshots}){
    //console.log("SNAP FROM LISTING COMP:", snapshots);

    if(!snapshots || snapshots.length === 0) return null;

    return(
        <Card sx={{ flex: 1, backgroundColor: '#13161e' }}>
            <CardContent>
                <Typography variant="caption" sx={{color:"text.xivGoldDim"}}>
                    Listings
                </Typography>
                <Typography variant="h5" sx={{color:"text.xivGold"}}>
                    {snapshots[0]?.listingCount.toLocaleString()}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    Active Offers
                </Typography>
            </CardContent>
        </Card>
    )

}

export default ListingCard;