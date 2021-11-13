import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Chart, Series, CommonSeriesSettings, Label, Format, Legend, Export, Size, ArgumentAxis, ZoomAndPan, ScrollBar
} from 'devextreme-react/chart';
import Toast from '../toast/toast';

const BarChart = ({reportType}) => {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [argumentField, setArgumentField] = useState(null);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSevertiy] = useState('');

    useEffect(async() => {
        getData();
      }, []);
  
    const getData = async () => {
        await axios.get('http://localhost:4000/api/' + reportType +'/linear_chart', {})
        .then(res => {
            setToastOpen(true);
            setToastMessage('Successfully loaded the data.');
            setToastSevertiy('success');
            setRows(res.data.rows.slice(0, 30));
            setColumns(res.data.columns);
            setArgumentField(res.data.argumentField);
            return res.data;
        })
        .catch(error => {
            setToastOpen(true);
            setToastMessage('Some error happened call Team 13.');
            setToastSevertiy('error');
            setRows([]);
            return [];
        });
    };

    const onPointClick = (e) => {
        e.target.select();
    }

    return (
        <>
            <Toast open={toastOpen} setOpen={setToastOpen} message={toastMessage} severity={toastSeverity} />
            <Chart id="chart"
            title={"Last 30 Days " + reportType + " bar chart presentation"}
            dataSource={rows}
            onPointClick={onPointClick}
            >
                <CommonSeriesSettings
                argumentField={argumentField}
                type="bar"
                hoverMode="allArgumentPoints"
                selectionMode="allArgumentPoints"
                >
                <Label 
                    visible={true}
                >
                    <Format type="fixedPoint" precision={0} />
                </Label>
                </CommonSeriesSettings>
                {
                    columns.map((item) => 
                    <Series
                        key={item.value}
                        valueField={item.value}
                        name={item.name} />
                    )
                }
                <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
                <ArgumentAxis label={{displayMode:'rotate'}}
                    defaultVisualRange={{length: 10}}
                />
                <ScrollBar visible={true} />
                <ZoomAndPan argumentAxis="both"/>
                <Size height={600}/>
                <Export enabled={true} />
            </Chart>
        </>
        
        
    );
};

export default BarChart;