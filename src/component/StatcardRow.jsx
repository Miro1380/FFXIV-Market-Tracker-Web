import VolumeSoldCard from "./VolumeSoldCard";
import ListingCard from "./ListingCard";
import MinListedCard from "./MinListedCard";
import AvgPriceCard from "./AvgPriceCard";
import Stack from "@mui/material/Stack";

function StatCardRow({snapshots}){
    return(
        <Stack direction="row" spacing={2}>
        
                <AvgPriceCard snapshots={snapshots}/>
                <MinListedCard snapshots={snapshots}/>
                <VolumeSoldCard snapshots={snapshots}/>
                <ListingCard snapshots={snapshots}/>        
        </Stack>
    )
}

export default StatCardRow;