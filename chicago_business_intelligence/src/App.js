import './App.css';
import Header from './components/header/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/sidebar/sidebar';
import Main from './components/main/main';
import {useState} from 'react';

function App() {

  const [isLeftOpen, setIsLeftOpen] = useState(false);

  return (
    <div className="App">    
      <Header isLeftOpen={isLeftOpen} setIsLeftOpen={setIsLeftOpen}/>
      
      <Sidebar
      isLeftOpen={isLeftOpen} 
      setIsLeftOpen={setIsLeftOpen} 
      />
      <Main isLeftOpen={isLeftOpen}/>
      
    </div>
  );
}

export default App;
