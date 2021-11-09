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
  Title,
  Subtitle,
  Tooltip,
  Grid,
  Size
} from 'devextreme-react/chart';

const LinearChart = () => {
  const [rows, setRows] = useState([]);

  useEffect(async() => {
    getData();
  }, []);

  const getData = async () => {
      await axios.get('http://localhost:4000/api/covid_daily_data', {})
        .then(res => {
          console.log(res.data);
          setRows(res.data.data.slice(0, 10));
          return res.data;
        })
        .catch(error => {
          console.log(error);
          setRows([]);
          return [];
        });
    };

  const energySources = [
    { value: 'cases_total', name: 'Cases Total' },
    { value: 'death_total', name: 'Dealth Total' }
  ];

  return (
    
    <Chart
      palette="Violet"
      dataSource={rows}
    >
      <CommonSeriesSettings
        argumentField="lab_report_date"
        type={'line'}
      />
      {
        energySources.map((item) => <Series
          key={item.value}
          valueField={item.value}
          name={item.name} />)
      }
      <Margin bottom={20} />
      <ArgumentAxis
        valueMarginsEnabled={false}
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
      <Title text="Energy Consumption in 2004">
        <Subtitle text="(Millions of Tons, Oil Equivalent)" />
      </Title>
      <Tooltip enabled={true} />
      <Size height={600}/>
    </Chart>
      
  );
}

export default LinearChart;


