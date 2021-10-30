import { useState, useEffect } from "react";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
};

export const useHomeFetch = () => {

    const [data, setData] = useState([]);
    const [rows, setRows] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'lab_report_date', headerName: 'Report Date', width: 200 },
    { field: 'cases_total', headerName: 'Cases Total', width: 200 }
  ];
  
  const getRows = (json) => {
    var index = 0;
    var rows = Array(100);
    var start = index * 100;
    var end = (index + 1) * 100;
    for(var i = start; i < end; i++) {
      rows[i] = {
        id: 1,
        lab_report_date: json[i].lab_report_date,
        cases_total: json[i].cases_total
      }
    }
    return rows;
  }

  useEffect(async () => {
    setData(await getData());
    setRows(getRows(data));
  }, []);

    const getData = async () => {
        fetch('https://data.cityofchicago.org/resource/naz8-j4nc.json'
            ,{
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
            }
            )
            .then(res => res.json())
            .then(
            (result) => {
            // console.log(result);
            // setData(await result);
            // setRows(getRows(0))
                return result;
            },
            (error) => {
            console.log(error);
            });
    }

    return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};