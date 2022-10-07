import SignIn from '../signin/signin';
import SignUp from '../signup/signup';
import {Switch, Route} from 'react-router-dom';
import ProtectedRoute from '../protectedroute/protectedroute';
import DashBoard from '../dashboard/dashboard';
import CovidCCVI from '../covid-ccvi/covid-ccvi';
import CovidDaily from '../covid-daily/covid-daily';
import HighCCVITaxiTrip from '../high-ccvi-taxi-trip/high-ccvi-taxi-trip';
import TaxiTrip from '../taxi/taxi';
import BuildingPermit from '../building-permit/building-permit';
import CovidTaxi from '../covid-taxi/covid-taxi';
import UnemploymentPoverty from '../unemployment-poverty/unemployment-poverty';
import Forecast from '../forecast/forecast';
import EmergencyLoan from '../emergency-loan/emergency-loan';
import DataGridCustom from '../datagrid/datagrid';
import React, { Dispatch } from 'react';
import { styled, Theme } from '@mui/material';

interface Props {
  isLeftOpen: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<React.SetStateAction<boolean>>;
}

const Routes = ({isLeftOpen, isLoggedIn, setIsLoggedIn} : Props) => {
  return (
    <Main open={isLeftOpen}>
      
        <Switch>
          {/* For routing different pages inside the application */}
          <Route exact path="/">
            <DashBoard />
          </Route>
          <Route exact path="/dashboard">
            <DashBoard />
          </Route>
          <Route exact path="/signIn">
            <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          </Route>
          <Route exact path="/signUp">
            <SignUp />
          </Route>
          <ProtectedRoute exact path="/covid-ccvi" component={() => <CovidCCVI/>} />
          <ProtectedRoute exact path="/covid-daily" component={() => <CovidDaily />} />
          <ProtectedRoute exact path="/high-ccvi-taxi-trip" component={() => <HighCCVITaxiTrip />} />
          <ProtectedRoute exact path="/taxi" component={() => <TaxiTrip />} />
          <ProtectedRoute exact path="/unemployment-poverty" component={() => <UnemploymentPoverty />} />
          <ProtectedRoute exact path="/building-permit" component={() => <BuildingPermit />} />
          <ProtectedRoute exact path="/covid-taxi" component={() => <CovidTaxi />} />
          <ProtectedRoute exact path="/forecast" component={() => <Forecast />} />
          <ProtectedRoute exact path="/emergency-loan" component={() => <EmergencyLoan />} />
        </Switch>
      
    </Main>
  );
  
};
export default Routes;

const drawerWidth = 280;
export const Main = styled("main")(({ theme, open} : { theme?: Theme, open: boolean }) => ({
      flexGrow: 1,
      height: 'calc(100vh - 120px)', 
      width: '95%',
      padding: theme?.spacing(3),
      transition: theme?.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: '0px',
      ...(open && {
        transition: theme?.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: `${drawerWidth}px`,
        width: 'calc(95% - 280px)',
      })
    })
  );