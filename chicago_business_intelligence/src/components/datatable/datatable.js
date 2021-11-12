import {useState, useEffect} from 'react';
import axios from 'axios';
import DataGrid, {
  Export,
  Pager,
  Paging,
  SearchPanel,
} from 'devextreme-react/data-grid';
import Toast from '../toast/toast';

const DataTable = ({reportType}) => {
  console.log('inside data table', reportType);
  const pageSizes = [25, 50, 100];
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSevertiy] = useState('');

  useEffect(async() => {
    getData();
  }, []);

  const getData = async () => {
      await axios.get('http://localhost:4000/api/' + reportType + '/table_data', {})
        .then(res => {
          setToastOpen(true);
          setToastMessage('Successfully loaded the data.');
          setToastSevertiy('success');
          setRows(res.data.data);
          setColumns(res.data.columns);
          return res.data;
        })
        .catch(error => {
          setToastOpen(true);
          setToastMessage('Some error happened call Team 13.');
          setToastSevertiy('error');
          return [];
        });
    };

    return (
      <>
        <Toast open={toastOpen} setOpen={setToastOpen} message={toastMessage} severity={toastSeverity} />
        <DataGrid dataSource={rows}
          id='gridContainer'
          keyExpr="id"
          width="95%"
          height="calc(100vh - 120px)"
          showColumnLines={true}
          showRowLines={true}
          showBorders={true}
          rowAlternationEnabled={true}
          columns={columns}
          >
            <SearchPanel visible={true} highlightCaseSensitive={true} />
            <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
            <Paging defaultPageSize={25} />
            <Export enabled={true} />
        </DataGrid>
      </>
    );
};
export default DataTable;