import { Main } from './main-style';
import DataTable from '../datatable/datatable';
import BarChart from '../barchart/barchart';
import Pie from '../piechart/piechart';
import LinearChart from '../linearchart/linearchart';
import SignIn from '../signin/signin';
import SignUp from '../signup/signup';
import {Switch, Route} from 'react-router-dom';
import ProtectedRoute from '../protectedroute/protectedroute';
import DashBoard from '../dashboard/dashboard';

const MainContent = ({isLeftOpen, isLoggedIn, setIsLoggedIn, reportType}) => {
  console.log('inside main', reportType);
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
          <ProtectedRoute exact path="/table" component={() => <DataTable reportType={reportType}/>} />
          <ProtectedRoute exact path="/barChart" component={() => <BarChart reportType={reportType}/>} />
          <ProtectedRoute exact path="/pieChart" component={() => <Pie reportType={reportType}/>} />
          <ProtectedRoute exact path="/linearChart" component={() => <LinearChart reportType={reportType}/>} />
        </Switch>
      
    </Main>
  );
  
};
export default MainContent;
