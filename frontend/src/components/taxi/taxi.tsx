import { Box, Button, Menu, MenuItem, PopoverProps } from '@mui/material';
import { useState, useEffect } from 'react';
import BarChart from '../barchart/barchart';
import LinearChart from '../linearchart/linearchart';
import axios from 'axios';
import Toast from '../toast/toast';
import DataGridCustom, { Column } from '../datagrid/datagrid';
import React from 'react';

const chartColumns = [
    { value: 'weekNumber', name:'Week Number'},
    { value: 'totalTrips', name:'Total Trips'},
    { value: 'casesPerWeek', name: 'Cases Per Week'}    
];


export const columns: Column [] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'weekNumber', headerName: 'Week Number',  width: 180},
    { field: 'totalTrips', headerName: 'Total Trips', width: 160 },
    { field: 'casesPerWeek', headerName: 'Cases Per Week', width: 200},
    { field: 'pickUpZip', headerName: 'Pick Up ZipCode', width: 130},
    { field: 'dropOffZip', headerName: 'Drop Off Zip', width: 130}, 
    { field: 'totalTrips', headerName: 'Total Trips', width: 130}, 
    { field: 'weekNumber', headerName: 'Week Number', width: 130}, 
    { field: 'weekStartDate', headerName: 'Week Start Date', width: 130, type: "Date"}, 
    { field: 'weekEndDate', headerName: 'Week End Date', width: 130, type: "Date"},
    { field: 'casesPerWeek', headerName: 'Cases Per Week', width: 130}
  ];

const chartArgumentField = "dropOffZip";

const TaxiTrip = () => {
    const [chartAnchorEl, setChartAnchorEl] = useState<any>();
    const [visualizationType, setVisualizationType] = useState('table');
    const isChartMenuOpen = Boolean(chartAnchorEl);
    const chartMenu = 'chart-menu';
    const [rows, setRows] = useState<any[]>([]);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSevertiy] = useState('');

    useEffect(() => {
        const getData = async () => {
            await axios.get('http://localhost:4000/api/taxi/airportTaxi', {})
            .then(res => {
                setToastOpen(true);
                setToastMessage('Successfully loaded the data.');
                setToastSevertiy('success');
                console.log('loading data', res.data.rows);
                setRows(res.data.rows);
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
    
    const handleChartVisualizationType = (visualizationType: string) => {
        setVisualizationType(visualizationType);
        setChartAnchorEl(null);
    };

    const handleChartMenuOpen = (event: any) => {
        setChartAnchorEl(event.currentTarget);
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
            onClose={handleChartVisualizationType}
        >
            <MenuItem onClick={() => handleChartVisualizationType('barChart')}>
                Bar Chart
            </MenuItem>
            <MenuItem onClick={() => handleChartVisualizationType('linearChart')}>
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
                        ref={chartAnchorEl}
                        id={chartMenu}
                        size="large"
                        variant="contained"
                        onClick={handleChartMenuOpen}
                    >
                    Charts
                    </Button>
                    {renderChartMenu}
                </Box>                
            </Box>
            {visualizationType === 'table' && <DataGridCustom columns={columns} rows={rows} />}
            {visualizationType === 'barChart' && <BarChart rows={rows} columns={chartColumns} argumentField={chartArgumentField}/>}
            {visualizationType === 'linearChart' && <LinearChart rows={rows} columns={chartColumns} argumentField={chartArgumentField}/>}
        </>
    )
};

export default TaxiTrip;
