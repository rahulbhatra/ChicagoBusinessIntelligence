import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import Typography from '@mui/material/Typography';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { DrawerHeader, drawerWidth } from './sidebar-style';

const Sidebar = ({isLeftOpen, setIsLeftOpen, reportType, setReportType}) => {
    const reports = [
      {
        name: 'Business Intelligence',
        icon: AssessmentIcon,
        reportType: 'Home Page'
      },
      {
        name: 'Taxi Trip',
        icon: LocalTaxiIcon,
        reportType: 'taxi'
      },
      {
        name: 'Covid Update',
        icon: CoronavirusIcon,
        reportType: 'covid'
      },
      {
        name: 'Infrastructure, Business & Unemployment',
        icon: ApartmentIcon,
        url: '/'
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
              {/* Business Intelligence  */}
              {reportType}
            </Typography>
          </DrawerHeader>
          <Divider />
          <List>
            {reports.map(report => (
                
              <ListItem onClick={() => setReportType(report.reportType)} button key={report.name}>
                <ListItemIcon>
                  <report.icon 
                    size="large"
                    edge="start"
                    sx={{color: 'white', mx: 3}}
                  />
                </ListItemIcon>
                <ListItemText primary={report.name} />
              </ListItem>
              
            ))}
          </List>
        </Drawer>
        
    );
};

export default Sidebar;