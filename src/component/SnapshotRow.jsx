import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";


function SnapshotRow({ snapshot }) {

    console.log('rendering SnapshotRow with snapshot:', snapshot);
    return(
        <TableRow>
            <TableCell> {new Date(snapshot.capturedAt).toLocaleString()} </TableCell>
            <TableCell> {Math.round(snapshot.avgPrice).toLocaleString()} g </TableCell>
            <TableCell> {snapshot.minPrice?.toLocaleString()} g </TableCell>
            <TableCell> {snapshot.maxPrice?.toLocaleString()} g </TableCell>
            <TableCell> {snapshot.avgPriceNq?.toLocaleString()} g </TableCell>
            <TableCell> {snapshot.avgPriceHq?.toLocaleString()} g </TableCell>
            <TableCell> {snapshot.volumeSold?.toLocaleString()} </TableCell>
        </TableRow>
    )

}

export default SnapshotRow;