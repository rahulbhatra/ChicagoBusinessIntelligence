import { Box, Button, Menu, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import DataTable from '../datatable/datatable';
import BarChart from '../barchart/barchart';
import LinearChart from '../linearchart/linearchart';
import axios from 'axios';
import Toast from '../toast/toast';
import DataGridCustom, { Column } from '../datagrid/datagrid';

const tableColumns : Column[] =  [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'tripId', headerName: 'Trip Id', width: 150 },
    { field: 'tripStartTime', headerName: 'Trip Start Time', width: 150, type: 'Date' },
    { field: 'tripEndTime', headerName: 'Trip End Time', width: 150, type: 'Date' },
    { field: 'pickUpZip', headerName: 'Pick Up Zip', width: 150 },
    { field: 'dropOffZip', headerName: 'Drop Off Zip', width: 150 },
];
const chartColumns = [
    { value: 'pickUpZip', name: 'Pickup Zip Code'}
];
const chartArgumentField = "dropOffZip";

const HighCCVITaxiTrip = () => {
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
            await axios.get('http://localhost:4000/api/high_ccvi_taxi_trip/data', {})
            .then(res => {
                setToastOpen(true);
                setToastMessage('Successfully loaded the data.');
                setToastSevertiy('success');
                console.log('loading data', res.data.rows);
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

    const handleChartMenuOpen = (event: any) => {
        setChartAnchorEl(event.currentTarget);
    };
    
    const handleChartMenuClose = (visualizationType: string) => {
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
                        aria-controls={isChartMenuOpen ? chartMenu : undefined}
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
            </Box>
            {visualizationType === 'table' && <DataGridCustom rows={rows} columns={tableColumns} />}
            {visualizationType === 'barChart' && <BarChart rows={rows} columns={chartColumns} argumentField={chartArgumentField}/>}
            {visualizationType === 'linearChart' && <LinearChart rows={rows} columns={chartColumns} argumentField={chartArgumentField}/>}
        </>
    )
};

export default HighCCVITaxiTrip;