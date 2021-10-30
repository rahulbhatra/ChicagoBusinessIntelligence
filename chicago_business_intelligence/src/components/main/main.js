import { Main } from './main-style';
import Table from '../datatable/datatable';
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
        </Switch>
      </BrowserRouter>
    </Main>
  );
  
};
export default Reports;
