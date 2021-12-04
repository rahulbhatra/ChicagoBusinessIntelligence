import { Box, Button, Menu, MenuItem, InputLabel, Select, FormControl } from '@mui/material';
import { useState, useEffect } from 'react';
import DataTable from '../datatable/datatable';
import BarChart from '../barchart/barchart';
import LinearChart from '../linearchart/linearchart';
import Toast from '../toast/toast';
import axios from 'axios';

const tableColumns =  ['id','zipCode','interval','date','forecast_value'];

const chartColumns = [
    { value: 'forecast_value', name:'Forecasted number of trips'}
];
const chartArgumentField = "date";

const Forecast = () => {
    const [chartAnchorEl, setChartAnchorEl] = useState(null);
    const [visualizationType, setVisualizationType] = useState('table');
    const isChartMenuOpen = Boolean(chartAnchorEl);
    const chartMenu = 'chart-menu';
    const [rows, setRows] = useState([]);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSevertiy] = useState('');
    
    const [zipCode, setZipCode] = useState('');    
    const [interval, setInterval] = useState('');    
    const [zipCodeArray, setZipCodeArray] = useState([]);

    useEffect(() => {        
        getListOfZipCodes();            
    }, []);
  
    const getListOfZipCodes = async () => {        
        var zipCodeArray = [];
        var promise = await new Promise(function(resolve, reject) {
            
            axios.get('http://localhost:4000/api/taxi/list', {})
          .then(r => {
            
                var lookupOptions = {};
                r.data.rows.forEach(element => {
                    lookupOptions[element.zip_key ] = element.zip_key;
                });
                zipCodeArray = Object.keys(lookupOptions).map((zip_key) => lookupOptions[zip_key]);
                setZipCodeArray(zipCodeArray)
                resolve(zipCodeArray);                
            })
          .catch((e) => console.log(e))              
          });
        
          return zipCodeArray;        
    }
    
    const getData = async () => {      

        fetch('http://localhost:5000/taxiTripsForecast?zip_code='+zipCode+'&interval='+interval).then(res => res.json())
        .then(res => {
            setToastOpen(true);
            setToastMessage('Successfully loaded the data.');
            setToastSevertiy('success');
            console.log("SUCCESSFUL");
            console.log(res);            
            setRows(res);
            return res;
        })
        .catch(error => {
            console.log("ERROR = ", error);
            setToastOpen(true);
            setToastMessage('Some error happened call Team 13.');
            setToastSevertiy('error');
            setRows([]);
            return [];
        });
    };

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
  
    const handleZipCodeChange = (event) => {                
        setZipCode(event.target.value);                
    };

    const handleIntervalChange = (event) => {        
        setInterval(event.target.value);        
    };

    return (
        <>
            <Toast open={toastOpen} setOpen={setToastOpen} message={toastMessage} severity={toastSeverity} />
            <Box sx={{display: 'flex'}}>  
                <Box sx={{mx: 2, minWidth: 120}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">ZipCode</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={zipCode}
                            label="ZipCode"
                            onChange={handleZipCodeChange}
                        >                            
                            {zipCodeArray.map((value ) =>{ return <MenuItem value={value} >{value}</MenuItem>})}                            
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{mx: 2, minWidth: 120}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Interval</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={interval}
                            label="Interval"
                            onChange={handleIntervalChange}
                        >                        
                        <MenuItem value={'D'}>Daily</MenuItem>
                        <MenuItem value={'W'}>Weekly</MenuItem>
                        <MenuItem value={'M'}>Monthly</MenuItem>
                        <MenuItem value={'Y'}>Yearly</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{mx: 2}}>
                    <Button size="large"
                    variant="contained"
                    onClick={getData}
                    style={{color: '#FFFFFF'}}
                    >
                    Forecast
                    </Button>
                </Box>
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
            </Box>
            {visualizationType === 'table' && <DataTable reportType={'forecasted_data'} rows={rows} columns={tableColumns} />}
            {visualizationType === 'barChart' && <BarChart reportType={'forecasted_data'} rows={rows} columns={chartColumns} argumentField={chartArgumentField}/>}
            {visualizationType === 'linearChart' && <LinearChart reportType={'forecasted_data'} rows={rows} columns={chartColumns} argumentField={chartArgumentField}/>}
        </>
    )
};

export default Forecast;
