import VolumeSoldCard from "./statComponent/VolumeSoldCard";
import ListingCard from "./statComponent/ListingCard";
import MinListedCard from "./statComponent/MinListedCard";
import AvgPriceCard from "./statComponent/AvgPriceCard";
import Stack from "@mui/material/Stack";

function StatCardRow({ snapshots }) {
    return (
        <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
            <AvgPriceCard snapshots={snapshots} />
            <MinListedCard snapshots={snapshots} />
            <VolumeSoldCard snapshots={snapshots} />
            <ListingCard snapshots={snapshots} />
        </Stack>
    )
}

export default StatCardRow;