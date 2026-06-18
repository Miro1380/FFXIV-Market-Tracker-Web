import Box from "@mui/material/Box";
import { ChartsDataProvider } from '@mui/x-charts/ChartsDataProvider';
import { ChartsSurface } from '@mui/x-charts/ChartsSurface';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsLegend } from '@mui/x-charts/ChartsLegend';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsAxisHighlight } from '@mui/x-charts/ChartsAxisHighlight';

function NqHqGraph({ snapshots }) {

    if (!snapshots || snapshots.length === 0) return null;

    const sorted = [...snapshots].reverse();


    console.log('series data:', sorted.map(s => Math.round(s.avgPriceNq)));
    console.log('series data:', sorted.map(s => Math.round(s.avgPriceHq)));
    console.log('x data:', sorted.map(s => new Date(s.capturedAt)));
    
    return (
        <Box>
            <ChartsDataProvider
                height={300}
                series={[
                    { type: 'line', data: sorted.map(s => Math.round(s.avgPriceNq)), label: 'NQ Avg', showMark: false, color: '#c8a96e' },
                    { type: 'line', data: sorted.map(s => Math.round(s.avgPriceHq)), label: 'HQ Avg', showMark: false, color: '#7eb8f7' }
                ]}
                xAxis={[{ 
                    data: sorted.map(s => new Date(s.capturedAt)), 
                    scaleType: 'time',
                    tickMinStep: 3600 * 1000 * 6,
                    valueFormatter: (date) => date.toLocaleDateString([], { month: 'short', day: 'numeric' }) 
                        + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }]}
                yAxis={[{ width: 60 }]}
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
    );
}

export default NqHqGraph;