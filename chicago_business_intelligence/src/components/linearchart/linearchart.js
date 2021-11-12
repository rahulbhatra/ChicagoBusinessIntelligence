import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  // Title,
  // Subtitle,
  Tooltip,
  Grid,
  Size
} from 'devextreme-react/chart';

const LinearChart = ({reportType}) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [argumentField, setArgumentField] = useState(null);

  useEffect(async() => {
    getData();
  }, []);

  const getData = async () => {
      await axios.get('http://localhost:4000/api/' + reportType + '/linear_chart', {})
        .then(res => {
          console.log(res.data);
          setRows(res.data.rows.slice(0, 30));
          setColumns(res.data.columns);
          setArgumentField(res.data.argumentField);
          return res.data;
        })
        .catch(error => {
          console.log(error);
        });
    };

  

  return (
    
    <Chart
      title={"Last 30 Days " + reportType + " line chart presentation"}
      palette="Violet"
      dataSource={rows}
    >
      <CommonSeriesSettings
        argumentField={argumentField}
        type={'line'}
      />
      {
        columns.map((item) => 
          <Series
            key={item.value}
            valueField={item.value}
            name={item.name} />
        )
      }
      <Margin bottom={20} />
      <ArgumentAxis
        valueMarginsEnabled={true}
        discreteAxisDivisionMode="crossLabels"
      >
        <Grid visible={true} />
      </ArgumentAxis>
      <Legend
        verticalAlignment="bottom"
        horizontalAlignment="center"
        itemTextPosition="bottom"
      />
      <Export enabled={true} />
      <Tooltip enabled={true} />
      <Size height={600}/>
    </Chart>
      
  );
}

export default LinearChart;


