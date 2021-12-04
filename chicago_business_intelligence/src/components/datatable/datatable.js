import DataGrid, {
  Export,
  Pager,
  Paging,
  SearchPanel
} from 'devextreme-react/data-grid';

const DataTable = ({rows, columns}) => {
  console.log(rows, columns);
  const pageSizes = [25, 50, 100];
  
    return (
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
    );
};
export default DataTable;