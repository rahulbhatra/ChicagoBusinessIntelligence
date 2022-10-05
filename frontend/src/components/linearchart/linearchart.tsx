import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  ScrollBar,
  ZoomAndPan,
  Tooltip,
  Grid,
  Size,
} from 'devextreme-react/chart';

interface Props {
  rows: any;
  columns: any;
  argumentField: any;
}

const LinearChart = ({rows, columns, argumentField}: Props) => {


  return (
    
    // <Chart
    //   title={"Linear Chart Represenation"}
    //   palette="Violet"
    //   dataSource={rows}
    // >
    //   <CommonSeriesSettings
    //     argumentField={argumentField}
    //     type={'line'}
    //   />
    //   {
    //     columns.map((item: any) => 
    //       <Series
    //         key={item.value}
    //         valueField={item.value}
    //         name={item.name} />
    //     )
    //   }
    //   <Margin bottom={20} />
    //   <ArgumentAxis
    //     valueMarginsEnabled={true}
    //     defaultVisualRange={{length: 10}}
    //     discreteAxisDivisionMode="crossLabels"
    //     label={{displayMode:'rotate', rotationAngle:'45'}}
    //   >
    //     <Grid visible={true} />
    //   </ArgumentAxis>
      
    //   <ScrollBar visible={true} />
    //   <ZoomAndPan argumentAxis="both"/>
    //   <Legend
    //     verticalAlignment="bottom"
    //     horizontalAlignment="center"
    //     itemTextPosition="bottom"
    //   />
    //   <Export enabled={true} />
    //   <Tooltip enabled={true} />
    //   <Size height={600}/>
    // </Chart>
    <></>
      
  );
}

export default LinearChart;


