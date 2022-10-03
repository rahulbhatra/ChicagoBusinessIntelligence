import { Box, Button, Menu, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import DataTable from '../datatable/datatable';
import BarChart from '../barchart/barchart';
import LinearChart from '../linearchart/linearchart';
import Maps from '../maps/maps';
import axios from 'axios';
import Toast from '../toast/toast';
import CoronaGreenIcon from '../../images/coronagreen.png';
import CoronaRedIcon from '../../images/coronared.png';
import CoronaBlueIcon from '../../images/coronablue.png';

const tableColumns =  ['id', 'zipCode', 'ccvi_score', 'ccvi_category', 'communityArea', 'latitude', 'longitude'];
const chartColumns = [
    { value: 'ccvi_score', name: 'CCVI Score' },
    // { value: 'ccvi_category', name: 'CCVI Category' }
];
const chartArgumentField = "zipCode";

const CovidCCVI = () => {
    const [chartAnchorEl, setChartAnchorEl] = useState(null);
    const [visualizationType, setVisualizationType] = useState('table');
    const isChartMenuOpen = Boolean(chartAnchorEl);
    const chartMenu = 'chart-menu';
    const [rows, setRows] = useState([]);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSevertiy] = useState('');

    useEffect(() => {
        const getData = async () => {
            await axios.get('http://localhost:4000/api/covid_ccvi/data', {})
            .then(res => {
                setToastOpen(true);
                setToastMessage('Successfully loaded the data.');
                setToastSevertiy('success');
                console.log('loading data', res.data.rows);
                setIcon(res.data.rows);
                setRows(res.data.rows);
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
        getData();
    }, []);

    const setIcon = (dataArray) => {
        for(var i = 0; i < dataArray.length; i ++) {
            if (dataArray[i].ccvi_category === 'HIGH') {
                dataArray[i].img = CoronaRedIcon
            } else if (dataArray[i].ccvi_category === 'MEDIUM') {
                dataArray[i].img = CoronaBlueIcon
            } else {
                dataArray[i].img = CoronaGreenIcon
            }
        }
    }

    const handleChartMenuOpen = (event) => {
        setChartAnchorEl(event.currentTarget);
    };
    
    const handleChartMenuClose = (visualizationType) => {
        setVisualizationType(visualizationType);
        setChartAnchorEl(null);
    };

    const renderChartMenu = (
        <Menu
            anchorEl={chartAnchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            id={chartMenu}
            keepMounted
            open={isChartMenuOpen}
            onClose={handleChartMenuClose}
        >
            <MenuItem onClick={() => handleChartMenuClose('barChart')}>
                Bar Chart
            </MenuItem>
            <MenuItem onClick={() => handleChartMenuClose('linearChart')}>
                Linear Chart
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <Toast open={toastOpen} setOpen={setToastOpen} message={toastMessage} severity={toastSeverity} />
            <Box sx={{display: 'flex'}}>
                <Box sx={{mx: 2}}>
                    <Button size="large"
                    variant="contained"
                    onClick={() => setVisualizationType('table')}
                    style={{color: '#FFFFFF'}}
                    >
                    Table
                    </Button>
                </Box>
                <Box>
                    <Button
                    // ref={anchorRef}
                    id={chartMenu}
                    aria-controls={isChartMenuOpen ? {chartMenu} : undefined}
                    aria-expanded={isChartMenuOpen ? "true" : undefined}
                    aria-haspopup="true"
                    size="large"
                    variant="contained"
                    onClick={handleChartMenuOpen}
                    >
                    Charts
                    </Button>
                    {renderChartMenu}
                </Box>
                <Box sx={{mx: 2}}>
                    <Button size="large"
                    variant="contained" 
                    onClick={() => setVisualizationType('maps')}
                    style={{color: '#FFFFFF'}}
                    >
                    Maps
                    </Button>
                </Box>
            </Box>
            {visualizationType === 'table' && <DataTable reportType={'covid_ccvi'} rows={rows} columns={tableColumns} />}
            {visualizationType === 'barChart' && <BarChart reportType={'covid_ccvi'} rows={rows} columns={chartColumns} argumentField={chartArgumentField}/>}
            {visualizationType === 'linearChart' && <LinearChart reportType={'covid_ccvi'} rows={rows} columns={chartColumns} argumentField={chartArgumentField}/>}
            {visualizationType === 'maps' && <Maps markers={rows} type={'covid-ccvi'}/>}
        </>
    )
};

export default CovidCCVI;