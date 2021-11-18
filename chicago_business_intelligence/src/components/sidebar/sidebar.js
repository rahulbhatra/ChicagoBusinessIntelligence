import * as React from 'react';
import { Drawer, List, Divider, IconButton, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { Assessment as AssessmentIcon , LocalTaxi as LocalTaxiIcon, Coronavirus
  as CoronavirusIcon, Apartment as ApartmentIcon, Menu as MenuIcon } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DrawerHeader, drawerWidth } from './sidebar-style';
import { useHistory } from 'react-router-dom';

const Sidebar = ({isLeftOpen, setIsLeftOpen}) => {
  const history = useHistory();
    const reports = [
      {
        name: 'Dashboard',
        icon: AssessmentIcon,
        reportType: '/dashboard',
        link: 'dashboard'
      },
      {
        name: 'Taxi Trip',
        icon: LocalTaxiIcon,
        reportType: 'taxi',
        link: 'taxi'
      },
      { name: 'High CCVI Taxi Trip',
        icon: LocalTaxiIcon,
        reportType : 'high_ccvi_taxi',
        link: 'high-ccvi-taxi'
      },
      {
        name: 'Covid CCVI',
        icon: CoronavirusIcon,
        reportType: 'covid_ccvi',
        link: '/covid-ccvi',
        component: 'CovidCCVI'
      },
      {
        name: 'Covid Daily',
        icon: CoronavirusIcon,
        reportType: 'covid_daily',
        link: 'covid-daily'
      },
      {
        name: 'Infrastructure, Business & Unemployment',
        icon: ApartmentIcon,
        reportType: 'apartment',
        link: 'apartment'
      }
    ]

    const handleClick = (report) => {
      history.push(report.link);
    }

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
              Business Intelligence
              {/* {reportType} */}
            </Typography>
          </DrawerHeader>
          <Divider />
          <List>
            {reports.map(report => (
                
              <ListItemButton
                onClick={() => handleClick(report)}
                key={report.name}
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