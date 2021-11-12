import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import Typography from '@mui/material/Typography';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Button from '@mui/material/Button';
import { DrawerHeader, drawerWidth } from './sidebar-style';

const Sidebar = ({isLeftOpen, setIsLeftOpen, reportType, setReportType}) => {
    const reports = [
      {
        name: 'Business Intelligence',
        icon: AssessmentIcon,
        reportType: 'Home Page',
        link: 'dashboard'
      },
      {
        name: 'Taxi Trip',
        icon: LocalTaxiIcon,
        reportType: 'taxi',
        link: null
      },
      {
        name: 'Covid CCVI',
        icon: CoronavirusIcon,
        reportType: 'covid_ccvi',
        link: null
      },
      {
        name: 'Covid Daily',
        icon: CoronavirusIcon,
        reportType: 'covid_daily',
        link: null
      },
      {
        name: 'Infrastructure, Business & Unemployment',
        icon: ApartmentIcon,
        reportType: 'apartment',
        link: null
      }
    ]

    return (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            bgcolor: 'primary.main',
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: 'primary.main',
              color: 'white'
            },
          }}
          variant="persistent"
          anchor="left"
          open={isLeftOpen}
        >
          <DrawerHeader>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => setIsLeftOpen(!isLeftOpen)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
          </IconButton>
          <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <Button size="large"
              variant="contained" 
              href="/dashboard"
              style={{color: '#FFFFFF'}}
              >
                Business Intelli..
              </Button>
              {/* {reportType} */}
            </Typography>
          </DrawerHeader>
          <Divider />
          <List>
            {reports.map(report => (
                
              <ListItemButton 
                // selected={reportType == report.reportType ? true: false} 
                onClick={() => {
                setReportType(report.reportType)
                localStorage.setItem('reportType', report.reportType)
                }} button key={report.name}
                >
                  <ListItemIcon>
                    <report.icon 
                      size="large"
                      edge="start"
                      sx={{color: 'white', mx: 3}}
                    />
                  </ListItemIcon>
                  <ListItemText primary={report.name} />
              </ListItemButton>
              
            ))}
          </List>
        </Drawer>
        
    );
};

export default Sidebar;