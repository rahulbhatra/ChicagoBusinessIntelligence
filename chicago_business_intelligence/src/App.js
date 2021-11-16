import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';
import Header from './components/header/header';
import 'devextreme/dist/css/dx.light.css';
import Sidebar from './components/sidebar/sidebar';
import Main from './components/main/main';
import {useState} from 'react';
import { BrowserRouter } from 'react-router-dom';

function App() {

  const token = localStorage.getItem('token');
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(token == null? false: true);

  return (
    <div className="App">
      
        <BrowserRouter>
          <Header 
            isLeftOpen={isLeftOpen} setIsLeftOpen={setIsLeftOpen}
            isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
          />
          
          <Sidebar
          isLeftOpen={isLeftOpen} setIsLeftOpen={setIsLeftOpen}
          isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
          />
          <Main isLeftOpen={isLeftOpen}
          isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
          />
        </BrowserRouter>
      
    </div>
  );
}

export default App;
