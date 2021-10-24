export const format = () => tick => tick;

export const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});

export const legendLabelStyles = theme => ({
  label: {
    paddingTop: theme.spacing(1),
    whiteSpace: 'nowrap',
  },
});

export const legendItemStyles = () => ({
  item: {
    flexDirection: 'column',
  },
});

export const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);

export const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);

export const legendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item className={classes.item} {...restProps} />
);

export const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);

export const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);

export const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);

export const demoStyles = () => ({
  chart: {
    paddingRight: '20px',
  },
  title: {
    whiteSpace: 'pre',
  },
});

export const ValueLabel = (props) => {
  const { text } = props;
  return (
    <ValueAxis.Label
      {...props}
      text={`${text}%`}
    />
  );
};

export const titleStyles = {
  title: {
    whiteSpace: 'pre',
  },
};

export const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
  <Title.Text {...props} className={classes.title} />
));