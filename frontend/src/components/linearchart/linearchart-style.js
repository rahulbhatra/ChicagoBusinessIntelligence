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


export const demoStyles = () => ({
  chart: {
    paddingRight: '20px',
  },
  title: {
    whiteSpace: 'pre',
  },
});


export const titleStyles = {
  title: {
    whiteSpace: 'pre',
  }
};