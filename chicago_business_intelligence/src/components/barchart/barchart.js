import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Chart, Series, CommonSeriesSettings, Label, Format, Legend, Export, Size
} from 'devextreme-react/chart';

const BarChart = () => {
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

    const onPointClick = (e) => {
        e.target.select();
    }

    return (
        
        <Chart id="chart"
            title="Last 7 days Covid Data"
            dataSource={rows}
            onPointClick={onPointClick}
        >
            <CommonSeriesSettings
            argumentField="lab_report_date"
            type="bar"
            hoverMode="allArgumentPoints"
            selectionMode="allArgumentPoints"
            >
            <Label visible={true}>
                <Format type="fixedPoint" precision={0} />
            </Label>
            </CommonSeriesSettings>
            <Series
            argumentField="lab_report_date"
            valueField="cases_total"
            name="Total Cases"
            />
            <Series
            valueField="death_total"
            name="Total Deaths"
            />
            <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
            <Size height={600}/>
            <Export enabled={true} />
        </Chart>
    );
};

export default BarChart;