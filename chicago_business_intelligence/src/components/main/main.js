import { Main } from './main-style';
import Table from '../datatable/datatable';
import BarChart from '../barchart/barchart';
import Pie from '../piechart/piechart';
import LinearChart from '../linearchart/linearchart';
import SignIn from '../signin/signin';
import SignUp from '../signup/signup';
import {Switch, Route} from 'react-router-dom';
import ProtectedRoute from '../protectedroute/protectedroute';

const MainContent = ({isLeftOpen, isLoggedIn, setIsLoggedIn}) => {
  return (
    <Main open={isLeftOpen}>
      
        <Switch>
          {/* For routing different pages inside the application */}
          {/* <Route exact path="/table">
            <Table />
          </Route> */}
          <Route exact path="/signIn">
            <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          </Route>
          <Route exact path="/signUp">
            <SignUp />
          </Route>
          <ProtectedRoute exact path="/table" component={Table} />
          <ProtectedRoute exact path="/barChart" component={() => <BarChart  />} />
          <ProtectedRoute exact path="/pieChart" component={() => <Pie  />} />
          <ProtectedRoute exact path="/linearChart" component={() => <LinearChart  />} />
        </Switch>
      
    </Main>
  );
  
};
export default MainContent;
