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

const MainContent = ({isLeftOpen, isLoggedIn, setIsLoggedIn}) => {
  console.log('inside main');
  return (
    <Main open={isLeftOpen}>
      
        <Switch>
          {/* For routing different pages inside the application */}
          {/* <Route exact path="/table">
            <Table />
          </Route> */}
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
          {/* <ProtectedRoute exact path="/barChart" component={() => <BarChart reportType={reportType}/>} />
          <ProtectedRoute exact path="/pieChart" component={() => <Pie reportType={reportType}/>} />
          <ProtectedRoute exact path="/linearChart" component={() => <LinearChart reportType={reportType}/>} /> */}
          {/* <ProtectedRoute exact path="/maps" component={() => <MyMapComponent reportType={reportType} isMarkerShown/>} /> */}
        </Switch>
      
    </Main>
  );
  
};
export default MainContent;
