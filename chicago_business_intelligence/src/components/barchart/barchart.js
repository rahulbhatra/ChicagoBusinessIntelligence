import React from 'react';
import {
    Chart, Series, CommonSeriesSettings, Label, Format, Legend, Export, Size, ArgumentAxis, ZoomAndPan, ScrollBar
} from 'devextreme-react/chart';

const BarChart = ({rows, columns, argumentField}) => {

    const onPointClick = (e) => {
        e.target.select();
    }

    return (
        <Chart id="chart"
        title={"Bar Chart Data Presentation"}
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
    );
};

export default BarChart;