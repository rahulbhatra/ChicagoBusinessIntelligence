import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/sidebar/sidebar';
import {useState} from 'react';


function App() {

  const [isLeftOpen, setIsLeftOpen] = useState(false);

  return (
    <div className="App">    
      <Header isLeftOpen={isLeftOpen} setIsLeftOpen={setIsLeftOpen}/>
      <Sidebar isLeftOpen={isLeftOpen} setIsLeftOpen={setIsLeftOpen} />
    </div>
  );
}

export default App;
