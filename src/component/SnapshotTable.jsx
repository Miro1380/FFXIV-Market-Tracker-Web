import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import SnapshotRow from "./SnapshotRow";
import { useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import { useEffect } from "react";

function SnapshotTable({ snapshots }) {

    const [page, setPage]= useState(0);
    const [rowsPerPage,setRowsPerPage] = useState(10);

    useEffect(() =>{
        setPage(0);
    }, [snapshots])

    
    if (!snapshots || snapshots.length === 0) return null;

    
    const paginated = snapshots.slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage);
    return (
        <div>
            <TableContainer component={Paper} sx={{ maxHeight: 400, textAlign: 'center', backgroundColor: '#13161e', borderRadius: 1, mx:'auto', mt:2}}>
                <Table size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            {['Captured', 'Avg', 'Min', 'Max', 'NQ', 'HQ', 'Vol'].map(header => (
                                <TableCell 
                                    key={header} 
                                    sx={{

                                        backgroundColor: '#1e222e', 
                                        color: 'primary.main',
                                        fontWeight:"bold",
                                        borderBottom:"1px solid #c8a96e33"
                                     }}
                                >
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginated.map(snapshot => (
                            <SnapshotRow key={snapshot.id} snapshot={snapshot} />
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count = {snapshots.length}
                page = {page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10,25,50]}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={ (e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}

                sx={{color:'text.secondary', backgroundColor:'#13161e'}}
            />

        </div>
    )
}

export default SnapshotTable;