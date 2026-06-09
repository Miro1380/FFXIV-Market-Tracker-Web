import CardContent from "@mui/material/CardContent";
import DataGraph from "./DataGraph";
import MinMaxGraph from "./MinMaxGraph";
import NqHqGraph from "./NqHqGraph";
import Card from "@mui/material/Card";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import Typography from "@mui/material/Typography";


function GraphCard({ snapshots }) {

    if(!snapshots || snapshots.length === 0) return null;
    
    const [selectedGraph, setSelectedGraph] = useState('avg');

    const handleGraphSelect = (event, newGraph) => {
        if (newGraph !== null) {
            setSelectedGraph(newGraph);
        }
    };

    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h6" sx={{ color: 'text.xivGoldDim', margin: 1 }}> Price History</Typography>

                <ToggleButtonGroup
                    value={selectedGraph}
                    onChange={handleGraphSelect}
                    exclusive
                    size="small"
                >
                    <ToggleButton value="avg">
                        <Typography variant="caption">
                            Avg Price
                        </Typography>
                    </ToggleButton>

                    <ToggleButton value="minmax"> Min / Max</ToggleButton>
                    <ToggleButton value="nqhq">  NQ / HQ </ToggleButton>

                </ToggleButtonGroup>


                {selectedGraph === 'avg' && <DataGraph snapshots={snapshots} />}
                {selectedGraph === 'minmax' && <MinMaxGraph snapshots={snapshots} />}
                {selectedGraph === 'nqhq' && <NqHqGraph snapshots={snapshots} />}
            </CardContent>
        </Card>
    )
}

export default GraphCard;
