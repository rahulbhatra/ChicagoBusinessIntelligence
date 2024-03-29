import { Box, Button, Menu, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import BarChart from '../barchart/barchart';
import LinearChart from '../linearchart/linearchart';
import axios from 'axios';
import Toast from '../toast/toast';
import Maps from '../maps/maps';
import CoronaGreenIcon from '../../images/buildings.png';
import DataGridCustom, { Column } from '../datagrid/datagrid';


const tableColumns : Column[] =  [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'zipCode', headerName: 'Zip Code', width: 130 },
    { field: 'permitType', headerName: 'Permit Type', width: 130 },
    { field: 'buildingPermit', headerName: 'Bulding Permit', width: 130 },
    { field: 'communityAreas', headerName: 'Community Areas', width: 130, type: 'List' },
    { field: 'perCapitaIncome', headerName: 'Per Capita Income', width: 130, type: 'List' }
];

const chartColumns = [
    { value: 'buildingPermit', name: 'Building Permit' },
    // { value: 'ccvi_category', name: 'CCVI Category' }
];
const chartArgumentField = "zipCode";

const EmergencyLoan = () => {
    const [chartAnchorEl, setChartAnchorEl] = useState(null);
    const [visualizationType, setVisualizationType] = useState('table');
    const isChartMenuOpen = Boolean(chartAnchorEl);
    const chartMenu = 'chart-menu';
    const [rows, setRows] = useState([]);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSevertiy] = useState('success');

    const setIcon = (dataArray: any) => {
        for(var i = 0; i < dataArray.length; i ++) {    
            dataArray[i].img = CoronaGreenIcon
            
        }
    }

    useEffect(() => {
        getData();
    }, []);
  
    const getData = async () => {
        await axios.get('http://localhost:4000/api/building_permit/emergency-loan', {})
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
            {visualizationType === 'table' && <DataGridCustom rows={rows} columns={tableColumns} />}
            {visualizationType === 'barChart' && <BarChart rows={rows} columns={chartColumns} argumentField={chartArgumentField}/>}
            {visualizationType === 'linearChart' && <LinearChart rows={rows} columns={chartColumns} argumentField={chartArgumentField}/>}
            {visualizationType === 'maps' && <Maps markers={rows} type={'emergency-loan'}/>}
        </>
    )
};

export default EmergencyLoan;