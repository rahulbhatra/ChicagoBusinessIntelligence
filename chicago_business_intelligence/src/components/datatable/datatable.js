import * as React from 'react';
import {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: 'id', label: 'ID', minWidth: 70 },
    { id: 'lab_report_date', label: 'Report Date', minWidth: 200 },
    { id: 'cases_total', label: 'Cases Total', minWidth: 200 },
    { id: 'death_total', label: 'Death Total', minWidth: 200 },
  ];
  
  const getRows = (json) => {
    // var index = 0;
    var rows = Array(100);
    // var start = index * 100;
    // var end = (index + 1) * 100;
    for(var i = 0; i < json.length; i++) {
      rows[i] = {
        id: i,
        lab_report_date: json[i].lab_report_date,
        cases_total: json[i].cases_total,
        death_total: json[i].deaths_total
      }
    }
    return rows;
  }

    useEffect(() => {
      getData();
    }, []);

    const getData = async () => {
        await fetch('https://data.cityofchicago.org/resource/naz8-j4nc.json'
            ,{
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
            }
        )
        .then((res) => {
          return res.json()
        })
        .then(
        (json) => {
          console.log(json);
          setData(json);
          // setRows(data);
          setRows(getRows(json));
        },
        (error) => {
        console.log(error);
        });
    }

    return (
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                              
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>
  );
};

export default DataTable;