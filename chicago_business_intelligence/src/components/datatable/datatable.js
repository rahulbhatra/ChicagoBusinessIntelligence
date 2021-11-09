import * as React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import DataGrid, {
  Column,
  Export,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
} from 'devextreme-react/data-grid';

const DataTable = () => {
  const pageSizes = [25, 50, 100];
  const [rows, setRows] = React.useState([]);

  useEffect(async() => {
    getData();
  }, []);

  const getData = async () => {
      await axios.get('http://localhost:4000/api/covid_daily_data', {})
        .then(res => {
          console.log(res.data);
          setRows(res.data.data);
          return res.data;
        })
        .catch(error => {
          console.log(error);
          setRows([]);
          return [];
        });
    };

    return (
      
        <DataGrid dataSource={rows}
          id='gridContainer'
          keyExpr="id"
          width="95%"
          height="calc(100vh - 120px)"
          showColumnLines={true}
          showRowLines={true}
          showBorders={true}
          rowAlternationEnabled={true}>
            <SearchPanel visible={true} highlightCaseSensitive={true} />
            <Column dataField="id" dataType="number"/>
            <Column dataField="lab_report_date" dataType="date"/>
            <Column dataField="cases_total" dataType="number"/>
            <Column dataField="death_total" dataType="number"/>

            <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
            <Paging defaultPageSize={25} />
            <Export enabled={true} />
        </DataGrid>
    );
};
export default DataTable;