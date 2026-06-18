import Box from "@mui/material/Box";
import { ChartsDataProvider } from '@mui/x-charts/ChartsDataProvider';
import { ChartsSurface } from '@mui/x-charts/ChartsSurface';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsLegend } from '@mui/x-charts/ChartsLegend';

import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';

import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsAxisHighlight } from '@mui/x-charts/ChartsAxisHighlight';

function DataGraph({ snapshots }) {

    if (!snapshots || snapshots.length === 0) return null;


    return (
        <Box>
            <ChartsDataProvider
                height={300}
                series={[{ type: 'line', data: snapshots.map(s => Math.round(s.avgPrice)), label: 'Average Price', showMark: false }]}
                xAxis={[{
                    data: snapshots.map(s => new Date(s.capturedAt)),
                    scaleType: 'time',
                    tickMinStep: 3600 * 1000 * 6, // one tick per 6 hours
                    valueFormatter: (date) => date.toLocaleDateString([], { month: 'short', day: 'numeric' })
                        + '\n' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }]}
                yAxis={[{ width: 50 }]}
                margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
            >
                <ChartsLegend />
                <ChartsTooltip />
                <ChartsSurface>
                    <ChartsXAxis />
                    <ChartsYAxis />
                    <LinePlot />
                    <MarkPlot />
                    <ChartsAxisHighlight x="line" />
                </ChartsSurface>
            </ChartsDataProvider>
        </Box>
    )

}

export default DataGraph;