import GraphCard from "./GraphCard";
import SelectedInfoCard from "./SelectedInfoCard";
import StatCardRow from "./StatCardRow";
import SnapshotTable from "./SnapshotTable";
import Stack from "@mui/material/Stack";

function MainInfo({item,snapshots, onRefresh, onAlertCreated}){
    
    if(!item || !snapshots || snapshots.length === 0) return null;
    

    return(


        <Stack sx={{display:"flex", flex:1, m:2}}>
            <SelectedInfoCard item={item} onRefresh={onRefresh} onAlertCreated={onAlertCreated}/>
            <StatCardRow snapshots={snapshots}/>
            <GraphCard snapshots={snapshots}/>
            <SnapshotTable snapshots={snapshots}></SnapshotTable>

        </Stack>
    )
}

export default MainInfo;