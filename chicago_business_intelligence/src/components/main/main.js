import { Main } from './main-style';
import Table from '../datatable/datatable';
import SignIn from '../signin/signin';
import SignUp from '../signup/signup';
import {Switch, Route} from 'react-router-dom';

const MainContent = ({isLeftOpen, isLoggedIn, setIsLoggedIn}) => {
  return (
    <Main open={isLeftOpen}>
      
        <Switch>
          {/* For routing different pages inside the application */}
          <Route path="/table">
            <Table />
          </Route>
          <Route path="/signIn">
            <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          </Route>
          <Route path="/signUp">
            <SignUp />
          </Route>
        </Switch>
      
    </Main>
  );
  
};
export default MainContent;
