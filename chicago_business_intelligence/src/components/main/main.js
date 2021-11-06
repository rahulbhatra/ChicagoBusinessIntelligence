import { Main } from './main-style';
import Table from '../datatable/datatable';
import SignIn from '../signin/signin';
import SignUp from '../signup/signup';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

const Reports = ({isLeftOpen}) => {
  return (
    <Main open={isLeftOpen}>
      <BrowserRouter>
        <Switch>
          {/* For routing different pages inside the application */}
          <Route path="/table">
            <Table />
          </Route>
          <Route path="/signIn">
            <SignIn />
          </Route>
          <Route path="/signUp">
            <SignUp />
          </Route>
        </Switch>
      </BrowserRouter>
    </Main>
  );
  
};
export default Reports;
