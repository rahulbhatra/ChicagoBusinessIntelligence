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
  const localStorageReportType = localStorage.getItem('reportType');
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(token == null? false: true);
  const [reportType, setReportType] = useState(localStorageReportType == null? 'covid' : localStorageReportType);
  console.log('inside app', reportType);

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
          reportType={reportType} setReportType={setReportType}
          />
          <Main isLeftOpen={isLeftOpen}
          isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
          reportType={reportType}
          />
        </BrowserRouter>
      
    </div>
  );
}

export default App;
