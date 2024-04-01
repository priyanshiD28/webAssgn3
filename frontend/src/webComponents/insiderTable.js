import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {useData} from '../DataContext';

function InsiderTable() {

    const {
        insiderTable, setInsiderTable,
        posMspr, setPosMspr,
        negMspr, setNegMspr,
        posChange, setPosChange,
        negChange, setNegChange,
    } = useData()



  return (
    <>
        <h5 align="center">Insider Sentiments</h5>
        <TableContainer sx={{marginBottom: 4}}>
            <Table sx={{ minWidth: 100, maxWidth: 600, mx: 'auto', marginTop: 1}} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={1} sx={{paddingTop:0.75, paddingBottom:0.75}}>Apple Inc</TableCell>
                        <TableCell align="center" colSpan={1} sx={{paddingTop:0.75, paddingBottom:0.75}}>MSPR</TableCell>
                        <TableCell align="center" colSpan={1} sx={{paddingTop:0.75, paddingBottom:0.75}}>Change</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="center" colSpan={1} sx={{paddingTop:0.75, paddingBottom:0.75, fontWeight: 'medium' }}>Total</TableCell>
                        <TableCell align="center" colSpan={1} sx={{paddingTop:0.75, paddingBottom:0.75}}>{Math.round(posMspr+negMspr * 100)/100}</TableCell>
                        <TableCell align="center" colSpan={1} sx={{paddingTop:0.75, paddingBottom:0.75}}>{posChange+negChange}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" colSpan={1} sx={{paddingTop:0.75, paddingBottom:0.75, fontWeight: 'medium' }}>Positive</TableCell>
                        <TableCell align="center" colSpan={1} sx={{paddingTop:0.75, paddingBottom:0.75}}>{posMspr}</TableCell>
                        <TableCell align="center" colSpan={1} sx={{paddingTop:0.75, paddingBottom:0.75}}>{posChange}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" colSpan={1} sx={{paddingTop:0.75, paddingBottom:0.75, fontWeight: 'medium' }}>Negative</TableCell>
                        <TableCell align="center" colSpan={1} sx={{paddingTop:0.75, paddingBottom:0.75}}>{Math.round(negMspr * 100)/100}</TableCell>
                        <TableCell align="center" colSpan={1} sx={{paddingTop:0.75, paddingBottom:0.75}}>{negChange}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </>
  );
}

export default InsiderTable;