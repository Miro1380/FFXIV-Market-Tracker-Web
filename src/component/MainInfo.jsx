import GraphCard from "./GraphCard";
import SelectedInfoCard from "./SelectedInfoCard";
import Container from "@mui/material/Container";
import StatCardRow from "./StatCardRow";
import SnapshotTable from "./SnapshotTable";

function MainInfo({item,snapshots, onRefresh}){
    
    if(!item || !snapshots || snapshots.length === 0) return null;
    

    return(


        <Container>
            <SelectedInfoCard item={item} onRefresh={onRefresh}/>
            <StatCardRow snapshots={snapshots}/>
            <GraphCard snapshots={snapshots}/>
            <SnapshotTable snapshots={snapshots}></SnapshotTable>

        </Container>
    )
}

export default MainInfo;