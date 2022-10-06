import React from 'react';
import {
    Chart, Series, CommonSeriesSettings, Format, Legend, Export, Size, ArgumentAxis, ZoomAndPan, ScrollBar, Label
} from 'devextreme-react/chart';
import { NativeEventInfo } from 'devextreme/events';
import { PointInteractionInfo } from 'devextreme/viz/chart_components/base_chart';

interface Props {
    rows: any;
    columns: any;
    argumentField: any;
}

const BarChart = ({rows, columns, argumentField}: Props) => {

    const onPointClick = (e: NativeEventInfo<any> & PointInteractionInfo) => {
        e?.target?.select();
    }

    return (
        // <Chart id="chart"
        //     title={"Bar Chart Data Presentation"}
        //     dataSource={rows}
        //     onPointClick={onPointClick}
        // >
        // </Chart>
        <></>
    );
};

export default BarChart;