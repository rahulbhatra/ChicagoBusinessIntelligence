import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme, Paper } from '@mui/material';
import React from 'react';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export interface Column {
  field: string;
  headerName: string;
  width: number;
  type?: "Date" | "string"
}

interface Props {
    rows: any[],
    columns: Column[],
    pageSize?: number,
    rowsPerPageOptions?: [],
};

const DataGridCustom = ({rows, columns} : Props) => {
  const theme = useTheme();
  return (
      <div style={{ height: '60vh', width: '100%', margin: theme.spacing(2, 0, 0, 0)}}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column: Column) => 
                  <TableCell id={column.field} width={column.width}>{column.headerName}</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {columns.map((column: Column) => {
                    return (
                      <>
                        {column?.type == "Date" ? <TableCell width={column.width}>{row[column.field]?.substring(0, 10)}</TableCell> :
                        <TableCell width={column.width}>{row[column.field]}</TableCell>}
                      </>
                    )
                  }
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
};

export default DataGridCustom;