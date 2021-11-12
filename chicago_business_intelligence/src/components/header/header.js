import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import {Search, SearchIconWrapper, StyledInputBase} from './header-style';
import Link from '@mui/material/Link';
import axios from 'axios';
import { useHistory } from 'react-router';

const Header = ({isLeftOpen, setIsLeftOpen, isLoggedIn, setIsLoggedIn, reportType}) => {
  console.log(isLoggedIn);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [chartAnchorEl, setChartAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isChartMenuOpen = Boolean(chartAnchorEl);


  const handleChartMenuOpen = (event) => {
    setChartAnchorEl(event.currentTarget);
  };

  const handleChartMenuClose = () => {
    setChartAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const signOut = () => {
    axios.get('http://localhost:4000/api/signOut')
      .then(res => {
        console.log(res);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        history.push("/signIn");
      }).catch(error => {
        console.log(error);
      });
  }

  const menuId = 'primary-search-account-menu';
  const chartMenu = 'chart-menu';

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
      <MenuItem onClick={handleChartMenuClose}>
        <Link href="/table" underline="none">Table Data</Link>
      </MenuItem>
      <MenuItem onClick={handleChartMenuClose}>
        <Link href="/barChart" underline="none">Bar Chart</Link>
      </MenuItem>
      <MenuItem onClick={handleChartMenuClose}>
        <Link href="/linearChart" underline="none">Linear Chart</Link>
      </MenuItem>
      <MenuItem onClick={handleChartMenuClose}>
        <Link href="/pieChart" underline="none">Pie Chart</Link>
      </MenuItem>
    </Menu>
  );

  const renderMenu = (
    
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      {
        !isLoggedIn && 
        <MenuItem onClick={handleMenuClose}>
          <Link href="/signIn" underline="none">SignIn</Link>
        </MenuItem>
      }
      {
        isLoggedIn &&
        <MenuItem onClick={signOut}>
          SignOut
        </MenuItem>
      }
      
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
              Business Intelligence
            </Button>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
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
              href="/maps"
              style={{color: '#FFFFFF'}}
              >
              Maps
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Search>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default Header;
