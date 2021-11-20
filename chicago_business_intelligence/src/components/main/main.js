import { Main } from './main-style';
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

const MainContent = ({isLeftOpen, isLoggedIn, setIsLoggedIn}) => {
  console.log('inside main');
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
        </Switch>
      
    </Main>
  );
  
};
export default MainContent;
