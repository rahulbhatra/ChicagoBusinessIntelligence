import * as React from 'react';
import {useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Table = () => {
    const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'lab_report_date', headerName: 'Report Date', width: 200 },
    { field: 'cases_total', headerName: 'Cases Total', width: 200 },
    { field: 'death_total', headerName: 'Death Total', width: 200 },
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
      <DataGrid
          rows={rows}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          checkboxSelection
      />
  );
};

export default Table;