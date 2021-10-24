import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Animation } from '@devexpress/dx-react-chart';

import { confidence as data } from '../../../demo-data/data-vizualization';
import {legendItemStyles, legendLabelStyles, legendItemStyles, demoStyles,
       titleStyles} from './linearchart-style';


const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);

const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);

const legendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item className={classes.item} {...restProps} />
);

const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
  <Title.Text {...props} className={classes.title} />
));

const ValueLabel = (props) => {
  const { text } = props;
  return (
    <ValueAxis.Label
      {...props}
      text={`${text}%`}
    />
  );
};

const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);

const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);

const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }
  

  render() {
    const { data: chartData } = this.state;
    const { classes } = this.props;

    return (
      <Paper>
        <Chart
          data={chartData}
          className={classes.chart}
        >
          <ArgumentAxis tickFormat={format} />
          <ValueAxis
            max={50}
            labelComponent={ValueLabel}
          />
          
          <LineSeries
            name="Military"
            valueField="military"
            argumentField="year"
          />
          <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          <Title
            text={`Confidence in Institutions in American society ${'\n'}(Great deal)`}
            textComponent={TitleText}
          />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}

export default withStyles(demoStyles, { name: 'Demo' })(Demo);
